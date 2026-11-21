import { tools } from "@/lib/toolsList";
import * as ToolComponents from "@/components/tools";
import { getSeoData } from "@/utils/seo";
import { redirect } from "next/navigation";
import Icon from "@/components/ui/Icon";
import { getToolMeta, getCategory } from "@/lib/catalog";
import Link from "next/link";
import ProjectDuniyaPromo from "@/components/promo/ProjectDuniyaPromo";
import { getDynamicHeading } from "@/utils/toolVariants";
import { getVariantFaqs } from "@/utils/getVariantFaqs";
import { getVariantHowToTitle } from "@/utils/getVariantHowTo";
import { getToolCategory } from "@/utils/toolCategory";

function parseSlug(slug) {
  const decoded = decodeURIComponent(slug)
    .toLowerCase()
    .trim();

  const matchedTool = tools.find((t) =>
    decoded.startsWith(t.slug)
  );

  if (!matchedTool) {
    return {
      tool: decoded,
      limit: null,
    };
  }

  const kbMatch =
    decoded.match(
      /(\d+)\s*kb/i
    );

  const mbMatch =
    decoded.match(
      /(\d+)\s*mb/i
    );

return {
  tool: matchedTool.slug,

  limit:
    kbMatch?.[1] ||
    mbMatch?.[1] ||
    null,

  unit: kbMatch
    ? "KB"
    : mbMatch
    ? "MB"
    : null,
};
}

/* ===========================
   SEO METADATA
=========================== */

export async function generateMetadata({
  params,
}) {
  const {
    slug: rawSlug,
  } = await params;

  const slug = Array.isArray(
    rawSlug
  )
    ? rawSlug[0]
    : rawSlug;

 const { tool, limit, unit } = parseSlug(slug);

const seo = getSeoData(
  tool,
  limit,
  unit,
  slug
);

  const url = `https://tools.projectduniya.com/tools/${slug}`;

  const toolData = tools.find(
    (t) =>
      t.slug.toLowerCase() ===
      tool.toLowerCase()
  );

  return {
    title: seo.title,

    description:
      seo.description,

    keywords:
      seo.keywords,

    alternates: {
      canonical: url,
    },

    robots: {
      index: true,
      follow: true,

      googleBot: {
        index: true,
        follow: true,
      },
    },

    openGraph: {
      title: seo.title,

      description:
        seo.description,

      url,

      siteName:
        "ToolsCenterHub",

      type: "website",

      images: [
        {
          url:
            "/og-image.jpg",

          width: 1200,

          height: 630,

          alt:
            toolData?.name ||
            seo.title,
        },
      ],
    },

    twitter: {
      card:
        "summary_large_image",

      title:
        seo.title,

      description:
        seo.description,

      images: [
        "/og-image.jpg",
      ],
    },
  };
}

/* ===========================
   PAGE
=========================== */

export default async function Page({
  params,
}) {
  const {
    slug: rawSlug,
  } = await params;

  const slug = Array.isArray(
    rawSlug
  )
    ? rawSlug[0]
    : rawSlug;

  const decoded =
    decodeURIComponent(slug);

  /* Redirect spaces */
  if (
    decoded.includes(" ")
  ) {
    const cleanSlug =
      decoded.replace(
        /\s+/g,
        "-"
      );

    return redirect(
      `/tools/${cleanSlug}`
    );
  }

  const { tool, limit } =
    parseSlug(slug);

  const toolData = tools.find(
    (t) =>
      t.slug.toLowerCase() ===
      tool.toLowerCase()
  );

  if (!toolData) {
    return (
      <div>
        Tool not found
      </div>
    );
  }

  const category = getCategory(
    getToolMeta(toolData.slug)?.categorySlug
  ) || getCategory("utility-tools");

  const Component =
    ToolComponents[
    toolData.component
    ];

  if (!Component) {
    return (
      <div>
        Component not found
      </div>
    );
  }

  /* ===========================
     SOFTWARE SCHEMA
  =========================== */

  const softwareSchema = {
    "@context":
      "https://schema.org",

    "@type":
      "SoftwareApplication",

    name: toolData.name,

    applicationCategory:
      "UtilitiesApplication",

    operatingSystem:
      "Web",

    url: `https://tools.projectduniya.com/tools/${toolData.slug}`,

    offers: {
      "@type": "Offer",

      price: "0",

      priceCurrency:
        "USD",
    },
  };

  /* ===========================
     BREADCRUMB SCHEMA
  =========================== */

  const breadcrumbSchema = {
    "@context":
      "https://schema.org",

    "@type":
      "BreadcrumbList",

    itemListElement: [
      {
        "@type":
          "ListItem",

        position: 1,

        name: "Home",

        item:
          "https://tools.projectduniya.com",
      },

      {
        "@type":
          "ListItem",

        position: 2,

        name: category.name,

        item:
          `https://tools.projectduniya.com/category/${category.slug}`,
      },

      {
        "@type":
          "ListItem",

        position: 3,

        name: toolData.name,

        item: `https://tools.projectduniya.com/tools/${toolData.slug}`,
      },
    ],
  };

  /* ===========================
     WEBPAGE SCHEMA
  =========================== */

  const webPageSchema = {
    "@context":
      "https://schema.org",

    "@type":
      "WebPage",

    name: toolData.name,

    description:
      toolData.description,

    url: `https://tools.projectduniya.com/tools/${slug}`,

    isPartOf: {
      "@type":
        "WebSite",

      name:
        "ToolsCenterHub",

      url:
        "https://tools.projectduniya.com",
    },
  };

  /* Reuse the exact same FAQ content that FAQ.jsx renders on the page,
     so the schema never contradicts what a visitor (or Google) actually sees. */
  const variantFaqs = getVariantFaqs(toolData.name, slug, toolData.slug);

  const baseFaqs = [
    {
      q: `Is ${toolData.name} free to use?`,
      a: `Yes, ${toolData.name} is completely free to use with no signup required.`,
    },
    {
      q: "Are my files secure?",
      a: "Files are processed securely and are not permanently stored on our servers.",
    },
  ];

  const faqList = variantFaqs.length > 0 ? variantFaqs : baseFaqs;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",

    mainEntity: faqList.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };

  const { verb, noun } = getToolCategory(toolData.name);
  const isCalculator = toolData.category === "calculator";
  const isTextTool = toolData.category === "text";

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",

    name: getVariantHowToTitle(toolData.name, slug, toolData.slug),

    description: toolData.description,

    step: isCalculator
      ? [
          {
            "@type": "HowToStep",
            name: "Enter Your Values",
            text: `Enter the required values into ${toolData.name}. No installation or account is needed.`,
          },
          {
            "@type": "HowToStep",
            name: "Calculate",
            text: `Click Calculate to let the tool ${verb} your ${noun} automatically.`,
          },
          {
            "@type": "HowToStep",
            name: "View Result",
            text: "View your result instantly, and copy it if needed.",
          },
        ]
      : isTextTool
      ? [
          {
            "@type": "HowToStep",
            name: "Enter or Paste Text",
            text: `Type or paste your text into ${toolData.name}. No installation or account is needed.`,
          },
          {
            "@type": "HowToStep",
            name: "Process Text",
            text: `Let ${toolData.name} generate your result automatically using AI.`,
          },
          {
            "@type": "HowToStep",
            name: "Copy Result",
            text: "Copy or download the result instantly.",
          },
        ]
      : [
          {
            "@type": "HowToStep",
            name: "Upload File",
            text: `Upload your ${noun} to ${toolData.name}. Nothing is installed and no account is needed.`,
          },
          {
            "@type": "HowToStep",
            name: "Process File",
            text: `Let the tool ${verb} your ${noun} automatically.`,
          },
          {
            "@type": "HowToStep",
            name: "Download Result",
            text: "Download the finished file instantly to your device.",
          },
        ],
  };
  return (
    <>
      {/* Software Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            JSON.stringify(
              softwareSchema
            ),
        }}
      />

      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            JSON.stringify(
              breadcrumbSchema
            ),
        }}
      />

      {/* WebPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            JSON.stringify(
              webPageSchema
            ),
        }}
      />
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            faqSchema
          ),
        }}
      />

      {/* HowTo Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            howToSchema
          ),
        }}
      />
      <section
        className="ds-toolhead"
        style={{ "--c": category.color, "--t": category.tint }}
      >
        <div className="ds-container">
          <nav className="ds-crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href={`/category/${category.slug}`}>{category.name}</Link>
            <span>/</span>
            <strong>{toolData.name}</strong>
          </nav>

          <Link href={`/category/${category.slug}`} className="ds-catchip">
            <Icon name={category.icon} size={15} /> {category.name}
          </Link>

          <h1>
            {getDynamicHeading(
              toolData.name,
              slug,
              toolData.slug
            )}
          </h1>
          <p className="ds-sub">{toolData.description}</p>

          <ul className="ds-trust">
            <li><Icon name="Check" size={16} /> Free to use</li>
            <li><Icon name="Check" size={16} /> No signup</li>
            <li><Icon name="Check" size={16} /> Works on mobile</li>
          </ul>
        </div>
      </section>

      <div className="ds-toolbody">
        <Component
          {...(limit
            ? { limit }
            : {})}
        />

        <ProjectDuniyaPromo
          variant="tool"
          campaign={`tool_${toolData.slug}`}
          toolName={toolData.name}
        />
      </div>
    </>
  );
}
import Link from "next/link";
import { notFound } from "next/navigation";
import Icon from "@/components/ui/Icon";
import ToolCard from "@/components/ui/ToolCard";
import CategoryCard from "@/components/ui/CategoryCard";
import ProjectDuniyaPromo from "@/components/promo/ProjectDuniyaPromo";
import { CATEGORIES, getCategory, toolsInCategory } from "@/lib/catalog";
import { SITE_URL } from "@/lib/site";

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const cat = getCategory(slug);
  if (!cat) return { title: "Category not found", robots: { index: false } };
  return {
    title: { absolute: cat.title },
    description: cat.description,
    alternates: { canonical: `/category/${cat.slug}` },
    openGraph: { title: cat.title, description: cat.description, url: `/category/${cat.slug}`, type: "website" },
  };
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const cat = getCategory(slug);
  if (!cat) notFound();

  const list = toolsInCategory(cat.slug);
  const others = CATEGORIES.filter((c) => c.slug !== cat.slug);

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: cat.name,
      description: cat.description,
      url: `${SITE_URL}/category/${cat.slug}`,
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: list.length,
        itemListElement: list.map((t, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: t.name,
          url: `${SITE_URL}/tools/${t.slug}`,
        })),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: cat.name, item: `${SITE_URL}/category/${cat.slug}` },
      ],
    },
  ];

  return (
    <>
      {schema.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      <section className="ds-pagehead" style={{ "--c": cat.color, "--t": cat.tint }}>
        <div className="ds-container">
          <nav className="ds-crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link><span>/</span><strong>{cat.name}</strong>
          </nav>
          <span className="ds-pagehead-ico"><Icon name={cat.icon} size={30} /></span>
          <h1>{cat.name}</h1>
          <p>{cat.intro}</p>
        </div>
      </section>

      <section className="ds-section" style={{ paddingBottom: 24 }}>
        <div className="ds-container">
          <div className="ds-grid">
            {list.map((t) => <ToolCard key={t.slug} tool={t} />)}
          </div>
        </div>
      </section>

      <ProjectDuniyaPromo variant="full" campaign={`tools_cat_${cat.slug}`} />

      <section className="ds-section" style={{ paddingTop: 0 }}>
        <div className="ds-container">
          <div className="ds-section-head">
            <h2 className="ds-h2">Explore more categories</h2>
          </div>
          <div className="ds-cats">
            {others.slice(0, 3).map((c) => <CategoryCard key={c.slug} category={c} />)}
          </div>
        </div>
      </section>
    </>
  );
}

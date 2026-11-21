import Link from "next/link";
import Icon from "@/components/ui/Icon";
import CategoryCard from "@/components/ui/CategoryCard";
import ToolCard from "@/components/ui/ToolCard";
import ToolExplorer from "@/components/home/ToolExplorer";
import FaqList, { faqSchema } from "@/components/home/FaqList";
import ProjectDuniyaPromo from "@/components/promo/ProjectDuniyaPromo";
import { CATEGORIES, allTools, popularTools } from "@/lib/catalog";

const FAQ = [
  {
    q: "Are the tools on ToolsCenterHub really free?",
    a: "Yes. Every tool on the site is free to use, with no account, no subscription and no watermark on your results.",
  },
  {
    q: "Do I need to sign up or install anything?",
    a: "No. Open a tool in your browser on desktop or mobile, add your file or text, and get the result straight away.",
  },
  {
    q: "What kinds of tools can I find here?",
    a: "PDF tools (merge, split, convert), image tools (resize, compress, crop, convert), developer utilities (JSON, Base64, minifiers), calculators (EMI, SIP, GST, BMI and more), AI and text tools, and everyday utilities such as a QR code and password generator.",
  },
  {
    q: "How are my files handled?",
    a: "We don't ask you to create an account to use the tools. Please read our Privacy Policy for the details of how files and data are processed.",
  },
  {
    q: "Who is behind ToolsCenterHub?",
    a: "ToolsCenterHub is built by the ProjectDuniya team, which also runs project ideas, coding help and academic guidance for students and developers at projectduniya.com.",
  },
  {
    q: "A tool is not working or I need a new one. What should I do?",
    a: "Use the Contact page to tell us which tool and what happened. We read every message and add new tools based on what people ask for.",
  },
];

export default function Home() {
  const popular = popularTools();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(FAQ)) }}
      />

      {/* HERO */}
      <section className="ds-hero">
        <div className="ds-container">
          <span className="ds-pill">
            <Icon name="Zap" size={15} /> {allTools.length}+ free tools · No signup
          </span>
          <h1>
            Every online tool you need, <span>in one place</span>
          </h1>
          <p className="ds-hero-sub">
            Resize images, merge PDFs, format JSON, calculate EMI and more.
            Fast, free and simple on any device.
          </p>

          <ul className="ds-trust">
            <li><Icon name="Check" size={16} /> 100% free to use</li>
            <li><Icon name="Check" size={16} /> No account needed</li>
            <li><Icon name="Check" size={16} /> Works on mobile</li>
          </ul>
        </div>
      </section>

      {/* SEARCH + ALL TOOLS */}
      <section className="ds-container" style={{ paddingBottom: 24 }} aria-label="Find a tool">
        <ToolExplorer tools={allTools} />
      </section>

      {/* CATEGORIES */}
      <section className="ds-section">
        <div className="ds-container">
          <div className="ds-section-head">
            <span className="ds-eyebrow">Browse by category</span>
            <h2 className="ds-h2">Pick what you want to do</h2>
            <p className="ds-lead">
              Six focused collections, each with tools built for one kind of job.
            </p>
          </div>
          <div className="ds-cats">
            {CATEGORIES.map((c) => (
              <CategoryCard key={c.slug} category={c} />
            ))}
          </div>
        </div>
      </section>

      {/* POPULAR */}
      <section className="ds-section" style={{ paddingTop: 0 }}>
        <div className="ds-container">
          <div className="ds-section-head">
            <span className="ds-eyebrow">Most used</span>
            <h2 className="ds-h2">Popular tools</h2>
          </div>
          <div className="ds-grid">
            {popular.map((t: any) => (
              <ToolCard key={t.slug} tool={t} />
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="ds-section" style={{ paddingTop: 0 }}>
        <div className="ds-container">
          <div className="ds-section-head">
            <span className="ds-eyebrow">How it works</span>
            <h2 className="ds-h2">Done in three steps</h2>
          </div>
          <div className="ds-steps">
            <div className="ds-step">
              <h3>Choose a tool</h3>
              <p>Search or browse {allTools.length}+ tools across PDF, image, developer, calculator and AI categories.</p>
            </div>
            <div className="ds-step">
              <h3>Add your input</h3>
              <p>Drop in a file or type your values. There is nothing to install and no account to create.</p>
            </div>
            <div className="ds-step">
              <h3>Get your result</h3>
              <p>Download or copy the output in seconds, without watermarks.</p>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTDUNIYA PROMO */}
      <ProjectDuniyaPromo variant="full" campaign="tools_home" />

      {/* ABOUT / SEO COPY */}
      <section className="ds-section">
        <div className="ds-container ds-prose">
          <h2>Free online tools that save you time</h2>
          <p>
            ToolsCenterHub brings the small jobs of study, work and everyday life
            into one fast website. Instead of hunting for a different app every
            time you need to compress a photo for a form, merge two PDFs or check
            an EMI, you can do it here in a few clicks.
          </p>
          <h3>Built for students, creators and developers</h3>
          <p>
            Students use the PDF and image tools for assignments and applications.
            Developers use the JSON, Base64 and minifier tools while building.
            Everyone uses the calculators. Every tool is free, loads quickly and
            works on a phone as well as a laptop.
          </p>
          <h3>Part of the ProjectDuniya family</h3>
          <p>
            ToolsCenterHub is made by the team behind ProjectDuniya. If you need
            more than a quick tool, explore{" "}
            <Link href="/blog">our blog</Link> for guides, or visit ProjectDuniya
            for project ideas, coding help and academic guidance.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="ds-section" style={{ paddingTop: 0 }}>
        <div className="ds-container">
          <div className="ds-section-head">
            <span className="ds-eyebrow">FAQ</span>
            <h2 className="ds-h2">Frequently asked questions</h2>
          </div>
          <FaqList items={FAQ} />
        </div>
      </section>
    </>
  );
}

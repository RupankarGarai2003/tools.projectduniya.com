import Link from "next/link";
import Icon from "@/components/ui/Icon";
import ToolCard from "@/components/ui/ToolCard";
import { CATEGORIES, toolsInCategory, allTools } from "@/lib/catalog";

export const metadata = {
  title: "All Free Online Tools",
  description:
    "Browse every free ToolsCenterHub tool: PDF converters, image resizer and compressor, QR code and password generators, developer utilities, calculators and AI text tools.",
  alternates: { canonical: "/tools" },
  robots: { index: true, follow: true },
};

export default function ToolsIndexPage() {
  return (
    <>
      <section className="ds-pagehead" style={{ "--c": "#4f46e5", "--t": "#eef2ff" }}>
        <div className="ds-container">
          <nav className="ds-crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link><span>/</span><strong>All tools</strong>
          </nav>
          <h1>All free online tools</h1>
          <p>
            {allTools.length} fast, free tools in {CATEGORIES.length} categories.
            No signup needed.
          </p>
        </div>
      </section>

      {CATEGORIES.map((c) => (
        <section key={c.slug} className="ds-section" style={{ padding: "44px 0 0" }}>
          <div className="ds-container">
            <h2 className="ds-h2" style={{ fontSize: 24, marginBottom: 18, display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ color: c.color }}><Icon name={c.icon} size={24} /></span>
              <Link href={`/category/${c.slug}`} style={{ color: "inherit", textDecoration: "none" }}>
                {c.name}
              </Link>
            </h2>
            <div className="ds-grid">
              {toolsInCategory(c.slug).map((t) => <ToolCard key={t.slug} tool={t} />)}
            </div>
          </div>
        </section>
      ))}
      <div style={{ height: 56 }} />
    </>
  );
}

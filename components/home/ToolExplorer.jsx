"use client";

import { useMemo, useState } from "react";
import Icon from "@/components/ui/Icon";
import ToolCard from "@/components/ui/ToolCard";
import { CATEGORIES } from "@/lib/catalog";

/* Search + category filter. Receives plain serialisable tool data from the
   server page, so the full list is already in the HTML before hydration. */
export default function ToolExplorer({ tools }) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");

  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    return tools.filter(
      (t) =>
        (cat === "all" || t.categorySlug === cat) &&
        (!s ||
          t.name.toLowerCase().includes(s) ||
          (t.description || "").toLowerCase().includes(s))
    );
  }, [tools, q, cat]);

  return (
    <>
      <div className="ds-search">
        <Icon name="Search" size={20} />
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={`Search ${tools.length} tools: resize image, merge PDF, EMI…`}
          aria-label="Search tools"
        />
      </div>

      <div className="ds-chips" role="group" aria-label="Filter by category">
        <button
          className="ds-chip"
          aria-pressed={cat === "all"}
          onClick={() => setCat("all")}
        >
          All
        </button>
        {CATEGORIES.map((c) => (
          <button
            key={c.slug}
            className="ds-chip"
            aria-pressed={cat === c.slug}
            onClick={() => setCat(c.slug)}
          >
            {c.short}
          </button>
        ))}
      </div>

      <div className="ds-grid" id="tools">
        {list.map((t) => (
          <ToolCard key={t.slug} tool={t} />
        ))}
        {list.length === 0 && (
          <p className="ds-empty">No tools match “{q}”. Try another keyword.</p>
        )}
      </div>
    </>
  );
}

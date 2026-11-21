import Link from "next/link";
import Icon from "./Icon";
import { getCategory } from "@/lib/catalog";

export default function ToolCard({ tool }) {
  const cat = getCategory(tool.categorySlug);
  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="ds-tool"
      style={{ "--c": cat.color, "--t": cat.tint }}
    >
      <span className="ds-tool-icon">
        <Icon name={cat.icon} size={22} />
      </span>
      <span className="ds-tool-body">
        <span className="ds-tool-name">{tool.name}</span>
        <span className="ds-tool-desc">{tool.description}</span>
      </span>
      <Icon name="ArrowRight" size={16} className="ds-tool-arrow" />
    </Link>
  );
}

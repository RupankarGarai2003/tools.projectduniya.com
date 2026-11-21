import Link from "next/link";
import Icon from "./Icon";
import { toolsInCategory } from "@/lib/catalog";

export default function CategoryCard({ category }) {
  const count = toolsInCategory(category.slug).length;
  return (
    <Link
      href={`/category/${category.slug}`}
      className="ds-cat"
      style={{ "--c": category.color, "--t": category.tint }}
    >
      <span className="ds-cat-icon">
        <Icon name={category.icon} size={26} />
      </span>
      <h3>{category.name}</h3>
      <p>{category.tagline}</p>
      <span className="ds-cat-foot">
        {count} tools <Icon name="ArrowRight" size={15} />
      </span>
    </Link>
  );
}

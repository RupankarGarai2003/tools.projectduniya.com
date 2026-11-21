import Link from "next/link";
import Image from "next/image";
import Icon from "@/components/ui/Icon";
import { blogs } from "@/lib/blogs";
import ProjectDuniyaPromo from "@/components/promo/ProjectDuniyaPromo";

export const metadata = {
  title: "Blog",
  description:
    "Tutorials and guides on resizing and compressing images, working with PDFs, and using free online calculators and developer tools.",
  alternates: { canonical: "/blog" },
  robots: { index: true, follow: true },
};

export default function BlogPage() {
  return (
    <>
      <section className="ds-pagehead" style={{ "--c": "#4f46e5", "--t": "#eef2ff" }}>
        <div className="ds-container">
          <nav className="ds-crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link><span>/</span><strong>Blog</strong>
          </nav>
          <span className="ds-pagehead-ico"><Icon name="BookOpen" size={28} /></span>
          <h1>Guides &amp; tutorials</h1>
          <p>
            Step-by-step guides for our calculators and tools, so you get the
            right answer and understand how it works.
          </p>
        </div>
      </section>

      <section className="ds-section" style={{ paddingBottom: 24 }}>
        <div className="ds-container">
          <div className="ds-grid ds-grid-blog">
            {blogs.map((blog) => (
              <Link key={blog.slug} href={`/blog/${blog.slug}`} className="ds-post">
                <span className="ds-post-img">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
                  />
                </span>
                <span className="ds-post-body">
                  <span className="ds-post-meta">
                    <b>{blog.category}</b>
                    <span>{blog.date}</span>
                  </span>
                  <h2>{blog.title}</h2>
                  <p>{blog.description}</p>
                  <span className="ds-post-more">
                    Read guide <Icon name="ArrowRight" size={15} />
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ProjectDuniyaPromo variant="full" campaign="tools_blog_index" />
    </>
  );
}

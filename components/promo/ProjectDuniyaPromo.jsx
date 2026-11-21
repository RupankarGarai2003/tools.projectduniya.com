import "../Styles/Promo.css";
import { PARENT_SITE, BLOG_SITE, sisterLink } from "../../lib/site";

/*
  Promotional blocks for the two sister sites.
  variant="full"    -> large showcase (homepage, blog index)
  variant="compact" -> single slim card (end of blog posts, about page)
  `campaign` is the utm_campaign value, so each placement is trackable.
*/

const SERVICES = [
  { icon: "🎓", label: "Final Year Projects" },
  { icon: "💻", label: "Coding & Development" },
  { icon: "🤖", label: "AI & Research Help" },
  { icon: "🧪", label: "Testing Support" },
];

export default function ProjectDuniyaPromo({
  variant = "full",
  campaign = "promo",
  toolName = "",
}) {
  const mainHome = sisterLink(PARENT_SITE, "/", campaign);
  const services = sisterLink(PARENT_SITE, "/services", campaign);
  const ideas = sisterLink(PARENT_SITE, "/project-ideas", campaign);
  const blogHome = sisterLink(BLOG_SITE, "/", campaign);

  /* variant="tool": shown at the bottom of every tool page */
  if (variant === "tool") {
    return (
      <section className="pd-tool" aria-label="ProjectDuniya">
        <div className="pd-orb pd-orb-a" />
        <div className="pd-tool-copy">
          <span className="pd-badge pd-badge-light">
            🚀 ProjectDuniya · by the ToolsCenterHub team
          </span>
          <h2>
            {toolName ? `Done with ${toolName}? ` : "Got a bigger task? "}
            <span>Let’s build your whole project.</span>
          </h2>
          <p>
            Final year project ideas, coding help, AI &amp; research support
            and testing, from students to developers, we have you covered.
          </p>
          <ul className="pd-chips">
            {SERVICES.map((s) => (
              <li key={s.label}>
                <span aria-hidden="true">{s.icon}</span> {s.label}
              </li>
            ))}
          </ul>
        </div>
        <div className="pd-tool-actions">
          <a href={services} className="pd-btn pd-btn-white">
            Get Project Help →
          </a>
          <a href={ideas} className="pd-btn pd-btn-outline">
            Project Ideas
          </a>
          <a href={blogHome} className="pd-btn pd-btn-outline">
            Read the Blog
          </a>
        </div>
      </section>
    );
  }

  if (variant === "compact") {
    return (
      <aside className="pd-compact" aria-label="ProjectDuniya">
        <div className="pd-compact-text">
          <span className="pd-badge">ProjectDuniya</span>
          <h3>Need help with a project, code or research?</h3>
          <p>
            Get project ideas, coding help and academic guidance from the team
            behind ToolsCenterHub.
          </p>
        </div>
        <div className="pd-compact-actions">
          <a href={services} className="pd-btn pd-btn-primary">
            Get Project Help →
          </a>
          <a href={blogHome} className="pd-btn pd-btn-ghost">
            Read the Blog
          </a>
        </div>
      </aside>
    );
  }

  return (
    <section className="pd-section" aria-label="ProjectDuniya">
      <div className="pd-hero">
        <div className="pd-orb pd-orb-a" />
        <div className="pd-orb pd-orb-b" />

        <div className="pd-hero-copy">
          <span className="pd-badge pd-badge-light">
            ✨ From the makers of ToolsCenterHub
          </span>

          <h2>
            Free tools get the small jobs done.
            <br />
            <span>ProjectDuniya gets your whole project done.</span>
          </h2>

          <p>
            Final year project ideas, coding help and academic guidance for
            students and developers, all in one place.
          </p>

          <ul className="pd-chips">
            {SERVICES.map((s) => (
              <li key={s.label}>
                <span aria-hidden="true">{s.icon}</span> {s.label}
              </li>
            ))}
          </ul>

          <div className="pd-actions">
            <a href={services} className="pd-btn pd-btn-white">
              Explore Services →
            </a>
            <a href={ideas} className="pd-btn pd-btn-outline">
              Browse Project Ideas
            </a>
          </div>
        </div>

        <a href={mainHome} className="pd-hero-card" aria-label="Visit ProjectDuniya.com">
          <div className="pd-window">
            <i /> <i /> <i />
            <span>projectduniya.com</span>
          </div>
          <strong>Project help,</strong>
          <strong>ideas &amp; guidance</strong>
          <small>Visit ProjectDuniya.com →</small>
        </a>
      </div>

      <div className="pd-blog">
        <div>
          <span className="pd-badge">📚 ProjectDuniya Blogs</span>
          <h3>Learn more. Build better.</h3>
          <p>
            Tutorials, guides and student resources, written to help you finish
            projects with confidence.
          </p>
        </div>
        <a href={blogHome} className="pd-btn pd-btn-primary">
          Visit blogs.projectduniya.com →
        </a>
      </div>
    </section>
  );
}

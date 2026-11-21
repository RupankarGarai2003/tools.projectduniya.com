import Link from "next/link";
import { CATEGORIES } from "@/lib/catalog";
import {
  PARENT_SITE, BLOG_SITE, CONTACT_EMAIL, sisterLink,
} from "@/lib/site";

export default function SiteFooter() {
  return (
    <footer className="ds-footer">
      <div className="ds-container">
        <div className="ds-footer-top">
          <div className="ds-footer-brand">
            <Link href="/" className="ds-logo">
              <span className="ds-logo-mark">T</span>
              <span className="ds-logo-text">ToolsCenterHub</span>
            </Link>
            <p>
              Free online PDF, image, developer and calculator tools. Fast,
              private and no signup, built by the ProjectDuniya team.
            </p>
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            <a href="tel:+918391808784">+91 8391808784</a>
            <a href="tel:+917679109146">+91 7679109146</a>
          </div>

          <div>
            <h4>Tool categories</h4>
            {CATEGORIES.map((c) => (
              <Link key={c.slug} href={`/category/${c.slug}`}>{c.name}</Link>
            ))}
          </div>

          <div>
            <h4>Company</h4>
            <Link href="/about-us">About us</Link>
            <Link href="/contact-us">Contact</Link>
            <Link href="/help">Help center</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/tools">All tools</Link>
          </div>

          <div>
            <h4>Legal</h4>
            <Link href="/privacy-policy">Privacy policy</Link>
            <Link href="/terms">Terms &amp; conditions</Link>
            <Link href="/disclaimer">Disclaimer</Link>
          </div>

          <div>
            <h4>ProjectDuniya</h4>
            <a href={sisterLink(PARENT_SITE, "/", "footer")}>ProjectDuniya.com</a>
            <a href={sisterLink(PARENT_SITE, "/services", "footer")}>Project help</a>
            <a href={sisterLink(PARENT_SITE, "/project-ideas", "footer")}>Project ideas</a>
            <a href={sisterLink(BLOG_SITE, "/", "footer")}>ProjectDuniya Blogs</a>
          </div>
        </div>

        <div className="ds-footer-bottom">
          <span>
            © {new Date().getFullYear()} ToolsCenterHub, a{" "}
            <a href={sisterLink(PARENT_SITE, "/", "footer_credit")}>ProjectDuniya</a>{" "}
            project. All rights reserved.
          </span>
          <span>Made in India 🇮🇳</span>
        </div>
      </div>
    </footer>
  );
}

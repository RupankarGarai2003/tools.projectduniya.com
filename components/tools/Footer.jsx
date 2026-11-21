
import "../Styles/Footer.css";
import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import {
  PARENT_SITE,
  BLOG_SITE,
  CONTACT_EMAIL,
  sisterLink,
} from "../../lib/site";

export default function Footer() {
  return (
    <footer className="footer-dark">

      {/* MAIN */}
      <div className="footer-main">

        {/* COMPANY */}
        <div className="footer-col">
          <h3>ToolsCenterHub</h3>
          <p>
            Free online tools for images, PDFs, and developers.
            Fast, secure, and easy to use.
          </p>
        </div>

        {/* PRODUCTS */}
        <div className="footer-col">
          <h4>Products</h4>
          <Link href="/tools/image-resizer">Image Resizer</Link>
          <Link href="/tools/pdf-to-word">PDF to Word</Link>
          <Link href="/tools/json-formatter">JSON Formatter</Link>
          <Link href="/tools">All Tools</Link>
        </div>

        {/* USEFUL LINKS */}
        <div className="footer-col">
          <h4>Useful Links</h4>
          <Link href="/about-us">About</Link>
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/contact-us">Contact</Link>
          <Link href="/help">Help</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/disclaimer">Disclaimer</Link>
          <Link href="/blog">Blogs</Link>
        </div>

        {/* PROJECTDUNIYA NETWORK */}
        <div className="footer-col">
          <h4>ProjectDuniya</h4>
          <a href={sisterLink(PARENT_SITE, "/", "footer")}>
            ProjectDuniya.com
          </a>
          <a href={sisterLink(PARENT_SITE, "/services", "footer")}>
            Project Help Services
          </a>
          <a href={sisterLink(PARENT_SITE, "/project-ideas", "footer")}>
            Project Ideas
          </a>
          <a href={sisterLink(BLOG_SITE, "/", "footer")}>
            ProjectDuniya Blogs
          </a>
        </div>

        {/* CONTACT */}
        <div className="footer-col">
          <h4>Contact</h4>

          <p>
            <MapPin size={14} />
            India
          </p>

          <p>
            <Mail size={14} />
            <a href={`mailto:${CONTACT_EMAIL}`}>
              {CONTACT_EMAIL}
            </a>
          </p>

          <p>
            <Phone size={14} />
            <a href="tel:+918391808784">
              +91 8391808784
            </a>
          </p>

          <p>
            <Phone size={14} />
            <a href="tel:+917679109146">
              +91 7679109146
            </a>
          </p>
        </div>

      </div>

      {/* BOTTOM */}
      <div className="footer-bottom">
        © {new Date().getFullYear()} ToolsCenterHub, a{" "}
        <a href={sisterLink(PARENT_SITE, "/", "footer_credit")}>
          ProjectDuniya
        </a>{" "}
        project. All rights reserved.
      </div>

    </footer>
  );
}
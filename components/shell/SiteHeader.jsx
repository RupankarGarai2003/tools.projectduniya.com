"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/Icon";
import { CATEGORIES } from "@/lib/catalog";
import { PARENT_SITE, sisterLink } from "@/lib/site";

export default function SiteHeader() {
  const [mega, setMega] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const wrap = useRef(null);

  useEffect(() => {
    const onDoc = (e) => {
      if (wrap.current && !wrap.current.contains(e.target)) setMega(false);
    };
    const onKey = (e) => e.key === "Escape" && (setMega(false), setDrawer(false));
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const close = () => (setMega(false), setDrawer(false));

  return (
    <header className="ds-header">
      <div className="ds-container ds-header-in">
        <Link href="/" className="ds-logo" onClick={close}>
          <span className="ds-logo-mark">T</span>
          <span className="ds-logo-text">
            Tools<b>CenterHub</b>
          </span>
        </Link>

        <nav className="ds-nav" aria-label="Main">
          <div className="ds-mega-wrap" ref={wrap}>
            <button
              className="ds-nav-btn"
              aria-expanded={mega}
              aria-haspopup="true"
              onClick={() => setMega((v) => !v)}
            >
              Categories <Icon name="ChevronDown" size={16} />
            </button>
            {mega && (
              <div className="ds-mega" role="menu">
                {CATEGORIES.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/category/${c.slug}`}
                    onClick={close}
                    style={{ "--c": c.color, "--t": c.tint }}
                  >
                    <span className="ds-mega-ico">
                      <Icon name={c.icon} size={20} />
                    </span>
                    <span>
                      <strong>{c.name}</strong>
                      <small>{c.tagline}</small>
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link href="/tools">All Tools</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/about-us">About</Link>
        </nav>

        <a
          className="ds-btn ds-btn-primary ds-header-cta"
          href={sisterLink(PARENT_SITE, "/services", "header_cta")}
        >
          <Icon name="Rocket" size={16} /> Project Help
        </a>

        <button
          className="ds-burger"
          aria-label={drawer ? "Close menu" : "Open menu"}
          aria-expanded={drawer}
          onClick={() => setDrawer((v) => !v)}
        >
          <Icon name={drawer ? "X" : "Menu"} size={22} />
        </button>
      </div>

      {drawer && (
        <div className="ds-drawer">
          {CATEGORIES.map((c) => (
            <Link key={c.slug} href={`/category/${c.slug}`} onClick={close}>
              <span style={{ color: c.color }}>
                <Icon name={c.icon} size={20} />
              </span>
              {c.name}
            </Link>
          ))}
          <Link href="/tools" onClick={close}>All Tools</Link>
          <Link href="/blog" onClick={close}>Blog</Link>
          <Link href="/about-us" onClick={close}>About</Link>
          <a
            className="ds-btn ds-btn-primary"
            href={sisterLink(PARENT_SITE, "/services", "drawer_cta")}
          >
            <Icon name="Rocket" size={16} /> Get Project Help
          </a>
        </div>
      )}
    </header>
  );
}

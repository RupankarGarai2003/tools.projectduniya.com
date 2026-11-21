/* Single source of truth for the site's identity and its two sister sites.
   Parent site canonical is the www host (confirmed from its own <link rel="canonical">). */

export const SITE_URL = "https://tools.projectduniya.com";
export const SITE_NAME = "ToolsCenterHub";

export const PARENT_SITE = "https://www.projectduniya.com";
export const BLOG_SITE = "https://blogs.projectduniya.com";

export const CONTACT_EMAIL = "projectduniya.help@gmail.com";

export const SOCIAL_LINKS = [
  "https://www.instagram.com/projectduniya.help",
  "https://t.me/HiringAlertt",
  "https://www.facebook.com/profile.php?id=61580355323239",
];

/* Same UTM convention the two sister sites already use
   (utm_source=<own domain>&utm_medium=<site type>&utm_campaign=<placement>),
   so traffic from here shows up consistently in their analytics. */
export function sisterLink(base, path, campaign) {
  const p = path || "/";
  const q = `utm_source=tools.projectduniya.com&utm_medium=tools&utm_campaign=${campaign}`;
  return `${base}${p}${p.includes("?") ? "&" : "?"}${q}`;
}

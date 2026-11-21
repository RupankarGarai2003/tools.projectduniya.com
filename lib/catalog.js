/*
  Catalog: groups the 64 tools into 6 browsable categories.
  Every category gets its own SEO hub page at /category/<slug>.
  Tool engines live in components/tools and are wired in lib/toolsList.js;
  this file only decides how tools are grouped and presented.
*/
import { tools } from "./toolsList";

export const CATEGORIES = [
  {
    slug: "pdf-tools",
    name: "PDF Tools",
    short: "PDF",
    icon: "FileText",
    color: "#ef4444",
    tint: "#fef2f2",
    tagline: "Merge, split, compress, convert and protect PDFs.",
    title: "Free Online PDF Tools - Merge, Split, Compress & Convert",
    description:
      "Free online PDF tools: merge, split, compress, protect, unlock and convert PDF to Word or JPG. No signup, fast and secure.",
    intro:
      "Everything you need to work with PDF files in your browser. Merge several PDFs into one, split a long document, shrink file size for email, or convert between PDF, Word and images, free and without watermarks.",
  },
  {
    slug: "image-tools",
    name: "Image Tools",
    short: "Image",
    icon: "Image",
    color: "#0ea5e9",
    tint: "#f0f9ff",
    tagline: "Resize, compress, crop and convert images.",
    title: "Free Online Image Tools - Resize, Compress, Crop & Convert",
    description:
      "Free online image tools: resize, compress, crop and convert JPG, PNG and WEBP images, or remove a background. Fast, private and free.",
    intro:
      "Resize photos for forms and social media, compress images without visible quality loss, crop to the right ratio, or convert between JPG and PNG. Files are processed quickly and you never need an account.",
  },
  {
    slug: "developer-tools",
    name: "Developer Tools",
    short: "Developer",
    icon: "Code2",
    color: "#10b981",
    tint: "#ecfdf5",
    tagline: "Format JSON, encode Base64 and minify code.",
    title: "Free Online Developer Tools - JSON, Base64, URL & Minifiers",
    description:
      "Free developer tools online: JSON formatter and validator, Base64 and URL encoder/decoder, HTML, CSS and JavaScript minifiers.",
    intro:
      "Small utilities developers reach for every day: pretty-print and validate JSON, encode or decode Base64 and URLs, and minify HTML, CSS and JavaScript before you ship.",
  },
  {
    slug: "calculators",
    name: "Calculators",
    short: "Calculator",
    icon: "Calculator",
    color: "#f59e0b",
    tint: "#fffbeb",
    tagline: "Finance, health, school and everyday maths.",
    title: "Free Online Calculators - Finance, Health, Percentage & More",
    description:
      "Free online calculators: EMI, SIP, GST, BMI, age, percentage, GPA, compound interest and more. Instant, accurate results.",
    intro:
      "From EMI, SIP and GST to BMI, GPA and percentage, these calculators give instant, accurate answers for money, health, school and day-to-day questions.",
  },
  {
    slug: "ai-text-tools",
    name: "AI & Text Tools",
    short: "AI & Text",
    icon: "Sparkles",
    color: "#8b5cf6",
    tint: "#f5f3ff",
    tagline: "Write, summarise, translate and polish text.",
    title: "Free AI & Text Tools - Summarizer, Grammar Checker & Writers",
    description:
      "Free AI and text tools: summarizer, paraphraser, grammar checker, translator, resume analyzer, cover letter and email writers.",
    intro:
      "Draft, rewrite and polish faster. Summarise long text, check grammar, translate, analyse a resume, or generate emails, captions and cover letters with AI assistance.",
  },
  {
    slug: "utility-tools",
    name: "Utilities",
    short: "Utility",
    icon: "Wrench",
    color: "#ec4899",
    tint: "#fdf2f8",
    tagline: "QR codes, passwords, word count and unit converters.",
    title: "Free Online Utilities - QR Code, Password Generator & Converters",
    description:
      "Free online utilities: QR code generator, strong password generator, word counter, and length, weight and temperature converters.",
    intro:
      "Handy everyday helpers: generate a QR code or a strong password, count words, and convert length, weight and temperature in a click.",
  },
];

const SLUG_TO_CATEGORY = {};
const put = (cat, slugs) => slugs.forEach((s) => (SLUG_TO_CATEGORY[s] = cat));

put("pdf-tools", [
  "pdf-to-word", "word-to-pdf", "jpg-to-pdf", "pdf-merger",
  "pdf-splitter", "pdf-to-jpg", "pdf-compressor", "pdf-protect", "pdf-unlock",
]);
put("image-tools", [
  "image-resizer", "image-compressor", "image-converter", "image-cropper",
  "png-to-jpg", "jpg-to-png", "background-remover",
]);
put("developer-tools", [
  "json-formatter", "json-validator", "base64-encoder", "base64-decoder",
  "html-minifier", "css-minifier", "js-minifier", "url-encoder", "url-decoder",
]);
put("utility-tools", [
  "qr-code-generator", "password-generator", "word-counter",
  "length-converter", "weight-converter", "temperature-converter",
]);

export function categoryOf(tool) {
  const explicit = SLUG_TO_CATEGORY[tool.slug];
  if (explicit) return explicit;
  if (tool.category === "calculator") return "calculators";
  if (tool.category === "text") return "ai-text-tools";
  return "utility-tools";
}

export const allTools = tools.map((t) => ({ ...t, categorySlug: categoryOf(t) }));

export const getCategory = (slug) => CATEGORIES.find((c) => c.slug === slug);

export const toolsInCategory = (slug) =>
  allTools.filter((t) => t.categorySlug === slug);

export const getToolMeta = (slug) =>
  allTools.find((t) => t.slug.toLowerCase() === String(slug).toLowerCase());

/* the tools most people look for first, in display order */
export const POPULAR_SLUGS = [
  "image-resizer", "image-compressor", "pdf-to-word", "pdf-merger",
  "word-to-pdf", "emi-calculator", "qr-code-generator", "json-formatter",
];
export const popularTools = () =>
  POPULAR_SLUGS.map(getToolMeta).filter(Boolean);

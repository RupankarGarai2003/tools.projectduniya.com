import {
  FileText, Image, Code2, Calculator, Sparkles, Wrench, ArrowRight,
  Search, ShieldCheck, Zap, Smartphone, Menu, X, ChevronDown, Rocket,
  BookOpen, Check,
} from "lucide-react";

const ICONS = {
  FileText, Image, Code2, Calculator, Sparkles, Wrench, ArrowRight, Search,
  ShieldCheck, Zap, Smartphone, Menu, X, ChevronDown, Rocket, BookOpen, Check,
};

export default function Icon({ name, size = 20, ...rest }) {
  const Cmp = ICONS[name] || Wrench;
  return <Cmp size={size} aria-hidden="true" {...rest} />;
}

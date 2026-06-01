import { useState, useEffect } from "react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import {
  Search, Bell, User, Plus, Check, ChevronDown, ChevronRight,
  Eye, EyeOff, ArrowRight, BookOpen, GraduationCap, Clock,
  CheckCircle, AlertCircle, AlertTriangle, Info, Menu, X,
  MoreHorizontal, Download, Star, Users, Globe,
  Code, Monitor, Award, Mail, Calendar, Layers, Zap, Settings, FileText,
} from "lucide-react";
import noroffLogoFullPng from "@/imports/Noroff_Logo_Full.png";
import imgCreative01 from "@/imports/Genre_Creative_01.jpg";
import imgCreative02 from "@/imports/Genre_Creative_02.jpg";
import imgCreativeFilm from "@/imports/Genre_Creative_Film_Graphic.jpg";
import imgCreativeMusic from "@/imports/Genre_Creative_Music.jpg";
import imgTechCreative01 from "@/imports/Genre_Technical_Creative_01.jpg";
import imgTechCreative03 from "@/imports/Genre_Technical_Creative_03.jpg";
import imgTechCreative04 from "@/imports/Genre_Technical_Creative_04.jpg";
import imgTechCreative05 from "@/imports/Genre_Technical_Creative_05.jpg";
import imgTechCreative06 from "@/imports/Genre_Technical_Creative_06.jpg";
import imgTechCreative09 from "@/imports/Genre_Technical_Creative_09.jpg";
import imgTechCreative from "@/imports/Genre_Technical_Creative.jpg";
import noroffLogoSvg from "@/imports/Noroff_Logo-1.svg";
import noroffLogoWhiteSvg from "@/imports/Noroff_Logo_white.svg";
import noroffLogo2Svg from "@/imports/Noroff_Logo-2.svg";

// ── Inline Noroff mark for colour-controlled uses ──────────────────────────
function NoroffMark({ fill = "#E12B21", className }: { fill?: string; className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 54 88" fill="none" className={className}>
      <path
        d="M43.2778 39.1367V10.1367H26.7778V0.136719H53.2778V54.1367H43.2778L10.2778 15.1367V53.9541L26.2778 72.8633L35.5845 61.8633L41.9312 69.3633L26.2778 87.8633L0.277832 57.1367V0.136719H10.2778L43.2778 39.1367Z"
        fill={fill}
      />
    </svg>
  );
}

// ── Nav ────────────────────────────────────────────────────────────────────
const NAV = [
  { id: "brand",      label: "Brand",      num: "01" },
  { id: "colors",     label: "Colors",     num: "02" },
  { id: "typography", label: "Typography", num: "03" },
  { id: "spacing",    label: "Spacing",    num: "04" },
  { id: "buttons",    label: "Buttons",    num: "05" },
  { id: "forms",      label: "Forms",      num: "06" },
  { id: "badges",     label: "Badges",     num: "07" },
  { id: "cards",      label: "Cards",      num: "08" },
  { id: "navigation", label: "Navigation", num: "09" },
  { id: "icons",      label: "Icons",      num: "10" },
  { id: "imagery",   label: "Imagery",    num: "11" },
];

// ── Colour data ────────────────────────────────────────────────────────────
const PALETTE = [
  {
    group: "Brand",
    swatches: [
      { label: "Primary Red",    hex: "#E12B21", token: "--primary",    light: false },
      { label: "Secondary",      hex: "#40403E", token: "--secondary",  light: false },
      { label: "Background",     hex: "#FAFAF8", token: "--background", light: true  },
    ],
  },
  {
    group: "Neutrals",
    swatches: [
      { label: "Text",       hex: "#1A1A19", token: "--foreground",      light: false },
      { label: "Neutral 1",  hex: "#5C5C5B", token: "--muted-foreground",light: false },
      { label: "Neutral 2",  hex: "#8F8E8D", token: "",                  light: false },
      { label: "Neutral 3",  hex: "#C2C1C0", token: "",                  light: true  },
      { label: "Neutral 4",  hex: "#DBDBD9", token: "--border",          light: true  },
      { label: "Neutral 5",  hex: "#F4F4F2", token: "--muted",           light: true  },
    ],
  },
  {
    group: "Accent",
    swatches: [
      { label: "Accent Light", hex: "#FFABA6", token: "--accent",      light: true  },
      { label: "Accent Dark",  hex: "#AA0D04", token: "--destructive", light: false },
    ],
  },
];

// ── Type scale ─────────────────────────────────────────────────────────────
const TYPE_SCALE = [
  { label: "H1",         size: "48px", weight: "700", cls: "text-5xl font-bold leading-tight",   sample: "Noroff Higher Vocational College" },
  { label: "H2",         size: "36px", weight: "700", cls: "text-4xl font-bold leading-tight uppercase",   sample: "Front-end Development" },
  { label: "H3",         size: "24px", weight: "600", cls: "text-2xl font-semibold leading-snug",sample: "Programme Overview" },
  { label: "H4",         size: "20px", weight: "600", cls: "text-xl font-semibold leading-snug", sample: "Learning Objectives" },
  { label: "Body Large", size: "18px", weight: "400", cls: "text-lg font-normal leading-relaxed",sample: "Noroff offers bachelor's and vocationally-oriented programmes in technology and digital media." },
  { label: "Body",       size: "16px", weight: "400", cls: "text-base font-normal leading-relaxed",sample: "Our graduates are sought after across the technology and creative industries, both in Norway and internationally." },
  { label: "Body Small", size: "14px", weight: "400", cls: "text-sm font-normal leading-relaxed",sample: "Programme duration: 3 years · 180 ECTS credits · Campus and online" },
  { label: "Label",      size: "12px", weight: "500", cls: "text-xs font-medium uppercase tracking-wider",sample: "BACHELOR'S PROGRAMME" },
];

// ── Icon set ───────────────────────────────────────────────────────────────
const ICON_SET = [
  { icon: BookOpen,      name: "BookOpen"      },
  { icon: GraduationCap, name: "GraduationCap" },
  { icon: Award,         name: "Award"         },
  { icon: FileText,      name: "FileText"      },
  { icon: Calendar,      name: "Calendar"      },
  { icon: Clock,         name: "Clock"         },
  { icon: Code,          name: "Code"          },
  { icon: Monitor,       name: "Monitor"       },
  { icon: Globe,         name: "Globe"         },
  { icon: Zap,           name: "Zap"           },
  { icon: Layers,        name: "Layers"        },
  { icon: Settings,      name: "Settings"      },
  { icon: Search,        name: "Search"        },
  { icon: Bell,          name: "Bell"          },
  { icon: Mail,          name: "Mail"          },
  { icon: User,          name: "User"          },
  { icon: Users,         name: "Users"         },
  { icon: Download,      name: "Download"      },
];

// ── Spacing ────────────────────────────────────────────────────────────────
const SPACING = [
  { label: "2xs", px: 4,  token: "space-1"  },
  { label: "xs",  px: 8,  token: "space-2"  },
  { label: "sm",  px: 16, token: "space-4"  },
  { label: "md",  px: 24, token: "space-6"  },
  { label: "lg",  px: 32, token: "space-8"  },
  { label: "xl",  px: 48, token: "space-12" },
  { label: "2xl", px: 64, token: "space-16" },
];

// ── Shared helpers ─────────────────────────────────────────────────────────
function SectionHeader({ num, title }: { num: string; title: string }) {
  return (
    <div className="mb-10">
      <span className="text-xs font-medium tracking-widest uppercase text-primary">{num}</span>
      <h2 className="text-3xl font-bold mt-1 tracking-tight text-foreground">{title}</h2>
      <div className="mt-4 h-px bg-border" />
    </div>
  );
}

function Tag({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`inline-block text-xs font-medium uppercase tracking-wider px-2 py-0.5 ${className}`}>
      {children}
    </span>
  );
}

function CopyBtn({ value }: { value: string }) {
  const [done, setDone] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(value);
    setDone(true);
    setTimeout(() => setDone(false), 1400);
  };
  return (
    <button
      onClick={copy}
      className="opacity-0 group-hover:opacity-100 transition-opacity p-0.5 rounded text-muted-foreground hover:text-foreground"
    >
      {done ? <Check size={11} className="text-green-600" /> : <span className="text-[10px]">copy</span>}
    </button>
  );
}

// ── Main App ───────────────────────────────────────────────────────────────
export default function App() {
  const [active, setActive] = useState("brand");
  const [showPw, setShowPw] = useState(false);
  const [checks, setChecks] = useState<Record<string, boolean>>({ "Front-End Development": true });
  const [radio, setRadio] = useState("campus");
  const [toggled, setToggled] = useState(true);
  const [selectVal, setSelectVal] = useState("bsc-cs");
  const [mobileNav, setMobileNav] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-15% 0px -75% 0px" }
    );
    NAV.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileNav(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* ── Sidebar ──────────────────────────────────────────────────────── */}
      <aside
        className={`fixed top-0 left-0 h-screen z-20 flex flex-col transition-transform duration-300
          ${mobileNav ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          w-60`}
        style={{ backgroundColor: "#40403E", borderRight: "1px solid rgba(255,255,255,0.07)" }}
      >
        {/* Logo */}
        <div className="px-6 pt-7 pb-6" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          <div className="flex flex-col gap-1.5">
            <img src={noroffLogoWhiteSvg} alt="Noroff" className="h-5 w-auto object-contain object-left" />
            <div className="text-white/45 text-[10px] leading-tight">Design System</div>
          </div>
        </div>

        {/* Nav links */}
        <nav className="flex-1 px-3 py-5 flex flex-col gap-0.5 overflow-y-auto">
          {NAV.map(({ id, label, num }) => {
            const isActive = active === id;
            return (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="w-full flex items-center gap-3 px-3 py-2.5 text-left rounded transition-colors"
                style={{
                  color: isActive ? "#FFFFFF" : "rgba(255,255,255,0.42)",
                  backgroundColor: isActive ? "rgba(255,255,255,0.1)" : "transparent",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.7)";
                }}
                onMouseLeave={(e) => {
                  if (!isActive) (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.42)";
                }}
              >
                <span
                  className="text-[10px] font-medium w-5 shrink-0 tracking-wider"
                  style={{ color: isActive ? "#E12B21" : "inherit", fontVariantNumeric: "tabular-nums" }}
                >
                  {num}
                </span>
                <span className="text-sm font-medium">{label}</span>
                {isActive && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full shrink-0 bg-primary" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Version */}
        <div className="px-6 py-4" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          <div className="text-[10px] text-white/30 font-medium tracking-wider uppercase">v1.0 · 2025</div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {mobileNav && (
        <div
          className="fixed inset-0 bg-black/40 z-10 md:hidden"
          onClick={() => setMobileNav(false)}
        />
      )}

      {/* Mobile top bar */}
      <div
        className="fixed top-0 left-0 right-0 h-14 flex items-center justify-between px-4 z-10 md:hidden"
        style={{ backgroundColor: "#40403E" }}
      >
        <div className="flex items-center gap-3">
          <img src={noroffLogoWhiteSvg} alt="Noroff" className="h-5 w-auto object-contain" />
          <span className="text-white/50 text-xs">Design System</span>
        </div>
        <button
          onClick={() => setMobileNav(!mobileNav)}
          className="text-white/70 hover:text-white transition-colors"
        >
          {mobileNav ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* ── Main content ─────────────────────────────────────────────────── */}
      <main className="ml-0 md:ml-60 flex-1 min-h-screen pt-14 md:pt-0">
        <div className="max-w-[900px] mx-auto px-6 md:px-14 py-12 md:py-16">

          {/* ── HERO ── */}
          <div className="mb-20 pb-16 border-b border-border">
            <img
              src={noroffLogoSvg}
              alt="Noroff"
              className="h-12 w-auto object-contain mb-8"
            />
            <h1
              className="leading-none mb-5"
              style={{ fontFamily: "'IBM Plex Serif', serif", fontSize: "72px", fontWeight: 300, color: "var(--primary)" }}
            >
              Design System
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
              The official visual language for Noroff School of Technology and Digital Media. Color, type, spacing, and components — all in one place.
            </p>
            <div className="flex flex-wrap gap-2 mt-8">
              {NAV.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className="px-4 py-2 text-sm font-medium border border-border rounded-md hover:bg-muted transition-colors"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* ── 01 BRAND ── */}
          <section id="brand" className="mb-20">
            <SectionHeader num="01" title="Brand" />

            <div className="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-5">Logo Variants</div>
            <div className="grid gap-4 sm:grid-cols-2 mb-12">
              {/* Light bg */}
              <div className="p-10 bg-card border border-border rounded-md flex items-center justify-center">
                <img
                  src={noroffLogoFullPng}
                  alt="Noroff full logo on light background"
                  className="h-16 w-auto object-contain"
                />
              </div>
              {/* Dark bg */}
              <div
                className="pt-12 pb-8 px-10 rounded-md flex items-center justify-center"
                style={{ backgroundColor: "#40403E" }}
              >
                <img src={noroffLogoWhiteSvg} alt="Noroff" className="h-12 w-auto object-contain" />
              </div>
              {/* Red bg */}
              <div
                className="pt-12 pb-8 px-10 rounded-md flex items-center justify-center"
                style={{ backgroundColor: "#E12B21" }}
              >
                <img src={noroffLogoWhiteSvg} alt="Noroff" className="h-12 w-auto object-contain" />
              </div>
              {/* Mark isolated */}
              <div className="p-10 bg-muted border border-border rounded-md flex flex-col items-center justify-center gap-3">
                <NoroffMark fill="#E12B21" className="h-14 w-auto" />
                <div className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
                  Mark — isolated use
                </div>
              </div>
            </div>

            <div className="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-5">Clearspace & Usage</div>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                { rule: "✓ Use on white or off-white backgrounds", ok: true },
                { rule: "✓ Use reversed (white) on dark or red backgrounds", ok: true },
                { rule: "✗ Do not recolor the red mark to any other hue", ok: false },
              ].map(({ rule, ok }) => (
                <div
                  key={rule}
                  className="p-4 rounded-md text-sm border"
                  style={{
                    borderColor: ok ? "#DBDBD9" : "#FFABA6",
                    backgroundColor: ok ? "#FAFAF8" : "#FFF5F4",
                  }}
                >
                  {rule}
                </div>
              ))}
            </div>
          </section>

          {/* ── 02 COLORS ── */}
          <section id="colors" className="mb-20">
            <SectionHeader num="02" title="Colors" />
            <div className="flex flex-col gap-10">
              {PALETTE.map((group) => (
                <div key={group.group}>
                  <div className="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-4">
                    {group.group}
                  </div>
                  <div className="grid gap-3" style={{ gridTemplateColumns: `repeat(${group.swatches.length}, minmax(0, 1fr))` }}>
                    {group.swatches.map((s) => (
                      <div key={s.label} className="group flex flex-col gap-2">
                        <div
                          className="h-16 rounded-md border border-black/8"
                          style={{ backgroundColor: s.hex }}
                        />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-mono text-foreground">{s.hex}</span>
                            <CopyBtn value={s.hex} />
                          </div>
                          <div className="text-xs text-foreground font-medium">{s.label}</div>
                          {s.token && (
                            <div className="text-[10px] font-mono text-muted-foreground">{s.token}</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── 03 TYPOGRAPHY ── */}
          <section id="typography" className="mb-20">
            <SectionHeader num="03" title="Typography" />
            <div className="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-5">
              Inter · All text in #1A1A19 on #FAFAF8
            </div>

            <div className="flex flex-col divide-y divide-border mb-12">
              {TYPE_SCALE.map((t) => (
                <div key={t.label} className="py-6 grid grid-cols-[7rem_1fr] gap-4 items-start">
                  <div className="pt-1">
                    <div className="text-xs font-medium text-foreground">{t.label}</div>
                    <div className="text-[10px] font-mono text-muted-foreground mt-0.5">
                      {t.size} / {t.weight}
                    </div>
                  </div>
                  <div className={t.cls}>{t.sample}</div>
                </div>
              ))}
            </div>

            {/* Colour-on-colour */}
            <div className="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-4">
              Text on backgrounds
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                { bg: "#FAFAF8", text: "#1A1A19", label: "Text on Background", border: true },
                { bg: "#E12B21", text: "#FFFFFF", label: "White on Primary", border: false },
                { bg: "#40403E", text: "#FFFFFF", label: "White on Secondary", border: false },
              ].map(({ bg, text, label, border }) => (
                <div
                  key={label}
                  className={`p-5 rounded-md ${border ? "border border-border" : ""}`}
                  style={{ backgroundColor: bg }}
                >
                  <div className="text-base font-semibold mb-1" style={{ color: text }}>Aa Bb Cc</div>
                  <div className="text-sm" style={{ color: text, opacity: 0.8 }}>{label}</div>
                  <div className="text-xs mt-2 font-mono" style={{ color: text, opacity: 0.5 }}>
                    {text} on {bg}
                  </div>
                </div>
              ))}
            </div>

            {/* ── IBM Plex Serif ── */}
            <div className="mt-14 pt-10 border-t border-border">
              <div className="flex items-baseline justify-between mb-1">
                <div className="text-xs font-medium tracking-widest uppercase text-muted-foreground">
                  Secondary Face — Use sparingly
                </div>
                <div className="text-xs font-mono text-muted-foreground">IBM Plex Serif</div>
              </div>
              <p className="text-sm text-muted-foreground mb-8 max-w-lg">
                Reserved for hero headings and pull quotes only. Never use for body copy, UI labels, or navigation. The pairing of IBM Plex Serif with Inter creates editorial contrast without sacrificing readability.
              </p>

              {/* Hero display — 140px Light */}
              <div className="mb-10 pb-8 border-b border-border overflow-hidden">
                <div
                  className="leading-none"
                  style={{ fontFamily: "'IBM Plex Serif', serif", fontSize: "140px", fontWeight: 300, color: "var(--primary)" }}
                >
                  Get ready.
                </div>
                <div className="flex items-center gap-3 mt-3">
                  <span className="text-xs font-medium text-foreground">140px</span>
                  <span className="text-muted-foreground/30">·</span>
                  <span className="text-[10px] font-mono text-muted-foreground">Light / 300 · Primary hero use</span>
                </div>
              </div>

              {/* Secondary use — course headings & pull quotes */}
              <div className="mb-10 pb-8 border-b border-border">
                <div
                  className="leading-tight"
                  style={{ fontFamily: "'IBM Plex Serif', serif", fontSize: "64px", fontWeight: 300, color: "var(--primary)" }}
                >
                  Applied Artificial Intelligence
                </div>
                <div className="flex items-center gap-3 mt-3">
                  <span className="text-xs font-medium text-foreground">64px</span>
                  <span className="text-muted-foreground/30">·</span>
                  <span className="text-[10px] font-mono text-muted-foreground">Light / 300 · Course headings & pull quotes</span>
                </div>
              </div>

              {/* Pull quotes */}
              <div className="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-6">
                Pull Quotes
              </div>
              <div className="flex flex-col gap-6">
                {/* Primary — red left border */}
                <div className="pl-6 border-l-[3px] border-primary py-1">
                  <blockquote
                    className="leading-snug"
                    style={{ fontFamily: "'IBM Plex Serif', serif", fontSize: "48px", fontWeight: 300, color: "var(--primary)" }}
                  >
                    "Get ready for a changing world. Study online or in Norway."
                  </blockquote>
                  <cite className="block mt-5 text-sm not-italic font-medium text-muted-foreground">
                    — noroff.no
                  </cite>
                </div>

                {/* Secondary — charcoal left border */}
                <div className="pl-6 border-l-[3px] border-secondary py-1">
                  <blockquote
                    className="leading-snug text-foreground"
                    style={{ fontFamily: "'IBM Plex Serif', serif", fontSize: "48px", fontWeight: 300 }}
                  >
                    "Master the skills behind intelligent systems that learn, predict, and automate."
                  </blockquote>
                  <cite className="block mt-5 text-sm not-italic font-medium text-muted-foreground">
                    — Applied AI, Noroff
                  </cite>
                </div>

                {/* Inverted — white on primary red */}
                <div className="p-10 rounded-md" style={{ backgroundColor: "var(--primary)" }}>
                  <blockquote
                    className="leading-snug text-white"
                    style={{ fontFamily: "'IBM Plex Serif', serif", fontSize: "48px", fontWeight: 300 }}
                  >
                    "Become the bridge between software development and IT operations."
                  </blockquote>
                  <cite className="block mt-5 text-sm not-italic font-medium text-white/60">
                    — DevOps, Noroff
                  </cite>
                </div>

                {/* Editorial display — centred */}
                <div className="py-12 border-y border-border text-center px-6">
                  <blockquote
                    className="leading-snug"
                    style={{ fontFamily: "'IBM Plex Serif', serif", fontSize: "48px", fontWeight: 300, color: "var(--primary)" }}
                  >
                    "Study when and where it suits you, on your terms."
                  </blockquote>
                  <cite className="block mt-5 text-sm not-italic font-medium text-muted-foreground">
                    — noroff.no
                  </cite>
                </div>
              </div>
            </div>
          </section>

          {/* ── 04 SPACING ── */}
          <section id="spacing" className="mb-20">
            <SectionHeader num="04" title="Spacing" />
            <div className="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-6">
              8px base grid · 4 / 8 / 16 / 24 / 32 / 48 / 64
            </div>
            <div className="flex flex-col gap-3">
              {SPACING.map(({ label, px, token }) => (
                <div key={label} className="flex items-center gap-5">
                  <div className="w-16 text-right">
                    <div className="text-xs font-medium text-foreground">{px}px</div>
                    <div className="text-[10px] font-mono text-muted-foreground">{label}</div>
                  </div>
                  <div
                    className="h-6 rounded-sm"
                    style={{ width: `${px * 2.5}px`, backgroundColor: "#E12B21", opacity: 0.8 }}
                  />
                  <div className="text-[10px] font-mono text-muted-foreground">{token}</div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-xs font-medium tracking-widest uppercase text-muted-foreground mb-4">
              Grid — 12 columns · 24px gutters · 80px margins
            </div>
            <div className="relative rounded-md overflow-hidden border border-border" style={{ height: "80px" }}>
              <div className="absolute inset-x-0 inset-y-0 flex items-center px-[80px] gap-[24px]">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex-1 h-full"
                    style={{ backgroundColor: i % 2 === 0 ? "rgba(225,43,33,0.08)" : "rgba(225,43,33,0.04)" }}
                  />
                ))}
              </div>
              <div className="absolute inset-y-0 left-0 w-[80px] bg-primary/10 flex items-center justify-center">
                <span className="text-[10px] font-mono text-primary rotate-0">80px</span>
              </div>
              <div className="absolute inset-y-0 right-0 w-[80px] bg-primary/10 flex items-center justify-center">
                <span className="text-[10px] font-mono text-primary">80px</span>
              </div>
            </div>
          </section>

          {/* ── 05 BUTTONS ── */}
          <section id="buttons" className="mb-20">
            <SectionHeader num="05" title="Buttons" />

            <div className="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-5">Variants</div>
            <div className="flex flex-wrap gap-3 mb-10">
              <button className="px-5 py-2.5 bg-primary text-primary-foreground text-sm font-semibold rounded-md hover:bg-[#C82219] transition-colors">
                Primary
              </button>
              <button className="px-5 py-2.5 bg-transparent text-secondary border border-secondary text-sm font-semibold rounded-md hover:bg-secondary hover:text-white transition-colors">
                Secondary
              </button>
              <button className="px-5 py-2.5 bg-transparent text-foreground text-sm font-semibold rounded-md hover:bg-muted transition-colors">
                Ghost
              </button>
              <button className="px-5 py-2.5 bg-destructive text-destructive-foreground text-sm font-semibold rounded-md hover:opacity-85 transition-opacity">
                Destructive
              </button>
              <button
                className="px-5 py-2.5 text-sm font-semibold rounded-md cursor-not-allowed"
                style={{ backgroundColor: "#DBDBD9", color: "#8F8E8D" }}
                disabled
              >
                Disabled
              </button>
            </div>

            <div className="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-5">Sizes</div>
            <div className="flex flex-wrap items-center gap-3 mb-10">
              <button className="px-3.5 py-1.5 bg-primary text-white text-xs font-semibold rounded hover:bg-[#C82219] transition-colors">
                Small
              </button>
              <button className="px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-md hover:bg-[#C82219] transition-colors">
                Medium
              </button>
              <button className="px-7 py-3.5 bg-primary text-white text-base font-semibold rounded-md hover:bg-[#C82219] transition-colors">
                Large
              </button>
            </div>

            <div className="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-5">With Icons</div>
            <div className="flex flex-wrap gap-3">
              <button className="px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-md hover:bg-[#C82219] transition-colors flex items-center gap-2">
                <Plus size={15} /> Apply Now
              </button>
              <button className="px-5 py-2.5 border border-secondary text-secondary text-sm font-semibold rounded-md hover:bg-secondary hover:text-white transition-colors flex items-center gap-2">
                <Download size={15} /> Download Brochure
              </button>
              <button className="px-5 py-2.5 text-foreground text-sm font-semibold rounded-md hover:bg-muted transition-colors flex items-center gap-1.5 group">
                Learn More
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
              </button>
              <button className="p-2.5 bg-primary text-white rounded-md hover:bg-[#C82219] transition-colors">
                <Search size={16} />
              </button>
              <button className="p-2.5 border border-border text-foreground rounded-md hover:bg-muted transition-colors">
                <Bell size={16} />
              </button>
            </div>
          </section>

          {/* ── 06 FORMS ── */}
          <section id="forms" className="mb-20">
            <SectionHeader num="06" title="Forms" />

            <div className="grid gap-6 sm:grid-cols-2 mb-10">
              {/* Text input */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  Text Input
                </label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 border border-border rounded-md bg-card text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                />
              </div>

              {/* Search */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  Search
                </label>
                <div className="relative">
                  <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                  <input
                    type="search"
                    placeholder="Search programmes..."
                    className="w-full pl-9 pr-4 py-3 border border-border rounded-md bg-card text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPw ? "text" : "password"}
                    defaultValue="noroff2025"
                    className="w-full px-4 pr-10 py-3 border border-border rounded-md bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  />
                  <button
                    onClick={() => setShowPw(!showPw)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>

              {/* Select */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  Programme
                </label>
                <div className="relative">
                  <select
                    value={selectVal}
                    onChange={(e) => setSelectVal(e.target.value)}
                    className="w-full appearance-none px-4 pr-9 py-3 border border-border rounded-md bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all cursor-pointer"
                  >
                    <option value="bsc-cs">BSc Computer Science</option>
                    <option value="bsc-gd">BSc Game Development</option>
                    <option value="bsc-wd">BSc Web Development</option>
                    <option value="ba-gd">BA Graphic Design</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                </div>
              </div>
            </div>

            {/* States */}
            <div className="grid gap-4 sm:grid-cols-3 mb-10">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Default</label>
                <input
                  type="text"
                  placeholder="Placeholder text"
                  className="px-4 py-3 border border-border rounded-md bg-card text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium uppercase tracking-widest text-primary">Focused</label>
                <input
                  type="text"
                  defaultValue="Active value"
                  className="px-4 py-3 border border-primary rounded-md bg-card text-foreground text-sm ring-2 ring-primary/20 outline-none"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium uppercase tracking-widest text-destructive">Error</label>
                <input
                  type="text"
                  defaultValue="invalid@"
                  className="px-4 py-3 border border-destructive rounded-md bg-card text-foreground text-sm ring-2 ring-destructive/20 outline-none"
                />
                <p className="text-xs text-destructive">Please enter a valid email address.</p>
              </div>
            </div>

            {/* Checkbox / Radio / Toggle */}
            <div className="grid gap-8 sm:grid-cols-3">
              <div>
                <div className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-4">Checkbox</div>
                <div className="flex flex-col gap-3.5">
                  {["Front-End Development", "Back-End Development", "UX / UI Design"].map((opt) => (
                    <label key={opt} className="flex items-center gap-3 cursor-pointer">
                      <div
                        className="w-4 h-4 rounded border shrink-0 flex items-center justify-center transition-colors"
                        style={{
                          backgroundColor: checks[opt] ? "#E12B21" : "transparent",
                          borderColor: checks[opt] ? "#E12B21" : "#DBDBD9",
                        }}
                        onClick={() => setChecks((p) => ({ ...p, [opt]: !p[opt] }))}
                      >
                        {checks[opt] && <Check size={10} className="text-white" strokeWidth={3} />}
                      </div>
                      <span className="text-sm">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-4">Radio</div>
                <div className="flex flex-col gap-3.5">
                  {[
                    { val: "campus", label: "On campus" },
                    { val: "online", label: "Online" },
                    { val: "hybrid", label: "Hybrid" },
                  ].map(({ val, label }) => (
                    <label key={val} className="flex items-center gap-3 cursor-pointer">
                      <div
                        className="w-4 h-4 rounded-full border shrink-0 flex items-center justify-center transition-colors"
                        style={{ borderColor: radio === val ? "#E12B21" : "#DBDBD9" }}
                        onClick={() => setRadio(val)}
                      >
                        {radio === val && <div className="w-2 h-2 rounded-full bg-primary" />}
                      </div>
                      <span className="text-sm">{label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-4">Toggle</div>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3 cursor-pointer" onClick={() => setToggled(!toggled)}>
                    <div
                      className="relative w-10 h-5 rounded-full transition-colors shrink-0"
                      style={{ backgroundColor: toggled ? "#E12B21" : "#DBDBD9" }}
                    >
                      <span
                        className="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform"
                        style={{ transform: toggled ? "translateX(22px)" : "translateX(2px)" }}
                      />
                    </div>
                    <span className="text-sm">{toggled ? "Notifications on" : "Notifications off"}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div
                      className="relative w-10 h-5 rounded-full shrink-0"
                      style={{ backgroundColor: "#DBDBD9" }}
                    >
                      <span
                        className="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm"
                        style={{ transform: "translateX(2px)" }}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground">Marketing emails</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ── 07 BADGES ── */}
          <section id="badges" className="mb-20">
            <SectionHeader num="07" title="Badges" />

            <div className="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-5">Status Badges</div>
            <div className="flex flex-wrap gap-2.5 mb-10">
              {[
                { label: "Primary",   cls: "bg-primary text-white" },
                { label: "Secondary", cls: "bg-secondary text-white" },
                { label: "Accent",    cls: "bg-accent text-foreground" },
                { label: "Outline",   cls: "border border-border text-foreground" },
                { label: "Muted",     cls: "bg-muted text-muted-foreground" },
                { label: "Success",   cls: "bg-green-100 text-green-800" },
                { label: "Warning",   cls: "bg-amber-100 text-amber-800" },
                { label: "Error",     cls: "bg-red-100 text-red-800" },
              ].map(({ label, cls }) => (
                <span key={label} className={`px-2.5 py-1 rounded text-xs font-medium ${cls}`}>
                  {label}
                </span>
              ))}
            </div>

            <div className="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-5">Programme Tags</div>
            <div className="flex flex-wrap gap-2 mb-10">
              {["Bachelor's", "3 Years", "Online", "On Campus", "Hybrid", "180 ECTS", "English", "Norwegian"].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full border border-border text-xs font-medium text-foreground hover:border-primary hover:text-primary transition-colors cursor-default"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-5">Alert Banners</div>
            <div className="flex flex-col gap-3">
              {[
                { icon: CheckCircle, title: "Application submitted", msg: "We have received your application for BSc Computer Science starting autumn 2025.", cls: "border-green-200 bg-green-50", icls: "text-green-600" },
                { icon: AlertTriangle, title: "Deadline approaching", msg: "The application deadline for this programme is 15 April 2025. Apply before it's too late.", cls: "border-amber-200 bg-amber-50", icls: "text-amber-600" },
                { icon: AlertCircle, title: "Documents missing", msg: "Your application is incomplete. Please upload your diploma before the deadline.", cls: "border-red-200 bg-red-50", icls: "text-red-600" },
                { icon: Info, title: "New programme available", msg: "BSc Artificial Intelligence is now open for applications for the 2025 intake.", cls: "border-blue-200 bg-blue-50", icls: "text-blue-600" },
              ].map(({ icon: Icon, title, msg, cls, icls }) => (
                <div key={title} className={`flex gap-3.5 p-4 border rounded-md ${cls}`}>
                  <Icon size={16} className={`${icls} shrink-0 mt-0.5`} />
                  <div>
                    <div className="text-sm font-semibold mb-0.5">{title}</div>
                    <div className="text-sm text-muted-foreground">{msg}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── 08 CARDS ── */}
          <section id="cards" className="mb-20">
            <SectionHeader num="08" title="Cards" />

            <div className="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-5">Programme Cards</div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-10">
              {[
                {
                  img: imgTechCreative04, alt: "Student working on a laptop in a warm home studio beside a golden retriever",
                  badge: "2-year programme", cat: "Technology", level: "BSc",
                  title: "Applied Artificial Intelligence", mode: "Online",
                },
                {
                  img: imgCreativeMusic, alt: "Music student operating a DJ controller in an art studio with warm window light",
                  badge: "2-year programme", cat: "Creative", level: "Vocational",
                  title: "Music Production", mode: "On campus",
                },
                {
                  img: imgCreative01, alt: "Graphic design student reviewing printed photos and layouts on a warm rug",
                  badge: "2-year programme", cat: "Design", level: "BA",
                  title: "Graphic Design", mode: "Online · On campus",
                },
              ].map(({ img, alt, badge, cat, level, title, mode }) => (
                <div
                  key={title}
                  className="bg-card border border-border rounded-md overflow-hidden hover:shadow-lg transition-shadow group flex flex-col"
                >
                  <div className="relative overflow-hidden">
                    <ImageWithFallback
                      src={img}
                      alt={alt}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3">
                      <span className="inline-block px-2.5 py-1 rounded-sm text-xs font-medium bg-white/90 backdrop-blur-sm text-foreground">
                        {badge}
                      </span>
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[10px] font-medium uppercase tracking-wider px-2 py-0.5 bg-primary/10 text-primary rounded">{cat}</span>
                      <span className="text-[10px] font-medium uppercase tracking-wider px-2 py-0.5 bg-muted text-muted-foreground rounded">{level}</span>
                    </div>
                    <div className="flex items-start justify-between gap-2 flex-1">
                      <h3 className="font-bold text-base leading-tight group-hover:text-primary transition-colors">{title}</h3>
                      <ArrowRight size={15} className="shrink-0 mt-0.5 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                    </div>
                    <div className="mt-3 pt-3 border-t border-border text-xs text-muted-foreground">{mode}</div>
                  </div>
                  <div className="h-2 bg-primary w-full shrink-0" />
                </div>
              ))}
            </div>

            <div className="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-5">Stat Cards</div>
            <div className="grid gap-4 sm:grid-cols-3 mb-10">
              {[
                { value: "2 000+",  label: "Students enrolled",   sub: "Autumn 2024",              icon: Users },
                { value: "40+",    label: "Programmes offered",    sub: "BSc and vocational",          icon: GraduationCap },
                { value: "15",     label: "Years as a school",     sub: "Est. 2010",                   icon: Award },
              ].map(({ value, label, sub, icon: Icon }) => (
                <div key={label} className="bg-card border border-border rounded-md p-6">
                  <Icon size={18} className="text-primary mb-4" />
                  <div className="text-4xl font-bold tracking-tight mb-1">{value}</div>
                  <div className="text-sm font-semibold">{label}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{sub}</div>
                </div>
              ))}
            </div>

            {/* List card */}
            <div className="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-5">Activity Feed</div>
            <div className="bg-card border border-border rounded-md">
              <div className="px-6 py-4 border-b border-border flex items-center justify-between">
                <div>
                  <div className="font-semibold text-sm">Recent Applications</div>
                  <div className="text-xs text-muted-foreground mt-0.5">Spring intake 2025</div>
                </div>
                <button className="text-xs font-medium text-primary hover:underline">View all</button>
              </div>
              <div className="divide-y divide-border">
                {[
                  { name: "Emma Karlsen",    prog: "BSc Computer Science",  status: "Accepted",  statusCls: "bg-green-100 text-green-700", time: "Today, 09:14" },
                  { name: "Liam Johansen",   prog: "BSc Game Development",  status: "Pending",   statusCls: "bg-amber-100 text-amber-700", time: "Today, 08:51" },
                  { name: "Sofia Andersen",  prog: "BA Graphic Design",     status: "Reviewing", statusCls: "bg-blue-100 text-blue-700",   time: "Yesterday" },
                  { name: "Noah Pedersen",   prog: "BSc Web Development",   status: "Accepted",  statusCls: "bg-green-100 text-green-700", time: "2 days ago" },
                ].map(({ name, prog, status, statusCls, time }) => (
                  <div key={name} className="px-6 py-3.5 flex items-center gap-4 hover:bg-muted/50 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-secondary text-white text-[11px] font-bold flex items-center justify-center shrink-0">
                      {name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium">{name}</div>
                      <div className="text-xs text-muted-foreground truncate">{prog}</div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-[11px] text-muted-foreground font-mono">{time}</span>
                      <span className={`text-[11px] font-medium px-2.5 py-0.5 rounded ${statusCls}`}>{status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── 09 NAVIGATION ── */}
          <section id="navigation" className="mb-20">
            <SectionHeader num="09" title="Navigation" />

            {/* Primary nav bar */}
            <div className="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-5">Primary Navigation</div>
            <div className="rounded-md overflow-hidden border border-border mb-10">
              <div
                className="flex items-center justify-between px-6 h-16"
                style={{ backgroundColor: "#FAFAF8", borderBottom: "1px solid #DBDBD9" }}
              >
                <div className="flex items-center gap-8">
                  <div className="flex items-center">
                    <img src={noroffLogo2Svg} alt="Noroff" className="h-7 w-auto object-contain" />
                  </div>
                  <nav className="hidden sm:flex items-center gap-1">
                    {["Studies", "Courses", "Admission", "News", "About"].map((item, i) => (
                      <button
                        key={item}
                        className={`px-3.5 py-2 text-sm font-medium rounded-md transition-colors ${
                          i === 0
                            ? "text-primary bg-primary/5"
                            : "text-foreground hover:bg-muted"
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </nav>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors">
                    <Search size={16} />
                  </button>
                  <button className="px-4 py-2 bg-primary text-white text-sm font-semibold rounded-md hover:bg-[#C82219] transition-colors hidden sm:block">
                    Apply
                  </button>
                  <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors sm:hidden">
                    <Menu size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Breadcrumb */}
            <div className="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-5">Breadcrumb</div>
            <div className="flex items-center gap-1 mb-10">
              {["Home", "Programmes", "Technology", "Computer Science"].map((crumb, i, arr) => (
                <div key={crumb} className="flex items-center gap-1">
                  <button
                    className={`text-sm transition-colors ${
                      i === arr.length - 1
                        ? "text-foreground font-medium cursor-default"
                        : "text-muted-foreground hover:text-primary"
                    }`}
                  >
                    {crumb}
                  </button>
                  {i < arr.length - 1 && <ChevronRight size={14} className="text-muted-foreground/40" />}
                </div>
              ))}
            </div>

            {/* Tabs */}
            <div className="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-5">Tab Navigation</div>
            <div className="border border-border rounded-md overflow-hidden">
              <div className="flex border-b border-border bg-muted/40">
                {["overview", "curriculum", "admission", "careers"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-5 py-3.5 text-sm font-medium capitalize transition-colors border-b-2 -mb-px ${
                      activeTab === tab
                        ? "border-primary text-primary bg-background"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className="p-6 bg-background">
                {activeTab === "overview" && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Programme Overview</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      The Bachelor of Computer Science at Noroff prepares students for careers in software development, systems architecture, and digital innovation. Graduates leave with both theoretical grounding and practical, industry-ready skills.
                    </p>
                  </div>
                )}
                {activeTab === "curriculum" && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Curriculum</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Three years of structured learning across programming fundamentals, databases, algorithms, networking, and a final year project in collaboration with an industry partner.
                    </p>
                  </div>
                )}
                {activeTab === "admission" && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Admission Requirements</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Applicants must hold a Norwegian upper secondary school diploma (videregående) or equivalent. Relevant work experience may be considered in lieu of formal qualifications.
                    </p>
                  </div>
                )}
                {activeTab === "careers" && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Career Outcomes</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Graduates work as software engineers, solutions architects, product managers, and consultants across Norway and internationally. The programme holds strong ties to the tech industry.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* ── 10 ICONS ── */}
          <section id="icons" className="mb-20">
            <SectionHeader num="10" title="Icons" />
            <p className="text-sm text-muted-foreground mb-10 max-w-lg">
              Icons are from the Lucide library. Use primary red for interactive and highlighted elements, secondary charcoal for supporting UI, and white-on-primary for icon buttons and filled chips.
            </p>

            {/* Primary */}
            <div className="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-4">
              Primary — #E12B21
            </div>
            <div className="grid grid-cols-6 sm:grid-cols-9 gap-px bg-border border border-border rounded-md overflow-hidden mb-8">
              {ICON_SET.map(({ icon: Icon, name }) => (
                <div key={`p-${name}`} className="flex flex-col items-center gap-2 p-4 bg-background">
                  <Icon size={22} style={{ color: "var(--primary)" }} />
                  <span className="text-[9px] font-mono text-muted-foreground text-center leading-tight hidden sm:block">{name}</span>
                </div>
              ))}
            </div>

            {/* Secondary */}
            <div className="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-4">
              Secondary — #40403E
            </div>
            <div className="grid grid-cols-6 sm:grid-cols-9 gap-px bg-border border border-border rounded-md overflow-hidden mb-8">
              {ICON_SET.map(({ icon: Icon, name }) => (
                <div key={`s-${name}`} className="flex flex-col items-center gap-2 p-4 bg-background">
                  <Icon size={22} style={{ color: "var(--secondary)" }} />
                  <span className="text-[9px] font-mono text-muted-foreground text-center leading-tight hidden sm:block">{name}</span>
                </div>
              ))}
            </div>

            {/* White on Primary */}
            <div className="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-4">
              White on Primary
            </div>
            <div className="grid grid-cols-6 sm:grid-cols-9 gap-3">
              {ICON_SET.map(({ icon: Icon, name }) => (
                <div key={`w-${name}`} className="flex flex-col items-center gap-2">
                  <div
                    className="w-11 h-11 rounded-md flex items-center justify-center"
                    style={{ backgroundColor: "var(--primary)" }}
                  >
                    <Icon size={20} className="text-white" />
                  </div>
                  <span className="text-[9px] font-mono text-muted-foreground text-center leading-tight hidden sm:block">{name}</span>
                </div>
              ))}
            </div>
          </section>

          {/* ── 11 IMAGERY ── */}
          <section id="imagery" className="mb-20">
            <SectionHeader num="11" title="Imagery" />

            <p className="text-base text-foreground leading-relaxed max-w-2xl mb-2">
              Noroff imagery is built around one idea: <strong>people in the act of making</strong>. Every photograph should feel like it was taken mid-thought — not posed, not polished, not performed.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl mb-12">
              The camera catches someone absorbed in their craft. The environment is lived-in and personal. The light is warm and natural. Technology is present but secondary — a laptop on a cluttered desk, a red pen next to a sketchbook, a DJ controller in an art studio. What the viewer remembers is the human.
            </p>

            {/* Image grid */}
            <div className="grid grid-cols-12 gap-3 mb-14">
              {/* Row 1 — portrait + wide */}
              <div className="col-span-4">
                <ImageWithFallback
                  src={imgCreative02}
                  alt="Young man in a dark coat framed through a camera tripod in an art studio, red headphones"
                  className="w-full h-72 object-cover rounded-md"
                />
              </div>
              <div className="col-span-8">
                <ImageWithFallback
                  src={imgCreativeFilm}
                  alt="Filmmaker operating a camera rig while a dancer poses in a bright minimal white studio"
                  className="w-full h-72 object-cover rounded-md"
                />
              </div>
              {/* Row 2 — three even */}
              <div className="col-span-4">
                <ImageWithFallback
                  src={imgCreativeMusic}
                  alt="Woman with headphones operating a DJ controller in an art studio, warm window light"
                  className="w-full h-56 object-cover rounded-md"
                />
              </div>
              <div className="col-span-4">
                <ImageWithFallback
                  src={imgCreative01}
                  alt="Overhead shot of a woman reviewing printed photos and working on a laptop on a warm Persian rug"
                  className="w-full h-56 object-cover rounded-md"
                />
              </div>
              <div className="col-span-4">
                <ImageWithFallback
                  src={imgTechCreative03}
                  alt="Overhead shot of a woman on a cosy couch working on a laptop with a cat beside her"
                  className="w-full h-56 object-cover rounded-md"
                />
              </div>
              {/* Row 3 — close-up portrait + wide overhead */}
              <div className="col-span-5">
                <ImageWithFallback
                  src={imgTechCreative09}
                  alt="Close-up of a young woman with glasses deeply focused on a screen, warm window light"
                  className="w-full h-64 object-cover rounded-md object-top"
                />
              </div>
              <div className="col-span-7">
                <ImageWithFallback
                  src={imgTechCreative}
                  alt="Overhead shot of two students studying together on the floor with a laptop, notes and takeaway coffee"
                  className="w-full h-64 object-cover rounded-md"
                />
              </div>
              {/* Row 4 — two portrait scenes */}
              <div className="col-span-6">
                <ImageWithFallback
                  src={imgTechCreative06}
                  alt="Older man studying at a dining table in warm evening light, writing in a notebook with laptop open"
                  className="w-full h-72 object-cover rounded-md"
                />
              </div>
              <div className="col-span-6">
                <ImageWithFallback
                  src={imgTechCreative05}
                  alt="Woman studying at a kitchen table with laptop and notebook while a young child plays nearby with crayons"
                  className="w-full h-72 object-cover rounded-md"
                />
              </div>
            </div>

            {/* Style description */}
            <div className="grid gap-8 sm:grid-cols-2 mb-14">
              <div>
                <div className="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-4">Image Direction</div>
                <div className="flex flex-col gap-4 text-sm leading-relaxed text-foreground">
                  <p><strong>Human-first, always.</strong> The person is the subject. Tools, screens, and technology exist in the frame to give context — they never replace the human as the focal point.</p>
                  <p><strong>Caught in the act.</strong> Photographs should feel candid and process-driven. Show the student mid-sketch, mid-shoot, mid-session — not looking at the camera, not performing success.</p>
                  <p><strong>Warm, natural light.</strong> Window light, ambient warmth, soft shadows. Avoid artificially lit studio shots, harsh flash, or cold blue-toned environments.</p>
                  <p><strong>Authentic environments.</strong> Homes, personal studios, cosy corners. Scattered books, coffee cups, art canvases, pets — the mess is part of the story. Sanitised office settings are off-brand.</p>
                  <p><strong>Analogue meets digital.</strong> Sketchbooks, printed photos, handwritten notes alongside laptops and cameras. The blend signals creativity over pure tech.</p>
                </div>
              </div>
              <div>
                <div className="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-4">Do / Don't</div>
                <div className="flex flex-col gap-2.5">
                  {[
                    { ok: true,  rule: "People absorbed in work, not posing for the camera" },
                    { ok: true,  rule: "Warm, diffused natural light — golden hour or window light" },
                    { ok: true,  rule: "Personal, lived-in environments — homes, studios, creative spaces" },
                    { ok: true,  rule: "Diverse subjects — mixed gender, ethnicity, age, and background" },
                    { ok: true,  rule: "Analogue tools alongside digital — cameras, sketchbooks, instruments" },
                    { ok: false, rule: "Sterile offices, glass boardrooms, or conference table setups" },
                    { ok: false, rule: "Posed stock-photo energy — handshakes, forced smiles, power stances" },
                    { ok: false, rule: "Dark terminals, lines of code, matrix-style tech imagery" },
                    { ok: false, rule: "Disembodied hands on keyboards with no human context" },
                    { ok: false, rule: "Cold, blue-toned or overexposed images without warmth" },
                  ].map(({ ok, rule }) => (
                    <div
                      key={rule}
                      className="flex items-start gap-3 px-4 py-3 rounded-md text-sm"
                      style={{
                        backgroundColor: ok ? "#F2FAF4" : "#FFF5F4",
                        borderLeft: `3px solid ${ok ? "#4CAF74" : "#E12B21"}`,
                      }}
                    >
                      <span className="shrink-0 font-bold mt-0.5" style={{ color: ok ? "#4CAF74" : "#E12B21" }}>
                        {ok ? "✓" : "✗"}
                      </span>
                      <span style={{ color: ok ? "#1A3A24" : "#5A1A17" }}>{rule}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Genre categories */}
            <div className="text-xs font-medium tracking-widests uppercase text-muted-foreground mb-5 tracking-widest">Image Genres</div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="p-6 bg-card border border-border rounded-md">
                <div className="text-xs font-medium uppercase tracking-widest text-primary mb-2">Creative</div>
                <h4 className="font-semibold mb-3">Film, Music, Graphic Design</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Studio environments with visible creative chaos — paint canvases, camera rigs, mixing desks. Subjects are artists and makers. Lighting is moodier, more editorial. Frames can be unconventional: through a tripod, overhead, tightly cropped on hands.
                </p>
              </div>
              <div className="p-6 bg-card border border-border rounded-md">
                <div className="text-xs font-medium uppercase tracking-widest text-primary mb-2">Technical</div>
                <h4 className="font-semibold mb-3">DevOps Engineering, Cyber Security, Cloud Security and Infrastructure</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Domestic and human — a kitchen table, a sofa, a sunlit home office. The subject is deep in focused work with warmth and accessibility over technical authority. Never dark terminals, lines of scrolling code, or matrix-style imagery. The discipline is technical; the photography should never be.
                </p>
              </div>
            </div>
          </section>

          {/* Footer */}
          <div className="pt-12 pb-8 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <NoroffMark fill="#E12B21" className="h-6 w-auto" />
              <div>
                <div className="text-sm font-semibold">Noroff Design System</div>
                <div className="text-xs text-muted-foreground">School of Technology and Digital Media</div>
              </div>
            </div>
            <div className="text-xs text-muted-foreground font-mono">v1.0 · Inter · #E12B21</div>
          </div>
        </div>
      </main>
    </div>
  );
}

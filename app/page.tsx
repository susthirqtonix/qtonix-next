"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

// ─── DATA ────────────────────────────────────────────────────────────────────

const clientLogos = ["Adobe", "Segment", "Hotjar", "Upwork", "Western Union", "Intuit", "PWC", "Crossware", "KlientBoost"];

const challenges = [
  {
    icon: (
      <svg className="w-6 h-6 text-[#050A1F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    title: '"My website traffic is going down"',
    desc: "Search algorithms change constantly. Our OmniSEO® and Data-Driven Paid strategies recover lost traffic and secure future visibility.",
    link: "Explore Marketing",
  },
  {
    icon: (
      <svg className="w-6 h-6 text-[#FF6A00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    title: '"My website isn\'t driving leads"',
    desc: "Traffic without conversion is useless. We optimize UI/UX, landing pages, and visual branding to turn visitors into qualified pipeline.",
    link: "Explore Design",
  },
  {
    icon: (
      <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    title: '"My app is slow and outdated"',
    desc: "Legacy code kills momentum. Our custom headless CMS and modern web development architectures deliver lightning-fast experiences.",
    link: "Explore Development",
  },
];

const serviceTabs = [
  {
    id: "marketing",
    label: "Digital Marketing",
    sub: "SEO, PPC, Social, Email & Content",
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>,
    heading: "Drive high-intent traffic and convert it.",
    body: "We engineer your visibility across standard search, AI Overviews, and paid platforms to ensure you dominate.",
    features: [
      { title: "Search Engine Optimization", desc: "Enterprise, Local, Technical, and AI SEO." },
      { title: "Paid Advertising (PPC)", desc: "Google Ads, Display, Remarketing, Social." },
      { title: "Content & CRO", desc: "High-converting copywriting and funnels." },
    ],
    cta: "Get a Custom Marketing Plan →",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    stat: "Traffic & Leads Generated",
    statVal: "+340% YoY Growth",
  },
  {
    id: "design",
    label: "Design & UI/UX",
    sub: "Websites, Branding & Presentations",
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>,
    heading: "Aesthetics built purely for engagement.",
    body: "We design intuitive interfaces that build brand trust and guide users flawlessly toward conversion.",
    features: [
      { title: "UI/UX Web Design", desc: "Website design, redesigns, responsive layouts." },
      { title: "Brand Identity", desc: "Logo design, corporate branding." },
      { title: "Business & Creative", desc: "High-end pitch decks, ad creatives." },
    ],
    cta: "View Our Design Portfolio →",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80",
    stat: "Conversion UI/UX",
    statVal: "+45% CVR Uplift",
  },
  {
    id: "dev",
    label: "Web & SaaS Development",
    sub: "CMS, eCommerce, API & Custom Apps",
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>,
    heading: "Scalable architecture built for business.",
    body: "From enterprise headless CMS platforms to custom backend APIs, our engineers ensure your digital foundation is lightning-fast.",
    features: [
      { title: "Custom Web Development", desc: "React, Next.js, full-stack web applications." },
      { title: "CMS & eCommerce", desc: "WordPress, Webflow, Shopify, Magento." },
      { title: "API & Backend Dev", desc: "Node.js, Laravel, Python, database architecture." },
    ],
    cta: "Hire Our Developers →",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
    stat: "Platform Performance",
    statVal: "99.99% Guaranteed Uptime",
  },
  {
    id: "mobile",
    label: "Mobile Applications",
    sub: "iOS, Android & Cross-Platform",
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>,
    heading: "Engage your audience natively.",
    body: "We develop premium mobile applications that streamline operations and deliver massive value directly to your customers' pockets.",
    features: [
      { title: "Native App Development", desc: "Robust iOS and Android applications." },
      { title: "Cross-Platform Apps", desc: "React Native and Flutter builds." },
      { title: "Enterprise Apps", desc: "Internal tooling and ERP solutions." },
    ],
    cta: "Discuss Your App Idea →",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80",
    stat: "User Engagement",
    statVal: "+210% App Opens",
  },
];

const caseStudies = [
  { company: "TechLogistics", tag: "SEO", tagColor: "text-[#FF6A00] bg-orange-50 border-orange-200", stat: "142%", desc: "YOY Increase in Organic Leads", hoverColor: "group-hover:text-[#FF6A00]" },
  { company: "FinServe Global", tag: "PPC", tagColor: "text-[#FF4500] bg-orange-50 border-orange-200", stat: "124%", desc: "Return on Ad Spend (ROAS)", hoverColor: "group-hover:text-[#FF4500]" },
  { company: "EcoSaaS Inc.", tag: "Web Dev", tagColor: "text-purple-600 bg-purple-50 border-purple-200", stat: "35%", desc: "Increase in Conversion Rate", hoverColor: "group-hover:text-purple-600" },
  { company: "Global Health", tag: "Local SEO", tagColor: "text-[#FF6A00] bg-orange-50 border-orange-200", stat: "191%", desc: "YOY Increase in Organic Traffic", hoverColor: "group-hover:text-[#FF6A00]" },
];

const testimonials = [
  { initials: "JD", name: "John Doe", role: "CEO, TechLogistics", quote: "Qtonix completely transformed our digital presence. Their custom ERP solution coupled with their SEO expertise increased our operational efficiency and doubled our inbound leads." },
  { initials: "SM", name: "Sarah Miller", role: "CMO, FinServe Global", quote: "The most transparent agency we've ever worked with. The QtonixOS dashboard lets us see exactly how our PPC budget is turning into qualified pipeline in real-time." },
  { initials: "MR", name: "Mark Roberts", role: "Founder, ScaleMedia Agency", quote: "We white-label Qtonix's SEO and development services for our own clients. The quality of work is enterprise-grade, and their support team acts like an extension of our own." },
];

const industries = ["SaaS & Tech", "Ecommerce", "B2B Services", "Franchises", "Healthcare", "Real Estate", "Legal Services", "Education"];

const techRow1 = [
  { color: "bg-blue-400", label: "React.js" },
  { color: "bg-white", label: "Next.js" },
  { color: "bg-teal-400", label: "Tailwind CSS" },
  { color: "bg-blue-600", label: "WordPress" },
  { color: "bg-green-500", label: "Shopify" },
  { color: "bg-orange-500", label: "Magento" },
];
const techRow2 = [
  { color: "bg-green-600", label: "Node.js" },
  { color: "bg-yellow-500", label: "Python" },
  { color: "bg-red-500", label: "Laravel" },
  { color: "bg-blue-500", label: "PostgreSQL" },
  { color: "bg-orange-400", label: "AWS Cloud" },
  { color: "bg-blue-300", label: "Google Cloud" },
];

const faqs = [
  { q: "Why should I hire an agency instead of an in-house team?", a: "Good marketing is a mix of technical know-how, UX, conversion rate optimization, and channel expertise. When you hire an agency, you hire years of experience and top-tier talent across all disciplines—without the overhead, recruiting costs, or management burden of an in-house team." },
  { q: "Do you have minimum contracts or lock-ins?", a: "We don't trap clients in long-term legacy contracts. We earn your business every month. Our scope and terms depend on your specific project and big goals, but we maintain a healthy pressure on ourselves to deliver results quickly." },
  { q: "How will I know if the marketing strategies are working?", a: "There are many ways to measure success, but we focus on one: Revenue. You'll get access to QtonixOS where we track KPIs that matter (MQLs, SQLs, Cost Per Acquisition, and ROAS), giving you 100% transparency into exactly what your money is doing." },
  { q: "How long does SEO take to pay off?", a: "SEO is a compounding investment. While technical fixes can yield immediate improvements within weeks, content and authority building typically show material impact on organic revenue within 3 to 6 months, depending on your industry's competitiveness." },
];

// ─── COUNTER HOOK ─────────────────────────────────────────────────────────────

function useCounter(target: number, duration: number, active: boolean) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) { setValue(0); return; }
    const start = performance.now();
    const raf = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(eased * target));
      if (p < 1) requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }, [active, target, duration]);
  return value;
}

// ─── MARQUEE ROW ─────────────────────────────────────────────────────────────

function MarqueeRow({ items, direction = "left", speed = 40 }: { items: { color: string; label: string }[]; direction?: "left" | "right"; speed?: number }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const currentXRef = useRef(direction === "right" ? 1 : 0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    // clone items to fill
    const original = track.innerHTML;
    for (let i = 0; i < 4; i++) track.innerHTML += original;

    let lastTs: number | null = null;
    let oneSetWidth = 0;
    const GAP = 24;

    const measure = () => {
      const perSet = track.children.length / 5;
      let w = 0;
      for (let i = 0; i < perSet; i++) w += (track.children[i] as HTMLElement).offsetWidth + GAP;
      oneSetWidth = w;
      if (direction === "right") currentXRef.current = oneSetWidth * 0.4;
    };

    requestAnimationFrame(() => { requestAnimationFrame(measure); });

    const onEnter = () => { pausedRef.current = true; };
    const onLeave = () => { pausedRef.current = false; lastTs = null; };
    track.parentElement?.addEventListener("mouseenter", onEnter);
    track.parentElement?.addEventListener("mouseleave", onLeave);

    const animate = (ts: number) => {
      if (!oneSetWidth) { requestAnimationFrame(animate); return; }
      if (lastTs === null) lastTs = ts;
      const delta = (ts - lastTs) / 1000;
      lastTs = ts;
      if (!pausedRef.current) {
        currentXRef.current = (currentXRef.current + speed * delta) % oneSetWidth;
        track.style.transform = direction === "left"
          ? `translateX(-${currentXRef.current}px)`
          : `translateX(${currentXRef.current - oneSetWidth}px)`;
      }
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);

    return () => {
      track.parentElement?.removeEventListener("mouseenter", onEnter);
      track.parentElement?.removeEventListener("mouseleave", onLeave);
    };
  }, [direction, speed]);

  return (
    <div className="overflow-hidden w-full">
      <div ref={trackRef} style={{ display: "flex", alignItems: "center", gap: "24px", width: "max-content" }}>
        {items.map((item, i) => (
          <div key={i} className="bg-slate-800/80 border border-slate-700 rounded-xl px-6 py-4 flex items-center font-bold text-lg shrink-0 whitespace-nowrap text-white">
            <span className={`w-3 h-3 rounded-full ${item.color} mr-3 shrink-0`} />
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("marketing");
  const [isAfter, setIsAfter] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState<number | null>(1);
  const [metricsActive, setMetricsActive] = useState(false);
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const metricsRef = useRef<HTMLElement>(null);

  // Testimonial auto-slide
  useEffect(() => {
    const t = setInterval(() => setTestimonialIdx((i) => (i + 1) % testimonials.length), 3000);
    return () => clearInterval(t);
  }, []);

  // Intersection observer for counters
  useEffect(() => {
    const el = metricsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => setMetricsActive(entry.isIntersecting), { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const years = useCounter(12, 2000, metricsActive);
  const revenue = useCounter(250, 2000, metricsActive);
  const projects = useCounter(500, 2000, metricsActive);
  const retention = useCounter(91, 2000, metricsActive);

  const activeService = serviceTabs.find((t) => t.id === activeTab)!;

  return (
    <main className="relative z-10 bg-white text-slate-600 antialiased overflow-x-hidden">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 lg:pt-32 lg:pb-32 overflow-hidden bg-[#F8FAFC]">
        <div className="absolute inset-0 z-0 opacity-30" style={{ backgroundImage: "linear-gradient(#e2e8f0 1px,transparent 1px),linear-gradient(90deg,#e2e8f0 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#FF6A00]/20 rounded-full mix-blend-multiply filter blur-[120px] animate-pulse pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-400/15 rounded-full mix-blend-multiply filter blur-[100px] pointer-events-none" style={{ animationDelay: "2s" }} />

        {/* Floating badges */}
        <div className="hidden lg:flex absolute top-1/4 left-[5%] bg-white/80 backdrop-blur-md border border-white shadow-xl rounded-2xl p-4 flex-col items-center animate-bounce" style={{ animationDuration: "6s" }}>
          <span className="text-3xl font-black text-[#050A1F] mb-1">91%</span>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Client Retention</span>
        </div>
        <div className="hidden lg:flex absolute bottom-1/3 right-[5%] bg-white/80 backdrop-blur-md border border-white shadow-xl rounded-2xl p-4 flex-col items-center animate-bounce" style={{ animationDuration: "7s", animationDelay: "1s" }}>
          <div className="flex -space-x-2 mb-2">
            {["bg-green-400", "bg-blue-500", "bg-[#FF6A00]"].map((c, i) => (
              <div key={i} className={`w-8 h-8 rounded-full border-2 border-white ${c} flex items-center justify-center text-white`}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
              </div>
            ))}
          </div>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Top Rated Team</span>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center space-x-2 bg-white border border-[#E2E8F0] rounded-full px-4 py-1.5 mb-8 shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-[#FF6A00] animate-ping" />
            <span className="text-xs font-bold tracking-widest text-[#050A1F] uppercase">The Performance Marketing Agency</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-[#050A1F] tracking-tight leading-[1.1] mb-6">
            Traffic To Your Site. <br />
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg,#FF8C00 0%,#FF4500 100%)" }}>Revenue To Your Bank.</span>
          </h1>
          <p className="mt-4 text-xl text-slate-600 max-w-3xl mx-auto mb-10">
            Most agencies sell deliverables. We deliver business outcomes. We tie your financial goals to the absolute best marketing opportunities, from AI-driven SEO to custom software architecture.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <a href="#audit" className="w-full sm:w-auto px-8 py-4 rounded-full text-white text-base font-bold transition-all transform hover:-translate-y-1" style={{ backgroundImage: "linear-gradient(135deg,#FF8C00 0%,#FF4500 100%)", boxShadow: "0 20px 40px -5px rgba(255,106,0,0.2)" }}>
              Get Your Free Marketing Plan
            </a>
            <a href="#results" className="w-full sm:w-auto px-8 py-4 rounded-full border-2 border-[#E2E8F0] bg-white text-[#050A1F] text-base font-bold transition-all hover:border-[#FF6A00]/30 hover:bg-[#F8FAFC] flex items-center justify-center group">
              See Our Revenue Results
              <svg className="w-4 h-4 ml-2 text-[#FF6A00] group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7-7 7" /></svg>
            </a>
          </div>
        </div>
      </section>

      {/* ── CLIENT LOGO TICKER ───────────────────────────────────────────── */}
      <section className="border-b border-[#E2E8F0] bg-white py-10 overflow-hidden flex flex-col items-center">
        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Trusted by 500+ Scrappy Startups & Massive Brands</p>
        <div className="flex overflow-hidden relative w-full max-w-[100vw]">
          {[0, 1].map((i) => (
            <div key={i} aria-hidden={i === 1} className="flex space-x-16 sm:space-x-24 items-center whitespace-nowrap font-black text-2xl text-[#050A1F] shrink-0 px-8 animate-marquee">
              {clientLogos.map((logo) => (
                <span key={logo} className="opacity-40 hover:opacity-100 transition-opacity cursor-pointer">{logo}</span>
              ))}
            </div>
          ))}
        </div>
        <style>{`@keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-100%)}} .animate-marquee{animation:marquee 35s linear infinite}`}</style>
      </section>

      {/* ── CHALLENGES ───────────────────────────────────────────────────── */}
      <section className="py-24 bg-[#F8FAFC] border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h2 className="text-sm font-bold text-[#FF4500] uppercase tracking-widest mb-2">Challenges We Solve</h2>
            <h3 className="text-3xl md:text-5xl font-bold text-[#050A1F] mb-6">What's holding your growth back?</h3>
            <p className="text-lg text-slate-600">We align our digital and technical strategies directly with your biggest business bottlenecks.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {challenges.map((c) => (
              <div key={c.title} className="group bg-white border border-[#E2E8F0] rounded-2xl p-8 transition-all duration-300 hover:border-[#FF6A00] hover:-translate-y-1 relative overflow-hidden" style={{ boxShadow: undefined }}>
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent to-transparent group-hover:from-[#FF8C00] group-hover:to-[#FF4500] transition-all duration-300" />
                <div className="w-12 h-12 bg-[#F8FAFC] rounded-full flex items-center justify-center mb-6 shadow-sm border border-[#E2E8F0] group-hover:scale-110 transition-transform">
                  {c.icon}
                </div>
                <h4 className="text-xl font-bold text-[#050A1F] mb-3">{c.title}</h4>
                <p className="text-slate-600 text-sm mb-4">{c.desc}</p>
                <a href="#services" className="text-[#FF6A00] font-semibold text-sm flex items-center">
                  {c.link}
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES HUB ─────────────────────────────────────────────────── */}
      <section id="services" className="py-24 bg-white border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-sm font-bold text-[#FF6A00] uppercase tracking-widest mb-2">Our Capabilities</h2>
            <h2 className="text-3xl md:text-5xl font-bold text-[#050A1F] mb-4">End-to-End Digital Solutions.</h2>
            <p className="text-lg text-slate-600 max-w-3xl">From acquiring traffic to engineering the platforms that convert them, we house all the expertise you need under one roof.</p>
          </div>
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Tabs */}
            <div className="w-full lg:w-1/3 flex flex-col gap-4">
              {serviceTabs.map((tab) => {
                const active = activeTab === tab.id;
                return (
                  <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                    className={`w-full text-left px-6 py-5 rounded-xl border-2 transition-all duration-300 flex items-center focus:outline-none ${active ? "bg-[#050A1F] border-[#050A1F] scale-105 shadow-xl" : "bg-[#F8FAFC] border-[#E2E8F0] hover:border-slate-300 opacity-70 hover:opacity-100"}`}>
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-4 ${active ? "text-white" : "bg-slate-200 text-slate-500"}`} style={active ? { backgroundImage: "linear-gradient(135deg,#FF8C00 0%,#FF4500 100%)" } : {}}>
                      {tab.icon}
                    </div>
                    <div>
                      <h4 className={`font-bold text-lg leading-tight ${active ? "text-white" : "text-[#050A1F]"}`}>{tab.label}</h4>
                      <p className={`text-xs mt-1 ${active ? "text-slate-400" : "text-slate-500"}`}>{tab.sub}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Panel */}
            <div className="w-full lg:w-2/3">
              <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-8 sm:p-10 h-full">
                <div className="relative z-10 h-full flex flex-col xl:flex-row gap-10">
                  <div className="xl:w-1/2 flex flex-col h-full">
                    <h3 className="text-2xl sm:text-3xl font-bold text-[#050A1F] mb-4">{activeService.heading}</h3>
                    <p className="text-slate-600 mb-8">{activeService.body}</p>
                    <div className="grid grid-cols-1 gap-y-5 mb-auto">
                      {activeService.features.map((f) => (
                        <div key={f.title}>
                          <h4 className="font-bold text-[#050A1F] flex items-center mb-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6A00] mr-2" />{f.title}
                          </h4>
                          <p className="text-xs text-slate-500">{f.desc}</p>
                        </div>
                      ))}
                    </div>
                    <div className="pt-8 mt-8 border-t border-[#E2E8F0]">
                      <a href="#audit" className="text-[#FF6A00] font-bold hover:text-[#FF4500] transition-colors">{activeService.cta}</a>
                    </div>
                  </div>
                  <div className="hidden xl:flex xl:w-1/2 w-full h-full rounded-2xl relative overflow-hidden items-center justify-center group shadow-sm min-h-[300px]">
                    <img src={activeService.image} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt={activeService.label} />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050A1F]/90 via-[#050A1F]/30 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-xl shadow-2xl flex items-center">
                      <div className="w-12 h-12 rounded-lg flex items-center justify-center text-white shrink-0 mr-4" style={{ backgroundImage: "linear-gradient(135deg,#FF8C00 0%,#FF4500 100%)" }}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                      </div>
                      <div>
                        <span className="block text-white font-bold text-lg leading-tight">{activeService.stat}</span>
                        <span className="block text-green-400 font-bold text-sm mt-1">{activeService.statVal}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── RANKING SHOWCASE ─────────────────────────────────────────────── */}
      <section className="py-24 bg-[#050A1F] overflow-hidden relative">
        <div className={`absolute top-0 right-0 w-[500px] h-[500px] bg-[#FF6A00]/20 rounded-full blur-[120px] pointer-events-none translate-x-1/2 -translate-y-1/2 transition-opacity duration-700 ${isAfter ? "opacity-100" : "opacity-0"}`} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-sm font-bold text-[#FF6A00] uppercase tracking-widest mb-2">Real Results</h2>
            <h3 className="text-3xl md:text-5xl font-bold text-white mb-6">Stop Chasing. Start Ranking.</h3>
            <p className="text-lg text-slate-400">See the exact impact of our OmniSEO® architecture on high-intent keywords.</p>
          </div>
          {/* Toggle */}
          <div className="flex justify-center mb-16">
            <div className="bg-slate-800 p-1.5 rounded-full inline-flex relative shadow-inner">
              <div className={`absolute inset-y-1.5 left-1.5 w-[calc(50%-6px)] rounded-full shadow-md transition-transform duration-500 ease-in-out ${isAfter ? "translate-x-[100%]" : "translate-x-0"}`} style={{ backgroundImage: "linear-gradient(135deg,#FF8C00 0%,#FF4500 100%)" }} />
              {["Before Qtonix", "With Qtonix"].map((label, i) => (
                <button key={label} onClick={() => setIsAfter(i === 1)}
                  className={`relative z-10 px-8 py-3 text-sm font-bold rounded-full transition-colors w-40 sm:w-48 ${(i === 0 && !isAfter) || (i === 1 && isAfter) ? "text-white" : "text-slate-400"}`}>
                  {label}
                </button>
              ))}
            </div>
          </div>
          {/* Mock Google SERP */}
          <div className="relative max-w-5xl mx-auto">
            <div className="hidden md:block absolute -left-28 top-6 z-20 bg-white rounded-xl p-4 shadow-xl transition-all duration-700">
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">Monthly Traffic</p>
              <span className={`text-3xl font-black ${isAfter ? "text-green-500" : "text-slate-400"}`}>{isAfter ? "84.2K" : "3.1K"}</span>
            </div>
            <div className="hidden md:block absolute -right-12 bottom-12 z-20 bg-white rounded-xl p-4 shadow-xl transition-all duration-700">
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">Keyword Rank</p>
              <span className={`text-3xl font-black ${isAfter ? "text-[#FF6A00]" : "text-slate-400"}`}>{isAfter ? "#1" : "Page 4"}</span>
            </div>
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200">
              <div className="bg-slate-100 px-4 py-3 border-b flex items-center">
                <div className="flex space-x-2 mr-4"><div className="w-3 h-3 rounded-full bg-red-400" /><div className="w-3 h-3 rounded-full bg-yellow-400" /><div className="w-3 h-3 rounded-full bg-green-400" /></div>
                <div className="flex-1 flex justify-center">
                  <div className="bg-white border rounded-md px-4 py-1.5 text-[11px] font-medium text-slate-500 w-full max-w-sm text-center">google.com/search?q=b2b+saas+marketing+agency</div>
                </div>
              </div>
              <div className="p-6 md:p-10 min-h-[350px] bg-white">
                <div className="flex items-center space-x-4 mb-8">
                  <div className="text-2xl font-bold tracking-tighter" style={{ color: "#4285f4" }}>G<span style={{ color: "#ea4335" }}>o</span><span style={{ color: "#fbbc05" }}>o</span>g<span style={{ color: "#34a853" }}>l</span><span style={{ color: "#ea4335" }}>e</span></div>
                  <div className="flex-1 max-w-2xl bg-white border border-slate-300 rounded-full px-4 py-2 md:py-3">
                    <span className="text-slate-800 text-sm">b2b saas marketing agency</span>
                  </div>
                </div>
                {!isAfter ? (
                  <div>
                    <div className="mb-8 opacity-60">
                      <div className="flex items-center space-x-2 text-sm text-[#202124] mb-1">
                        <div className="w-6 h-6 bg-slate-200 rounded-full flex items-center justify-center text-slate-500 text-[10px]">G</div>
                        <span>https://www.generic-marketing.com</span>
                      </div>
                      <h3 className="text-xl text-[#1a0dab] mb-1">Generic Marketing Agency</h3>
                      <p className="text-[#4d5156] text-sm">We do SEO and websites. Contact us today.</p>
                    </div>
                    <div className="mb-8">
                      <div className="flex items-center space-x-2 text-sm mb-1">
                        <div className="w-6 h-6 bg-slate-100 border rounded-full flex items-center justify-center text-[10px] font-bold">QT</div>
                        <span className="text-[#202124]">https://www.qtonix.com</span>
                      </div>
                      <h3 className="text-xl text-[#1a0dab] mb-1">Qtonix: Services</h3>
                      <p className="text-[#4d5156] text-sm">Welcome to Qtonix. We offer digital marketing services.</p>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="mb-8">
                      <div className="flex items-center space-x-2 text-sm mb-1">
                        <div className="w-6 h-6 bg-[#050A1F] rounded-full flex items-center justify-center text-white text-[10px] font-bold">QT</div>
                        <span className="text-[#202124]">https://www.qtonix.com</span>
                      </div>
                      <h3 className="text-xl text-[#1a0dab] font-medium mb-1">#1 B2B SaaS Marketing Agency | Qtonix</h3>
                      <div className="flex items-center space-x-1 mb-2 text-sm text-[#70757a]">
                        <span className="text-[#fbbc04]">★★★★★</span><span>Rating: 4.9 · 1,530 reviews</span>
                      </div>
                      <p className="text-[#4d5156] text-sm">Scale your recurring revenue with our award-winning performance marketing. Specialized in AI SEO and enterprise CRO.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PLATFORM HIGHLIGHT ───────────────────────────────────────────── */}
      <section className="py-24 bg-white border-b border-[#E2E8F0] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-3xl p-8 md:p-16 flex flex-col lg:flex-row items-center gap-12 shadow-sm">
            <div className="w-full lg:w-1/2">
              <div className="inline-flex items-center space-x-2 bg-orange-50 text-[#FF6A00] rounded-full px-4 py-1.5 mb-6 text-sm font-bold uppercase tracking-wider">Proprietary Tech</div>
              <h2 className="text-3xl md:text-5xl font-bold text-[#050A1F] mb-6">Complete Transparency.<br />Zero Guesswork.</h2>
              <p className="text-lg text-slate-600 mb-8">Clients gain access to QtonixOS, our unified dashboard. Monitor keyword ranking movements, track inbound leads directly to your CRM, and view real-time ROI calculations.</p>
              <ul className="space-y-4 mb-8">
                {["Real-time Pipeline Attribution", "Competitor SEO Tracking", "Direct Communication Hub"].map((item) => (
                  <li key={item} className="flex items-center text-[#050A1F] font-medium">
                    <svg className="w-5 h-5 text-[#FF6A00] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    {item}
                  </li>
                ))}
              </ul>
              <a href="#audit" className="text-[#FF6A00] font-bold hover:text-[#FF4500] transition-colors flex items-center">
                Explore the Platform
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </a>
            </div>
            <div className="w-full lg:w-1/2 relative">
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-2xl relative z-10">
                <div className="flex justify-between items-center mb-6 border-b border-slate-800 pb-4">
                  <div className="flex space-x-2"><div className="w-3 h-3 rounded-full bg-red-500" /><div className="w-3 h-3 rounded-full bg-yellow-500" /><div className="w-3 h-3 rounded-full bg-green-500" /></div>
                  <h4 className="font-bold text-white text-sm">Campaign ROI Overview</h4>
                  <span className="bg-green-500/20 text-green-400 text-xs font-bold px-2 py-1 rounded flex items-center border border-green-500/30"><span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse" />Live</span>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center bg-slate-800/50 border border-slate-700/50 p-4 rounded-lg">
                    <div>
                      <span className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-1 block">Q3 Revenue Generated</span>
                      <span className="text-3xl font-black text-white">$420,500</span>
                    </div>
                    <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-1/2 bg-slate-800/50 border border-slate-700/50 p-4 rounded-lg">
                      <span className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-1 block">MQL Leads</span>
                      <div className="text-2xl font-bold text-white">1,248</div>
                    </div>
                    <div className="w-1/2 bg-slate-800/50 border border-slate-700/50 p-4 rounded-lg">
                      <span className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-1 block">Cost Per Lead</span>
                      <div className="text-2xl font-bold text-white">$42.50</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-12 -left-6 text-white p-4 rounded-xl shadow-xl z-20 flex items-center animate-bounce" style={{ backgroundImage: "linear-gradient(135deg,#FF8C00 0%,#FF4500 100%)", animationDuration: "4s" }}>
                <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <div>
                  <span className="block text-[10px] font-bold uppercase tracking-widest opacity-80 mb-0.5">CRM Sync</span>
                  <span className="block font-bold text-sm leading-none">100% Accurate</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CASE STUDIES ─────────────────────────────────────────────────── */}
      <section id="results" className="py-24 bg-[#F8FAFC] border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-end mb-16">
            <div className="max-w-3xl">
              <h2 className="text-sm font-bold text-[#FF6A00] uppercase tracking-widest mb-2">Proven ROI</h2>
              <h2 className="text-3xl md:text-5xl font-bold text-[#050A1F] mb-6">Turning businesses like yours into success stories like these.</h2>
              <p className="text-lg text-slate-600">Get customized solutions based on your business goals – no matter your size or industry.</p>
            </div>
            <div className="mt-8 lg:mt-0">
              <a href="#audit" className="px-6 py-3 rounded-full bg-[#050A1F] text-white text-base font-bold transition-all hover:bg-slate-800 whitespace-nowrap">Get Your Custom Strategy</a>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {caseStudies.map((cs) => (
              <div key={cs.company} className="bg-white border border-[#E2E8F0] rounded-2xl p-6 hover:-translate-y-1 transition-all group" style={{ ":hover": { boxShadow: "0 20px 40px -5px rgba(255,106,0,0.2)" } } as any}>
                <div className="flex justify-between items-center mb-6 border-b border-[#E2E8F0] pb-4">
                  <span className="font-bold text-lg text-[#050A1F]">{cs.company}</span>
                  <span className={`text-xs font-bold px-2 py-1 rounded uppercase tracking-wider border ${cs.tagColor}`}>{cs.tag}</span>
                </div>
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-[#FF4500] mr-3 shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  <div>
                    <span className={`text-4xl font-extrabold text-[#050A1F] block mb-1 transition-colors ${cs.hoverColor}`}>{cs.stat}</span>
                    <span className="text-sm text-slate-500 leading-snug font-medium block">{cs.desc}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── IMPACT METRICS ───────────────────────────────────────────────── */}
      <section className="py-16 bg-[#050A1F] overflow-hidden" ref={metricsRef as any}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/10">
            {[
              { val: `${years}+`, label: "Years" },
              { val: `$${revenue}M+`, label: "Revenue" },
              { val: `${projects}+`, label: "Projects" },
              { val: `${retention}%`, label: "Retention" },
            ].map((m) => (
              <div key={m.label} className="text-center px-4">
                <span className="block text-4xl font-black text-transparent bg-clip-text mb-2" style={{ backgroundImage: "linear-gradient(135deg,#FF8C00 0%,#FF4500 100%)" }}>{m.val}</span>
                <span className="text-sm font-bold text-slate-400 uppercase">{m.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section className="py-24 bg-white border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex justify-center space-x-1 mb-4 text-[#FF6A00] text-xl">★ ★ ★ ★ ★</div>
            <h2 className="text-3xl md:text-5xl font-bold text-[#050A1F] mb-4">Don't just take our word for it.</h2>
            <p className="text-lg text-slate-600">Rated 4.9/5 by global business leaders.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-8">
                <p className="text-slate-600 mb-6 italic">"{t.quote}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center font-bold mr-4 border text-[#050A1F]">{t.initials}</div>
                  <div>
                    <h4 className="font-bold text-[#050A1F]">{t.name}</h4>
                    <p className="text-sm text-slate-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHO WE HELP ──────────────────────────────────────────────────── */}
      <section className="py-24 bg-[#F8FAFC] border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-sm font-bold text-[#FF6A00] uppercase tracking-widest mb-2">Who We Help</h2>
            <h3 className="text-3xl md:text-5xl font-bold text-[#050A1F] mb-6">Digital marketing strategies tailored to your specific industry</h3>
            <p className="text-lg text-slate-600">Since 2012, we've been perfecting our digital marketing solutions for the unique challenges of competitive global industries.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {industries.map((ind) => (
              <div key={ind} className="group bg-white border border-[#E2E8F0] rounded-2xl p-8 hover:border-[#FF6A00]/30 transition-all duration-300 cursor-pointer">
                <h4 className="text-lg font-bold text-[#050A1F] mb-2 group-hover:text-[#FF6A00] transition-colors">{ind}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TECH STACK ───────────────────────────────────────────────────── */}
      <section id="tech" className="py-24 bg-[#050A1F] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[#FF6A00]/5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-12">
            <div className="max-w-2xl">
              <h2 className="text-sm font-bold text-[#FF6A00] uppercase tracking-widest mb-2">About Qtonix</h2>
              <h3 className="text-3xl md:text-5xl font-bold text-white mb-6">Engineering Meets Marketing.</h3>
              <p className="text-lg text-slate-300 mb-6">We don't just market websites; we build scalable, high-performance digital architectures. From headless CMS deployments to complex SaaS application development, our engineering team ensures your marketing foundation is unbreakable.</p>
              <p className="text-lg text-slate-300">With expertise across 25+ modern frameworks and cloud infrastructures, we bridge the gap between brilliant marketing strategy and flawless technical execution.</p>
            </div>
            <div className="hidden md:block">
              <a href="#audit" className="px-8 py-4 rounded-full bg-white text-[#050A1F] text-base font-bold transition-all hover:bg-slate-200">Start Your Project</a>
            </div>
          </div>
        </div>
        <div className="relative w-full flex flex-col gap-6 pt-8 pb-4">
          <div className="absolute left-0 top-0 w-32 h-full z-20 pointer-events-none" style={{ background: "linear-gradient(to right, #050A1F, transparent)" }} />
          <div className="absolute right-0 top-0 w-32 h-full z-20 pointer-events-none" style={{ background: "linear-gradient(to left, #050A1F, transparent)" }} />
          <MarqueeRow items={techRow1} direction="left" />
          <MarqueeRow items={techRow2} direction="right" />
        </div>
      </section>

      {/* ── CONTENT LIBRARY ──────────────────────────────────────────────── */}
      <section id="insights" className="py-24 bg-white border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-5xl font-bold text-[#050A1F] mb-16">Content Library.</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { bg: "from-[#050A1F] to-[#1e293b]", tag: "SEO Research", tagColor: "text-[#FF6A00]", title: "How Generative AI is Changing Search" },
              { bg: "from-[#FF8C00] to-[#FF4500]", tag: "B2B Marketing", tagColor: "text-[#FF4500]", title: "Stop Wasting LinkedIn Ad Spend" },
              { bg: "from-purple-600 to-indigo-500", tag: "Web Development", tagColor: "text-purple-600", title: "The True Cost of a Slow Website" },
            ].map((post) => (
              <div key={post.title} className="group cursor-pointer">
                <div className={`w-full h-48 rounded-2xl mb-6 bg-gradient-to-tr ${post.bg}`} />
                <span className={`text-xs font-bold uppercase ${post.tagColor}`}>{post.tag}</span>
                <h3 className="text-xl font-bold text-[#050A1F] mt-2">{post.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="py-24 bg-[#F8FAFC] border-b border-[#E2E8F0] relative overflow-hidden">
        <div className="absolute right-0 top-0 w-1/3 h-full bg-white skew-x-12 translate-x-20 z-0" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            <div className="lg:col-span-5 lg:sticky lg:top-32">
              <h2 className="text-sm font-bold text-[#FF6A00] uppercase tracking-widest mb-2">Expert Insights</h2>
              <h3 className="text-3xl md:text-5xl font-bold text-[#050A1F] mb-6">Got Questions?<br />We Got Answers.</h3>
              <p className="text-lg text-slate-600 mb-8">Everything you need to know about how we operate, our pricing structures, and how we measure success.</p>
              <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 flex items-center">
                <div className="w-12 h-12 bg-[#F8FAFC] rounded-full flex items-center justify-center border border-[#E2E8F0] shadow-sm mr-4 shrink-0">
                  <svg className="w-6 h-6 text-[#FF6A00]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                </div>
                <div>
                  <h4 className="font-bold text-[#050A1F] text-sm">Still have questions?</h4>
                  <p className="text-slate-500 text-xs mb-2">Can't find the answer you're looking for?</p>
                  <a href="mailto:sales@qtonix.com" className="text-[#FF6A00] font-bold text-sm hover:text-[#FF4500] transition-colors">Chat with our team →</a>
                </div>
              </div>
            </div>
            <div className="lg:col-span-7 space-y-4">
              {faqs.map((faq, i) => {
                const open = activeAccordion === i;
                return (
                  <div key={i} className={`bg-white border rounded-xl overflow-hidden shadow-sm transition-all duration-300 ${open ? "border-[#FF6A00] ring-1 ring-[#FF6A00]/20 shadow-md" : "border-[#E2E8F0]"}`}>
                    <button onClick={() => setActiveAccordion(open ? null : i)} className="w-full flex justify-between items-center p-6 text-left focus:outline-none">
                      <span className={`text-lg font-bold ${open ? "text-[#FF6A00]" : "text-[#050A1F]"}`}>{faq.q}</span>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${open ? "bg-[#FF6A00] text-white" : "bg-slate-100 text-slate-500"}`}>
                        <svg className={`w-5 h-5 transform transition-transform duration-300 ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                      </div>
                    </button>
                    {open && (
                      <div className="p-6 pt-0 text-slate-600 leading-relaxed border-t border-slate-100 mt-2">{faq.a}</div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA / AUDIT FORM ─────────────────────────────────────────────── */}
      <section id="audit" className="py-24 relative bg-[#050A1F] overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#FF6A00]/20 rounded-full blur-[150px] mix-blend-screen pointer-events-none translate-x-1/3 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#FF4500]/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none -translate-x-1/4 translate-y-1/4" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-6 text-white">
              <div className="inline-flex items-center space-x-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-6 text-sm font-bold tracking-wide uppercase shadow-sm backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" /><span>Accepting New Clients</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
                Let's Build Your <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg,#FF8C00 0%,#FF4500 100%)" }}>Revenue Engine.</span>
              </h2>
              <p className="text-xl text-slate-300 mb-8">Stop guessing what's working. Get a free, data-driven audit of your current digital strategy.</p>
              <div className="space-y-5 mb-10">
                {["Complete Technical SEO Breakdown", "Competitor Keyword Gap Analysis", "Actionable 90-Day ROI Roadmap"].map((item) => (
                  <div key={item} className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center mr-4 shrink-0">
                      <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <span className="text-lg font-medium text-slate-200">{item}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center border-t border-white/10 pt-8 mt-8">
                <div className="flex -space-x-3 mr-4">
                  {[11, 47, 32].map((n) => (
                    <img key={n} src={`https://i.pravatar.cc/40?img=${n}`} alt="User" className="w-10 h-10 rounded-full border-2 border-[#050A1F] object-cover" />
                  ))}
                  <div className="w-10 h-10 rounded-full border-2 border-[#050A1F] bg-white flex items-center justify-center text-xs font-bold text-[#050A1F]">+500</div>
                </div>
                <p className="text-sm text-slate-400">Join 500+ companies growing<br />their revenue with Qtonix.</p>
              </div>
            </div>
            <div className="lg:col-span-6 relative">
              <div className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl relative z-10">
                <h3 className="text-2xl font-bold text-[#050A1F] mb-2">Claim Your Free Audit</h3>
                <p className="text-slate-500 text-sm mb-8">Fill out the details below and our strategy team will prepare your custom report.</p>
                <div className="space-y-5 text-left">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {[["First Name", "John"], ["Last Name", "Doe"]].map(([label, ph]) => (
                      <div key={label} className="space-y-1">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">{label} *</label>
                        <input type="text" placeholder={ph} className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-4 py-3 text-[#050A1F] placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#FF6A00] focus:ring-2 focus:ring-[#FF6A00]/30 transition-all" />
                      </div>
                    ))}
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Work Email *</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                      </div>
                      <input type="email" placeholder="john@company.com" className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg pl-11 pr-4 py-3 text-[#050A1F] placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#FF6A00] focus:ring-2 focus:ring-[#FF6A00]/30 transition-all" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Website URL *</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
                      </div>
                      <input type="url" placeholder="https://www.yourcompany.com" className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg pl-11 pr-4 py-3 text-[#050A1F] placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#FF6A00] focus:ring-2 focus:ring-[#FF6A00]/30 transition-all" />
                    </div>
                  </div>
                  <button type="button" className="w-full text-white font-bold text-lg py-4 rounded-lg transition-all mt-2 flex items-center justify-center group hover:opacity-90" style={{ backgroundImage: "linear-gradient(135deg,#FF8C00 0%,#FF4500 100%)", boxShadow: "0 20px 40px -5px rgba(255,106,0,0.2)" }}>
                    Analyze My Website Now
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </button>
                </div>
                <p className="text-xs text-slate-500 mt-6 flex items-center justify-center">
                  <svg className="w-4 h-4 mr-1 text-slate-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
                  Your information is 100% secure. We hate spam too.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
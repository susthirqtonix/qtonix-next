"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const phones = [
  { country: "USA", num: "+1 619 494 2548", tel: "+16194942548" },
  { country: "UK", num: "+44 747 695 0642", tel: "+447476950642" },
  { country: "AU", num: "+61 485 920 805", tel: "+61485920805" },
  { country: "IND", num: "+91 934 887 8088", tel: "+919348878088" },
];

export default function Header() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activePhone, setActivePhone] = useState(0);
  const closeTimer = useRef<NodeJS.Timeout | null>(null);

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.pageYOffset > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Rotating phone numbers
  useEffect(() => {
    const interval = setInterval(() => {
      setActivePhone((prev) => (prev + 1) % phones.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleMouseEnter = (menu: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveDropdown(menu);
  };

  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => setActiveDropdown(null), 100);
  };

  return (
    <>
      {/* ── ANNOUNCEMENT BAR ── */}
      <div className="bg-[#050A1F] border-b border-white/10 text-slate-300 text-xs sm:text-sm py-2 px-4 flex justify-center items-center fixed top-0 left-0 w-full z-[60] h-[40px]">
        <span className="font-medium flex items-center">
          <span className="flex h-2 w-2 rounded-full bg-[#FF6A00] animate-pulse mr-2" />
          <strong className="text-white mr-1 hidden sm:inline">New:</strong>
          Discover our AI-Driven SEO architecture for 2026.
        </span>
        <a
          href="#audit"
          className="ml-3 text-[#FF6A00] hover:text-[#FF4500] font-bold transition-colors flex items-center"
        >
          Learn More
          <svg
            className="w-3 h-3 ml-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </a>
      </div>

      {/* ── NAVIGATION ── */}
      <nav
        className={`fixed top-[40px] inset-x-0 z-50 h-[80px] flex items-center transition-all duration-300 bg-white ${
          scrolled
            ? "shadow-sm border-b border-slate-100"
            : "border-b border-slate-100"
        }`}
      >
        <div className="max-w-[1200px] xl:max-w-[1200px] 2xl:max-w-[1274px] mx-auto px-4 sm:px-6 lg:px-8 w-full h-full">
          <div className="flex justify-between items-center w-full h-full">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center cursor-pointer">
              <Link href="/">
                <Image
                  src="/images/logo.png"
                  alt="Qtonix"
                  width={150}
                  height={50}
                  className="h-[50px] w-auto object-contain"
                />
              </Link>
            </div>

            {/* ── DESKTOP MENU ── */}
            <div className="hidden lg:flex items-center gap-5 xl:gap-7 flex-nowrap">
              {/* Digital Marketing */}
              <div
                className="relative h-full flex items-center"
                onMouseEnter={() => handleMouseEnter("marketing")}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className={`text-sm font-semibold transition-colors flex items-center h-full focus:outline-none ${
                    activeDropdown === "marketing"
                      ? "text-[#FF6A00]"
                      : "text-secondary hover:text-[#FF6A00]"
                  }`}
                >
                  Digital Marketing
                  <svg
                    className={`w-4 h-4 ml-1 transition-transform ${activeDropdown === "marketing" ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {activeDropdown === "marketing" && (
                  <div className="fixed left-1/2 -translate-x-1/2 top-[120px] w-full max-w-[1200px] px-4 z-50">
                    <div className="bg-white shadow-2xl rounded-2xl border border-slate-200 overflow-hidden w-full relative before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-1 before:bg-gradient-to-r before:from-[#FF8C00] before:to-[#FF4500]">
                      <div className="p-8 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
                        {/* SEO */}
                        <MegaMenuColumn
                          title="SEO"
                          icon={<SearchIcon />}
                          links={[
                            { label: "SEO Services", href: "/seo" },
                            { label: "Local SEO", href: "/seo/local-seo" },
                            {
                              label: "eCommerce SEO",
                              href: "/seo/ecommerce-seo",
                            },
                            {
                              label: "Multilingual SEO",
                              href: "/seo/multilingual-seo",
                            },
                            {
                              label: "Technical SEO",
                              href: "/seo/technical-seo",
                            },
                          ]}
                          onLinkClick={() => setActiveDropdown(null)} // ✅ THIS LINE
                        />
                        {/* Paid Ads */}
                        <MegaMenuColumn
                          title="Paid Ads"
                          icon={<CursorIcon />}
                          links={[
                            {
                              label: "Google Ads (PPC)",
                              href: "/ppc-services",
                            },
                            { label: "Display Ads", href: "#" },
                            { label: "Remarketing", href: "#" },
                            { label: "Shopping Ads", href: "#" },
                            {
                              label: "Paid Social Ads",
                              href: "/paid-social-media",
                            },
                          ]}
                        />
                        {/* Social Media */}
                        <MegaMenuColumn
                          title="Social Media"
                          icon={<UsersIcon />}
                          links={[
                            { label: "Social Media Management", href: "#" },
                            { label: "Social Media Strategy", href: "#" },
                            { label: "Content Planning", href: "#" },
                            { label: "Influencer Marketing", href: "#" },
                            { label: "Social Media Audit", href: "#" },
                          ]}
                        />
                        {/* Content Marketing */}
                        <MegaMenuColumn
                          title="Content Marketing"
                          icon={<PenIcon />}
                          links={[
                            { label: "SEO Content Writing", href: "#" },
                            { label: "Blog Writing", href: "#" },
                            { label: "Website Copywriting", href: "#" },
                            { label: "Content Strategy", href: "#" },
                            { label: "Video Content", href: "#" },
                          ]}
                        />
                        {/* Email */}
                        <MegaMenuColumn
                          title="Email Marketing"
                          icon={<MailIcon />}
                          links={[
                            { label: "Email Campaigns", href: "#" },
                            { label: "Automation", href: "#" },
                            { label: "Drip Campaigns", href: "#" },
                            { label: "Newsletters", href: "#" },
                            { label: "Strategy", href: "#" },
                          ]}
                        />
                        {/* CRO */}
                        <MegaMenuColumn
                          title="Conversion (CRO)"
                          icon={<ChartIcon />}
                          links={[
                            { label: "Landing Page Opt.", href: "#" },
                            { label: "Funnel Optimization", href: "#" },
                            { label: "A/B Testing", href: "#" },
                            { label: "Conversion Audit", href: "#" },
                            { label: "UX Improvements", href: "#" },
                          ]}
                        />
                        {/* AI */}
                        <MegaMenuColumn
                          title="AI Digital Marketing"
                          icon={<FlaskIcon />}
                          links={[
                            { label: "AI SEO", href: "#" },
                            { label: "AI Content Optimization", href: "#" },
                            { label: "AI Marketing Automation", href: "#" },
                            { label: "AI Strategy", href: "#" },
                            { label: "Data & Analytics", href: "#" },
                          ]}
                        />
                        {/* White Label */}
                        <MegaMenuColumn
                          title="White Label Services"
                          icon={<PenIcon />}
                          links={[
                            { label: "White Label SEO", href: "#" },
                            { label: "White Label PPC", href: "#" },
                            { label: "White Label Social Media", href: "#" },
                            { label: "White Label Content", href: "#" },
                            { label: "White Label Web Design", href: "#" },
                          ]}
                        />
                      </div>
                      <MegaMenuFooter
                        title="Need a marketing overhaul?"
                        subtitle="Get a custom strategy mapped to your goals."
                        cta="Get Free Audit"
                        href="#audit"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Design & Development */}
              <div
                className="relative h-full flex items-center"
                onMouseEnter={() => handleMouseEnter("dev")}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className={`text-sm font-semibold transition-colors flex items-center h-full focus:outline-none ${
                    activeDropdown === "dev"
                      ? "text-[#FF6A00]"
                      : "text-secondary hover:text-[#FF6A00]"
                  }`}
                >
                  Design & Development
                  <svg
                    className={`w-4 h-4 ml-1 transition-transform ${activeDropdown === "dev" ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {activeDropdown === "dev" && (
                  <div className="fixed left-1/2 -translate-x-1/2 top-[120px] w-full max-w-[1200px] px-4 z-50">
                    <div className="bg-white shadow-2xl rounded-2xl border border-slate-200 overflow-hidden relative before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-1 before:bg-gradient-to-r before:from-[#FF8C00] before:to-[#FF4500]">
                      <div className="p-8 grid grid-cols-4 gap-x-6 gap-y-10">
                        <MegaMenuColumn
                          title="Web Design"
                          icon={<MonitorIcon />}
                          links={[
                            { label: "Website Design", href: "#" },
                            { label: "UI/UX Design", href: "#" },
                            { label: "Landing Pages", href: "#" },
                            { label: "Website Redesign", href: "#" },
                            { label: "Responsive Design", href: "#" },
                          ]}
                        />
                        <MegaMenuColumn
                          title="Development"
                          icon={<CodeIcon />}
                          links={[
                            { label: "Custom Web Dev", href: "#" },
                            { label: "WordPress Development", href: "#" },
                            { label: "eCommerce Development", href: "#" },
                            { label: "CMS Development", href: "#" },
                            { label: "API & Backend Dev", href: "#" },
                          ]}
                        />
                        <MegaMenuColumn
                          title="Mobile App Dev"
                          icon={<MobileIcon />}
                          links={[
                            { label: "Android Apps", href: "#" },
                            { label: "iOS Apps", href: "#" },
                            { label: "Cross-Platform Apps", href: "#" },
                            { label: "Enterprise Apps", href: "#" },
                            { label: "App Support", href: "#" },
                          ]}
                        />
                        <MegaMenuColumn
                          title="Design Services"
                          icon={<PaletteIcon />}
                          links={[
                            { label: "UI Design", href: "#" },
                            { label: "Product Design", href: "#" },
                            { label: "Logo Design", href: "#" },
                            { label: "Brand Identity", href: "#" },
                            { label: "Communication Design", href: "#" },
                          ]}
                        />
                        <MegaMenuColumn
                          title="Business & Creative"
                          icon={<BarChartIcon />}
                          links={[
                            { label: "Business Presentation", href: "#" },
                            { label: "Pitch Deck Design", href: "#" },
                            { label: "Marketing Creatives", href: "#" },
                            { label: "Ad Creatives", href: "#" },
                            { label: "Corporate Branding", href: "#" },
                          ]}
                        />
                        <MegaMenuColumn
                          title="Website Maintenance"
                          icon={<GearIcon />}
                          links={[
                            { label: "WordPress Maintenance", href: "#" },
                            { label: "Shopify Maintenance", href: "#" },
                            { label: "Wix Maintenance", href: "#" },
                            { label: "Webflow Maintenance", href: "#" },
                            { label: "Custom Web Maintenance", href: "#" },
                          ]}
                        />
                        <MegaMenuColumn
                          title="Hire Developers"
                          icon={<TeamIcon />}
                          links={[
                            { label: "PHP Developers", href: "#" },
                            { label: "Laravel Developers", href: "#" },
                            { label: "Node.js Developers", href: "#" },
                            { label: "React Developers", href: "#" },
                            { label: "Full Stack Developers", href: "#" },
                          ]}
                        />
                      </div>
                      <MegaMenuFooter
                        title="Ready to build?"
                        subtitle="Consult with our engineering and design team."
                        cta="Start Your Project"
                        href="#audit"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Solutions */}
              <div
                className="relative h-full flex items-center"
                onMouseEnter={() => handleMouseEnter("solutions")}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className={`text-sm font-semibold transition-colors flex items-center h-full focus:outline-none ${
                    activeDropdown === "solutions"
                      ? "text-[#FF6A00]"
                      : "text-secondary hover:text-[#FF6A00]"
                  }`}
                >
                  Solutions
                  <svg
                    className={`w-4 h-4 ml-1 transition-transform ${activeDropdown === "solutions" ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {activeDropdown === "solutions" && (
                  <div className="fixed left-1/2 -translate-x-1/2 top-[120px] w-full max-w-[1200px] px-4 z-50">
                    <div className="bg-white shadow-2xl rounded-2xl border border-slate-200 overflow-hidden relative before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-1 before:bg-gradient-to-r before:from-[#FF8C00] before:to-[#FF4500]">
                      <div className="p-8 grid grid-cols-4 gap-x-6 gap-y-10">
                        {/* By Industry - 2 col */}
                        <div className="col-span-2">
                          <div className="flex items-center mb-4">
                            <div className="w-8 h-8 bg-orange-50 border border-orange-100 rounded-lg flex items-center justify-center mr-3 shrink-0">
                              <BuildingIcon />
                            </div>
                            <h4 className="text-sm font-bold text-primary">
                              By Industry
                            </h4>
                          </div>
                          <div className="grid grid-cols-2 gap-x-4 pl-11 text-[13px] font-medium text-slate-500">
                            <ul className="space-y-2.5">
                              {[
                                "Healthcare & Wellness",
                                "Real Estate",
                                "Restaurants & Food",
                                "Beauty & Personal Care",
                                "eCommerce & Retail",
                                "Legal Services",
                              ].map((l) => (
                                <li key={l}>
                                  <a
                                    href="#"
                                    className="hover:text-[#FF6A00] block"
                                  >
                                    {l}
                                  </a>
                                </li>
                              ))}
                            </ul>
                            <ul className="space-y-2.5">
                              {[
                                "Dental Services",
                                "Financial & Accounting",
                                "Home Improvement",
                                "Automotive Services",
                                "Education & Coaching",
                              ].map((l) => (
                                <li key={l}>
                                  <a
                                    href="#"
                                    className="hover:text-[#FF6A00] block"
                                  >
                                    {l}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        {/* By Business */}
                        <MegaMenuColumn
                          title="By Business"
                          icon={<BriefcaseIcon />}
                          links={[
                            { label: "Startups", href: "#" },
                            { label: "Small Business", href: "#" },
                            { label: "Growing Business", href: "#" },
                            { label: "Enterprise", href: "#" },
                            { label: "Agencies", href: "#" },
                          ]}
                        />
                        {/* By Goal */}
                        <MegaMenuColumn
                          title="By Goal"
                          icon={<ChartIcon />}
                          links={[
                            { label: "Generate Leads", href: "#" },
                            { label: "Increase Traffic", href: "#" },
                            { label: "Improve Conversions", href: "#" },
                            { label: "Build Brand", href: "#" },
                            { label: "Scale Revenue", href: "#" },
                          ]}
                        />
                      </div>
                      <MegaMenuFooter
                        title="Find your path to growth"
                        subtitle="Explore solutions tailored to your unique challenges."
                        cta="Get Free Audit"
                        href="#audit"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* About */}
              <div
                className="relative h-full flex items-center"
                onMouseEnter={() => handleMouseEnter("about")}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className={`text-sm font-semibold transition-colors flex items-center h-full focus:outline-none ${
                    activeDropdown === "about"
                      ? "text-[#FF6A00]"
                      : "text-secondary hover:text-[#FF6A00]"
                  }`}
                >
                  About
                  <svg
                    className={`w-4 h-4 ml-1 transition-transform ${activeDropdown === "about" ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {activeDropdown === "about" && (
                  <div
                    style={{ paddingTop: "30px" }}
                    className="absolute left-1/2 -translate-x-1/2 top-full w-[780px] z-50"
                  >
                    <div className="bg-white shadow-2xl rounded-2xl border border-slate-200 overflow-hidden relative before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-1 before:bg-gradient-to-r before:from-[#FF8C00] before:to-[#FF4500]">
                      <div className="p-8 grid grid-cols-3 gap-x-[69px] gap-y-8">
                        <MegaMenuColumn
                          title="About Qtonix"
                          icon={<BuildingIcon />}
                          links={[
                            { label: "Company Overview", href: "#" },
                            { label: "Life at Qtonix", href: "#" },
                            { label: "Careers", href: "#" },
                            { label: "Why Choose Us", href: "#" },
                            { label: "Awards", href: "#" },
                          ]}
                        />
                        <MegaMenuColumn
                          title="Resources"
                          icon={<BookIcon />}
                          links={[
                            { label: "Blog", href: "#" },
                            { label: "Guides", href: "#" },
                            { label: "Industry News", href: "#" },
                            { label: "SEO Resources", href: "#" },
                            { label: "Tools", href: "#" },
                          ]}
                        />
                        <MegaMenuColumn
                          title="Portfolio"
                          icon={<ListIcon />}
                          links={[
                            { label: "Case Studies", href: "#" },
                            { label: "Website Portfolio", href: "#" },
                            { label: "App Portfolio", href: "#" },
                            { label: "Testimonials", href: "#" },
                            { label: "Success Stories", href: "#" },
                          ]}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Contact */}
              <div
                className="relative h-full flex items-center"
                onMouseEnter={() => handleMouseEnter("contact")}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className={`text-sm font-semibold transition-colors flex items-center h-full focus:outline-none ${
                    activeDropdown === "contact"
                      ? "text-[#FF6A00]"
                      : "text-secondary hover:text-[#FF6A00]"
                  }`}
                >
                  Contact
                  <svg
                    className={`w-4 h-4 ml-1 transition-transform ${activeDropdown === "contact" ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {activeDropdown === "contact" && (
                  <div
                    style={{ paddingTop: "30px" }}
                    className="absolute left-1/2 -translate-x-1/2 top-full w-[310px] z-50"
                  >
                    <div className="bg-white shadow-2xl rounded-2xl border border-slate-200 overflow-hidden relative before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-1 before:bg-gradient-to-r before:from-[#FF8C00] before:to-[#FF4500]">
                      <div className="p-6 flex flex-col gap-6">
                        <ContactItem
                          href="#audit"
                          title="Get Proposal"
                          subtitle="Custom quote for your project."
                          iconBg="bg-[#FF6A00]"
                          icon={<DocIcon />}
                        />
                        <ContactItem
                          href="#audit"
                          title="Free Consultation"
                          subtitle="Talk to our strategy experts."
                          iconBg="bg-[#FF4500]"
                          icon={<ChatIcon />}
                        />
                        <ContactItem
                          href="#audit"
                          title="Support"
                          subtitle="Help for existing clients."
                          iconBg="bg-[#FF6A00]"
                          icon={<FlaskIcon />}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* ── PHONE ROTATOR ── */}
            <div className="hidden lg:flex items-center space-x-6 h-full">
              <div className="flex items-center cursor-pointer group">
                <div className="w-10 h-10 bg-slate-50 border border-slate-200 rounded-full flex items-center justify-center text-[#FF6A00] group-hover:bg-orange-50 group-hover:border-orange-200 transition-colors shrink-0 z-10 relative">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div className="relative h-10 w-[140px] ml-3 overflow-hidden">
                  {phones.map((phone, index) => (
                    <a
                      key={index}
                      href={`tel:${phone.tel}`}
                      className={`absolute inset-0 flex flex-col justify-center transition-all duration-500 ${
                        activePhone === index
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-6 pointer-events-none"
                      }`}
                    >
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">
                        {phone.country}
                      </span>
                      <span className="text-sm font-bold text-primary leading-none group-hover:text-[#FF6A00] transition-colors">
                        {phone.num}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* ── MOBILE MENU BUTTON ── */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-primary focus:outline-none"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {mobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* ── MOBILE MENU PANEL ── */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 absolute w-full mt-4 shadow-xl">
            <div className="px-4 pt-2 pb-6 space-y-2 h-[80vh] overflow-y-auto">
              {[
                { label: "Home", href: "/" },
                { label: "Digital Marketing", href: "#services" },
                { label: "Design & Development", href: "#services" },
                { label: "Solutions", href: "#services" },
                { label: "Portfolio", href: "#results" },
                { label: "About", href: "#tech" },
                { label: "Contact", href: "#audit" },
              ].map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="block px-3 py-3 text-base font-medium text-secondary hover:text-[#FF6A00] hover:bg-slate-50 rounded-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {label}
                </a>
              ))}
              <div className="border-t border-slate-200 mt-2 pt-4 px-3 pb-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-3">
                  Call Us
                </span>
                <a
                  href="tel:+16194942548"
                  className="flex items-center text-sm font-bold text-primary py-1.5"
                >
                  <span className="w-10 text-[#FF6A00]">USA</span> +1 619 494
                  2548
                </a>
                <a
                  href="tel:+447476950642"
                  className="flex items-center text-sm font-bold text-primary py-1.5"
                >
                  <span className="w-10 text-[#FF6A00]">UK</span> +44 747 695
                  0642
                </a>
              </div>
              <a
                href="#audit"
                className="block mt-4 px-3 py-3 text-center text-base font-medium text-white bg-gradient-to-r from-[#FF8C00] to-[#FF4500] rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get Free Proposal
              </a>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

// ─────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────

function MegaMenuColumn({
  title,
  icon,
  links,
  onLinkClick, // ✅ NEW
}: {
  title: string;
  icon: React.ReactNode;
  links: { label: string; href: string }[];
  onLinkClick?: () => void; // ✅ NEW
}) {
  return (
    <div>
      <div className="flex items-center mb-4">
        <div className="w-8 h-8 bg-orange-50 border border-orange-100 rounded-lg flex items-center justify-center mr-3 shrink-0">
          {icon}
        </div>
        <h4 className="text-sm font-bold text-primary">{title}</h4>
      </div>

      <ul className="space-y-2.5 pl-11 text-[13px] font-medium text-slate-500">
        {links.map(({ label, href }) => (
          <li key={label}>
            <Link
              href={href}
              onClick={onLinkClick} // ✅ IMPORTANT
              className="hover:text-[#FF6A00] block transition-colors"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
function MegaMenuFooter({
  title,
  subtitle,
  cta,
  href,
}: {
  title: string;
  subtitle: string;
  cta: string;
  href: string;
}) {
  return (
    <div className="bg-slate-50 p-6 border-t border-slate-200 flex justify-between items-center">
      <div>
        <span className="font-bold text-primary text-sm block">{title}</span>
        <span className="text-xs text-slate-500">{subtitle}</span>
      </div>
      <a
        href={href}
        className="px-5 py-2.5 rounded-lg bg-[#050A1F] hover:bg-slate-800 text-white text-sm font-bold transition-all"
      >
        {cta}
      </a>
    </div>
  );
}

function ContactItem({
  href,
  title,
  subtitle,
  icon,
}: {
  href: string;
  title: string;
  subtitle: string;
  iconBg?: string;
  icon: React.ReactNode;
}) {
  return (
    <a href={href} className="flex items-start group">
      <div className="w-10 h-10 bg-orange-50 border border-slate-200 rounded-lg flex items-center justify-center mr-4 group-hover:bg-[#FF6A00] transition-colors shrink-0">
        <span className="text-[#FF6A00] group-hover:text-white transition-colors">
          {icon}
        </span>
      </div>
      <div>
        <h4 className="text-sm font-bold text-primary group-hover:text-[#FF6A00] mb-1">
          {title}
        </h4>
        <p className="text-xs text-slate-500 leading-snug">{subtitle}</p>
      </div>
    </a>
  );
}

// ─────────────────────────────────────────────
// Icon components (inline SVGs)
// ─────────────────────────────────────────────
const iconClass = "w-4 h-4 text-[#FF6A00]";

function SearchIcon() {
  return (
    <svg
      className={iconClass}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  );
}
function CursorIcon() {
  return (
    <svg
      className={iconClass}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
      />
    </svg>
  );
}
function UsersIcon() {
  return (
    <svg
      className={iconClass}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
      />
    </svg>
  );
}
function PenIcon() {
  return (
    <svg
      className={iconClass}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
      />
    </svg>
  );
}
function MailIcon() {
  return (
    <svg
      className={iconClass}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  );
}
function ChartIcon() {
  return (
    <svg
      className={iconClass}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
      />
    </svg>
  );
}
function FlaskIcon() {
  return (
    <svg
      className={iconClass}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
      />
    </svg>
  );
}
function MonitorIcon() {
  return (
    <svg
      className={iconClass}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  );
}
function CodeIcon() {
  return (
    <svg
      className={iconClass}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
      />
    </svg>
  );
}
function MobileIcon() {
  return (
    <svg
      className={iconClass}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
      />
    </svg>
  );
}
function PaletteIcon() {
  return (
    <svg
      className={iconClass}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
      />
    </svg>
  );
}
function BarChartIcon() {
  return (
    <svg
      className={iconClass}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 13v-1m4 1v-3m4 3V8M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
      />
    </svg>
  );
}
function GearIcon() {
  return (
    <svg
      className={iconClass}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );
}
function TeamIcon() {
  return (
    <svg
      className={iconClass}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>
  );
}
function BuildingIcon() {
  return (
    <svg
      className={iconClass}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
      />
    </svg>
  );
}
function BriefcaseIcon() {
  return (
    <svg
      className={iconClass}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  );
}
function BookIcon() {
  return (
    <svg
      className={iconClass}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0 0C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
      />
    </svg>
  );
}
function ListIcon() {
  return (
    <svg
      className={iconClass}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 7h18M3 12h18M3 17h18"
      />
    </svg>
  );
}
function DocIcon() {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
  );
}
function ChatIcon() {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
      />
    </svg>
  );
}

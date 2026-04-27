"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer className="bg-[#050A1F] pt-20 pb-10 relative overflow-hidden">
      {/* Subtle Top Glow */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#FF6A00]/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Footer: Newsletter & Brand */}
        <div className="flex flex-col lg:flex-row justify-between items-center border-b border-white/10 pb-12 mb-12 gap-8">
          <div>
            <img
              src="https://www.qtonix.com/images/logo-n-q-w.png"
              alt="Qtonix"
              className="h-12 md:h-16 w-auto mb-4 object-contain"
            />
            <p className="text-slate-400 text-sm">Engineering Meets Marketing.</p>
          </div>
          <div className="w-full lg:w-auto bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col sm:flex-row items-center gap-6">
            <div>
              <h4 className="text-white font-bold text-lg mb-1">Get Growth Insights</h4>
              <p className="text-slate-400 text-xs">
                Join 15,000+ marketers receiving our weekly newsletter.
              </p>
            </div>
            <div className="flex w-full sm:w-auto">
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-black/20 border border-white/10 rounded-l-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-[#FF6A00] w-full sm:w-64"
              />
              <button
                type="button"
                className="bg-gradient-to-r from-[#FF8C00] to-[#FF4500] hover:opacity-90 text-white px-4 py-2.5 rounded-r-lg font-bold transition-colors"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-4">
          {/* Brand & Contact Col */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-sm">
                A full-fledged digital marketing and software development company scaling
                international businesses through performance marketing, AI SEO, and premium web
                design.
              </p>
              {/* Rating Badge */}
              <div className="flex items-center space-x-3 mb-6">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-white font-bold text-sm">4.9/5 on Clutch</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex space-x-3 mb-8">
              {/* Twitter */}
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-[#FF6A00] hover:text-white hover:-translate-y-1 transition-all">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
              {/* LinkedIn */}
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-[#FF6A00] hover:text-white hover:-translate-y-1 transition-all">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              {/* Instagram */}
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-[#FF6A00] hover:text-white hover:-translate-y-1 transition-all">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>

            {/* Contact Info */}
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="flex items-center">
                <span className="font-bold text-white w-10">USA:</span>
                <a href="tel:+16194942548" className="hover:text-white transition-colors">+1 619 494 2548</a>
              </li>
              <li className="flex items-center">
                <span className="font-bold text-white w-10">UK:</span>
                <a href="tel:+447476950642" className="hover:text-white transition-colors">+44 747 695 0642</a>
              </li>
              <li className="py-6 border-t border-white/10 inline-block w-full">
                <a href="mailto:sales@qtonix.com" className="text-[#FF6A00] font-bold hover:text-white transition-colors flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  sales@qtonix.com
                </a>
              </li>
            </ul>
          </div>

          {/* Digital Marketing */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-widest">Digital Marketing</h4>
            <ul className="space-y-3 text-sm">
              {[
                { label: "SEO Services", href: "/seo" },
                { label: "Paid Ads (PPC)", href: "/ppc-services" },
                { label: "Social Media", href: "#" },
                { label: "Content Marketing", href: "#" },
                { label: "Email Marketing", href: "#" },
                { label: "Conversion (CRO)", href: "#" },
                { label: "White Label Services", href: "#" },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-slate-400 hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="#" className="text-slate-400 hover:text-[#FF6A00] transition-colors flex items-center">
                  AI Marketing
                  <span className="ml-2 w-1.5 h-1.5 rounded-full bg-[#FF6A00] animate-pulse" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Design & Dev */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-widest">Design & Dev</h4>
            <ul className="space-y-3 text-sm">
              {[
                "Web Design",
                "Web Development",
                "Mobile App Dev",
                "Design Services",
                "Business & Creative",
                "Website Maintenance",
                "Hire Developers",
              ].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-slate-400 hover:text-white transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions & Portfolio */}
          <div className="space-y-8">
            <div>
              <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-widest">Solutions</h4>
              <ul className="space-y-3 text-sm">
                {["By Industry", "By Business", "By Goal"].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-slate-400 hover:text-white transition-colors">{item}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-widest">Portfolio</h4>
              <ul className="space-y-3 text-sm">
                {[
                  { label: "Case Studies", href: "#results" },
                  { label: "Website & App Portfolio", href: "#results" },
                  { label: "Testimonials", href: "#results" },
                ].map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="text-slate-400 hover:text-white transition-colors">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* About Us */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-widest">About Us</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="#" className="text-slate-400 hover:text-white transition-colors">Company Overview</Link>
              </li>
              <li>
                <Link href="#" className="text-slate-400 hover:text-white transition-colors">
                  Careers
                  <span className="ml-2 bg-[#FF6A00]/20 text-[#FF6A00] px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider">
                    Hiring
                  </span>
                </Link>
              </li>
              {["Why Choose Us", "Blog & Resources", "Get Proposal", "Free Consultation"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-slate-400 hover:text-white transition-colors">{item}</Link>
                </li>
              ))}
              <li>
                <Link href="#audit" className="text-[#FF6A00] font-bold hover:text-white transition-colors">
                  Contact Support &rarr;
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
          <p>&copy; 2026 Qtonix Software Pvt Ltd. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
              <Link key={item} href="#" className="hover:text-white transition-colors">
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
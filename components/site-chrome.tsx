"use client";

import Link from "next/link";
import { ArrowUpRight, Globe2, Menu, Music2, X } from "lucide-react";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navigation = [
  { number: "01", label: "Student Homes", mobile: "Homes", href: "/homes", color: "#0879ea" },
  { number: "02", label: "Our way of living", mobile: "Living", href: "/#living", color: "#ffbc00" },
  { number: "03", label: "Community", mobile: "Community", href: "/#community", color: "#ff5a00" },
  { number: "04", label: "Contact", mobile: "Contact", href: "/contact", color: "#00b147" },
];

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link className={`logo ${light ? "logo-light" : ""}`} href="/" aria-label="Units home">
      <span>units.</span>
      <small>UNIQUE STUDENT HOMES</small>
    </Link>
  );
}

export function AmenityTicker() {
  const amenities = ["Super-fast WiFi", "24/7 hot water", "Electric bike stations", "Elevator access", "On-site team"];
  return (
    <div className="amenity-ticker" aria-label="Included amenities">
      <div className="amenity-ticker-track">
        {[...amenities, ...amenities].map((item, index) => (
          <span key={`${item}-${index}`}><b>✦</b>{item}</span>
        ))}
      </div>
    </div>
  );
}

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 26, restDelta: 0.001 });

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <motion.div className="scroll-progress" style={{ scaleX }} />
      <header className="mobile-header">
        <Logo />
        <button className="mobile-menu-button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label="Toggle menu">
          {open ? <X /> : <Menu />}
        </button>
      </header>

      <aside className="site-rail">
        <Logo />
        <nav className="rail-navigation" aria-label="Main navigation">
          {navigation.map((item) => {
            const active = item.href === "/homes"
              ? pathname === "/" || pathname === "/homes"
              : item.href === "/contact"
                ? pathname === "/contact"
                : false;
            return (
              <Link key={item.number} className={`rail-card ${active ? "is-active" : ""}`} href={item.href} style={{ background: item.color }}>
                <span>{item.number}</span><ArrowUpRight />
                <strong>{item.label}</strong>
              </Link>
            );
          })}
        </nav>
        <Link className="rail-book" href="/book">Book your Unit <ArrowUpRight /></Link>
        <button className="rail-language">English <Globe2 /></button>
        <div className="rail-socials">
          <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram"><b className="social-instagram">◎</b></a>
          <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" aria-label="Facebook"><b>f</b></a>
          <a href="https://www.tiktok.com/" target="_blank" rel="noreferrer" aria-label="TikTok"><Music2 /></a>
        </div>
      </aside>

      <AnimatePresence>
        {open && (
          <motion.div className="mobile-menu" initial={{ clipPath: "circle(0% at 92% 4%)" }} animate={{ clipPath: "circle(145% at 92% 4%)" }} exit={{ clipPath: "circle(0% at 92% 4%)" }} transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}>
            <div className="mobile-menu-list">
              {navigation.map((item, index) => (
                <motion.div key={item.number} initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.12 + index * 0.06 }}>
                  <Link href={item.href} onClick={() => setOpen(false)} style={{ background: item.color }}><small>{item.number}</small><strong>{item.label}</strong><ArrowUpRight /></Link>
                </motion.div>
              ))}
            </div>
            <Link className="mobile-menu-book" href="/book" onClick={() => setOpen(false)}>Book your Unit <ArrowUpRight /></Link>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="site-content">{children}</div>
      <nav className="mobile-bottom-nav" aria-label="Quick navigation">
        {navigation.map((item) => (
          <Link key={item.number} href={item.href} style={{ "--item-color": item.color } as React.CSSProperties}>
            <span>{item.number}</span><small>{item.mobile}</small>
          </Link>
        ))}
        <Link className="mobile-bottom-book" href="/book" aria-label="Book a unit"><ArrowUpRight /></Link>
      </nav>
    </>
  );
}

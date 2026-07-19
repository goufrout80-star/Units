"use client";

import Image from "next/image";
import Link from "next/link";
import {
  AirVent, ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, BedDouble, Check, ChevronDown,
  CookingPot, Expand, Layers3, Maximize2, Monitor, ShowerHead, Sparkles, Sun, Users, Wifi,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Reveal, WordReveal } from "@/components/reveal";
import { AmenityTicker, SiteChrome } from "@/components/site-chrome";

const roomTypes = [
  { name: "KICK", area: "20–22 m²", price: "€640", color: "#0879ea", description: "Clever, compact and completely yours.", accent: "For focused city living" },
  { name: "BOOST", area: "23–25 m²", price: "€690", color: "#ffbd00", description: "A little more room to work, move and host.", accent: "Our resident favourite" },
  { name: "FLEX", area: "26–29 m²", price: "€735", color: "#ff5a00", description: "Extra breathing room, exactly where it matters.", accent: "Space that adapts" },
  { name: "VIBE", area: "30–34 m²", price: "€790", color: "#aa4be8", description: "The biggest Unit, with a view to match.", accent: "Go all in" },
];

const homeFeatures = [
  [<BedDouble key="i" />, "Double bed", "A proper 140 cm bed with built-in storage."],
  [<Monitor key="i" />, "Study zone", "A generous desk, task light and ergonomic chair."],
  [<CookingPot key="i" />, "Private kitchen", "Fridge, induction hob, microwave and smart storage."],
  [<ShowerHead key="i" />, "Private bathroom", "A walk-in shower and plenty of shelf space."],
  [<AirVent key="i" />, "Climate control", "Your temperature, all year round."],
  [<Wifi key="i" />, "Fast WiFi", "Strong, secure and already connected."],
];

const faqs = [
  ["What is included in the rent?", "Your furnished private Unit, utilities, high-speed WiFi, 24/7 hot water, access to every shared space, building security and our on-site team."],
  ["How long is the tenancy?", "Our standard stay follows the academic year. Flexible start dates may be available—tell us what you need in the booking form."],
  ["Can I book before seeing the building?", "Yes. You can choose a live video tour, request a physical viewing, or reserve remotely with help from our team."],
  ["Can friends visit?", "Of course. This is your home. Guests are welcome when they respect the building and the rest of the community."],
];

function RoomSelector() {
  const [active, setActive] = useState(1);
  const room = roomTypes[active];
  return (
    <section className="room-selector" id="room-types">
      <div className="room-selector-heading">
        <Reveal><span className="section-pill">Choose your space</span></Reveal>
        <WordReveal text="Same good thinking. Four different sizes." />
      </div>
      <div className="room-tabs" role="tablist" aria-label="Room types">
        {roomTypes.map((item, index) => (
          <button key={item.name} role="tab" aria-selected={active === index} className={active === index ? "is-active" : ""} style={{ "--room-color": item.color } as React.CSSProperties} onClick={() => setActive(index)}>
            <span>0{index + 1}</span><b>{item.name}</b><small>{item.area}</small>
          </button>
        ))}
      </div>
      <div className="room-stage" style={{ "--room-color": room.color } as React.CSSProperties}>
        <AnimatePresence mode="wait">
          <motion.div className="room-stage-copy" key={room.name} initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 24 }} transition={{ duration: 0.35 }}>
            <span className="room-accent">{room.accent}</span>
            <h3>{room.name}</h3>
            <p>{room.description}</p>
            <div className="room-specs"><span><Maximize2 /> {room.area}</span><span><Users /> 1 resident</span><span><Sun /> Large window</span></div>
            <div className="room-price"><small>From</small><strong>{room.price}</strong><span>/ month</span></div>
            <Link className="button button-primary" href={`/book?room=${room.name.toLowerCase()}`}>Choose {room.name} <ArrowUpRight /></Link>
          </motion.div>
        </AnimatePresence>
        <div className="room-stage-image">
          <Image src="/images/student-room.webp" alt={`${room.name} student room`} fill sizes="(max-width: 900px) 100vw, 52vw" />
          <div className="room-image-filter" />
          <button className="room-view-button"><Expand /> 360° room view</button>
          <span className="room-image-label">Sample interior · finishes may vary</span>
        </div>
      </div>
    </section>
  );
}

function FeatureSection() {
  return (
    <section className="home-feature-section">
      <div className="home-feature-heading"><Reveal><span className="section-pill section-pill-light">Inside every Unit</span></Reveal><WordReveal text="Private. Practical. Properly considered." /></div>
      <div className="home-feature-grid">
        {homeFeatures.map(([icon, title, text], index) => (
          <Reveal className="home-feature" key={String(title)} delay={(index % 3) * 0.06}>
            <span>0{index + 1}</span><div>{icon}</div><h3>{title}</h3><p>{text}</p><Check />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function BuildingSection() {
  return (
    <section className="building-section">
      <div className="building-gallery">
        <Reveal className="building-image building-image-main"><Image src="/images/lobby.webp" alt="Units Parkside lobby" fill sizes="(max-width: 900px) 100vw, 60vw" /><span>THE LIVING ROOM</span></Reveal>
        <Reveal className="building-image building-image-small" delay={0.1}><Image src="/images/hero-lounge.webp" alt="Shared study and lounge area" fill sizes="(max-width: 900px) 100vw, 30vw" /><span>STUDY & SOCIAL</span></Reveal>
        <Reveal className="building-color-card"><Sparkles /><p>Designed for the moments between lectures.</p></Reveal>
      </div>
      <div className="building-copy">
        <Reveal><span className="section-pill">Beyond your front door</span></Reveal>
        <WordReveal text="The whole building is yours." />
        <Reveal><p>Find a quiet corner, cook together, get a workout in or take dinner up to the roof. Parkside gives you room for every version of the day.</p></Reveal>
        <Reveal className="building-list">
          {['Resident lounge', 'Study rooms', 'Community kitchen', 'Fitness studio', 'Laundry room', 'Rooftop terrace'].map((item, index) => <span key={item}><b>0{index + 1}</b>{item}<ArrowUpRight /></span>)}
        </Reveal>
      </div>
    </section>
  );
}

function FAQSection() {
  const [active, setActive] = useState<number | null>(0);
  return (
    <section className="faq-section">
      <div className="faq-intro"><Reveal><span className="section-pill">Good to know</span></Reveal><WordReveal text="Questions, meet answers." /><Reveal><p>Still wondering about something? Our team is very human and happy to help.</p><Link className="text-link" href="/contact">Talk to us <ArrowRight /></Link></Reveal></div>
      <div className="faq-list">
        {faqs.map(([question, answer], index) => (
          <div className={`faq-item ${active === index ? "is-open" : ""}`} key={question}>
            <button onClick={() => setActive(active === index ? null : index)} aria-expanded={active === index}><span>0{index + 1}</span><b>{question}</b><ChevronDown /></button>
            <AnimatePresence initial={false}>{active === index && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}><p>{answer}</p></motion.div>}</AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}

export function HomesPage() {
  return (
    <SiteChrome>
      <main>
        <section className="homes-hero">
          <div className="hero-ticker"><AmenityTicker /></div>
          <div className="homes-hero-image"><Image src="/images/student-room.webp" alt="A fully furnished Units student home" fill priority sizes="(max-width: 800px) 100vw, calc(100vw - 150px)" /></div>
          <div className="homes-hero-overlay" />
          <div className="homes-hero-copy"><span>UNITS PARKSIDE · ATHENS</span><h1>A room that<br />gets you.</h1><p>Private student homes, designed down to the last plug socket.</p><div><Link className="button button-light" href="#room-types">Explore room types <ArrowDown /></Link><Link className="button button-outline-light" href="/book">Check availability</Link></div></div>
          <div className="homes-hero-facts"><span><b>4</b> room types</span><span><b>20–34</b> square metres</span><span><b>All</b> bills included</span></div>
        </section>
        <RoomSelector />
        <FeatureSection />
        <BuildingSection />
        <section className="homes-cta"><div className="homes-cta-grid" /><Reveal><Layers3 /></Reveal><WordReveal text="Ready to make it yours?" /><Reveal><p>Tell us what you&apos;re looking for and we&apos;ll help you find the right Unit.</p><Link className="button button-primary" href="/book">Start your booking <ArrowUpRight /></Link></Reveal></section>
        <FAQSection />
      </main>
      <footer className="mini-footer"><Link href="/"><ArrowLeft /> Back home</Link><strong>units.</strong><span>Unique student homes · Athens</span></footer>
    </SiteChrome>
  );
}

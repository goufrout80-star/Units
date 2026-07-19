"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown, ArrowRight, ArrowUpRight, Bike, CalendarDays,
  Coffee, Dumbbell, Headphones, KeyRound, MapPin, ShieldCheck,
  Smartphone, Sparkles, Users, WashingMachine, Wifi, Zap,
} from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Corridor } from "@/components/corridor";
import { Reveal, WordReveal } from "@/components/reveal";
import { AmenityTicker, SiteChrome } from "@/components/site-chrome";

const features = [
  { icon: <Wifi />, name: "Super-fast WiFi", text: "Stream, study and call without the buffering." },
  { icon: <ShieldCheck />, name: "Safe & secure", text: "Smart access, CCTV and a team that knows your name." },
  { icon: <WashingMachine />, name: "Laundry room", text: "No coins, no queues, all inside the building." },
  { icon: <Bike />, name: "Bike friendly", text: "Secure parking and electric bike charging stations." },
  { icon: <Dumbbell />, name: "Fitness studio", text: "Move, stretch or reset whenever it suits you." },
  { icon: <Coffee />, name: "Community lounges", text: "Spaces made for study sessions and spontaneous plans." },
];

const principles = ["Be curious", "Share the good", "Make room", "Stay original"];

function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 130]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.72], [1, 0]);

  return (
    <section className="units-hero" ref={heroRef}>
      <div className="hero-ticker"><AmenityTicker /></div>
      <motion.div className="hero-image" style={{ y: imageY }}>
        <Image src="/images/hero-lounge.webp" alt="Students spending time together in the Units lounge" fill priority sizes="(max-width: 800px) 100vw, calc(100vw - 150px)" />
      </motion.div>
      <div className="hero-shade" />
      <motion.div className="hero-copy" style={{ y: copyY, opacity: copyOpacity }}>
        <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>Student homes, made differently.</motion.p>
        <motion.h1 initial="hidden" animate="visible">
          {["YOUR PLACE.", "YOUR PEOPLE.", "YOUR ATHENS."].map((line, index) => (
            <span key={line} className="hero-line-mask"><motion.span variants={{ hidden: { y: "110%" }, visible: { y: 0, transition: { duration: 0.85, delay: 0.15 + index * 0.1, ease: [0.22, 1, 0.36, 1] } } }}>{line}</motion.span></span>
          ))}
        </motion.h1>
        <div className="hero-actions">
          <Link className="button button-primary" href="/homes">Explore our Units <ArrowUpRight /></Link>
          <span className="availability"><i /> Applications open · 2026/27</span>
        </div>
      </motion.div>
      <a className="hero-scroll" href="#location"><ArrowDown /><span>Discover<br />the Units life</span></a>
      <div className="hero-sticker"><span>MOVE IN<br />FEEL AT HOME</span><Sparkles /></div>
    </section>
  );
}

function LocationSection() {
  return (
    <section className="location-section" id="location">
      <div className="location-intro">
        <Reveal><span className="section-pill">01 · The location</span></Reveal>
        <WordReveal text="Athens is your campus." />
        <Reveal className="location-copy" delay={0.12}>
          <p>Walk to class. Grab a freddo with friends. Catch a late film, a live set, or the last light from Lycabettus. Units puts you in the middle of it all.</p>
          <Link className="text-link" href="/homes">Meet Units Parkside <ArrowRight /></Link>
        </Reveal>
      </div>
      <Reveal className="location-map" delay={0.16}>
        <div className="map-grid" />
        <div className="map-line map-line-one" /><div className="map-line map-line-two" />
        <span className="map-place place-one">NTUA</span><span className="map-place place-two">PEDION TOU AREOS</span><span className="map-place place-three">EXARCHIA</span>
        <div className="map-pin"><span>units.</span><small>PARKSIDE</small></div>
        <div className="map-time"><MapPin /> 7 min walk to campus</div>
      </Reveal>
    </section>
  );
}

function LivingSection() {
  return (
    <section className="living-section" id="living">
      <div className="living-marquee" aria-hidden="true"><div>LIVE EASY ✦ LIVE BRIGHT ✦ LIVE TOGETHER ✦ LIVE EASY ✦ LIVE BRIGHT ✦ LIVE TOGETHER ✦ </div></div>
      <div className="living-heading">
        <Reveal><span className="section-pill section-pill-light">02 · Our way of living</span></Reveal>
        <WordReveal text="All the freedom. None of the fuss." />
        <Reveal><p>Every detail is handled. Your only job is to arrive, settle in, and make the place yours.</p></Reveal>
      </div>
      <div className="living-cards">
        <Reveal className="living-card living-card-photo">
          <Image src="/images/lobby.webp" alt="The colorful lobby at Units" fill sizes="(max-width: 900px) 100vw, 34vw" />
          <span>Spaces worth leaving your room for.</span>
        </Reveal>
        <Reveal className="living-card living-card-yellow" delay={0.08}>
          <span className="card-number">24/7</span><Zap />
          <h3>Everything works.<br />Any hour.</h3>
          <p>Hot water, fast WiFi, secure access and support when you need it.</p>
        </Reveal>
        <Reveal className="living-card living-card-cream" delay={0.16}>
          <div className="orbit-icon"><KeyRound /></div>
          <h3>One simple bill.</h3>
          <p>Rent, utilities, connectivity and community spaces—all included. No surprise maths.</p>
          <Link href="/homes">See what&apos;s included <ArrowUpRight /></Link>
        </Reveal>
      </div>
    </section>
  );
}

function InclusiveSection() {
  return (
    <section className="inclusive-section">
      <div className="inclusive-title">
        <Reveal><span className="section-pill">All-inclusive living</span></Reveal>
        <WordReveal text="More living. Less admin." />
        <Reveal><p>A private home with the shared spaces, useful services and thoughtful details that make every day smoother.</p></Reveal>
      </div>
      <div className="feature-bento">
        {features.map((feature, index) => (
          <Reveal className={`feature-card feature-card-${index + 1}`} key={feature.name} delay={(index % 3) * 0.05}>
            <div className="feature-icon">{feature.icon}</div>
            <div><h3>{feature.name}</h3><p>{feature.text}</p></div>
            <span>0{index + 1}</span>
          </Reveal>
        ))}
        <Reveal className="feature-image">
          <Image src="/images/smart-lock.webp" alt="Smart access to every Units home" fill sizes="(max-width: 800px) 100vw, 40vw" />
          <div><Smartphone /><span>Your room.<br />In your pocket.</span></div>
        </Reveal>
      </div>
    </section>
  );
}

function HomesPortal() {
  return (
    <section className="portal-section">
      <div className="portal-copy">
        <Reveal><span className="section-pill">Step inside</span></Reveal>
        <WordReveal text="A space of your own." />
        <Reveal><p>Every Unit is fully furnished, private and ready on day one. Choose your size; the clever details come standard.</p></Reveal>
        <Reveal><Link className="button button-primary" href="/homes">Find your Unit <ArrowUpRight /></Link></Reveal>
      </div>
      <Reveal className="portal-corridor"><Corridor /></Reveal>
    </section>
  );
}

function CommunitySection() {
  return (
    <section className="community-section" id="community">
      <div className="community-copy">
        <Reveal><span className="section-pill">03 · Community</span></Reveal>
        <WordReveal text="Come for the room. Stay for the people." />
        <Reveal><p>Community isn&apos;t a calendar of awkward activities. It&apos;s a hundred little chances to meet, make, share and belong.</p></Reveal>
      </div>
      <Reveal className="community-image">
        <Image src="/images/community-rooftop.webp" alt="Units residents having lunch together on the rooftop" fill sizes="(max-width: 900px) 100vw, 70vw" />
        <div className="image-note note-one"><CalendarDays /><span>Rooftop lunch<br /><b>12:30, Saturday</b></span></div>
        <div className="image-note note-two"><Users /><span>Hosted by<br /><b>the Units crew</b></span></div>
      </Reveal>
      <div className="community-strip">
        {["Morning coffee", "Study together", "Open decks", "Rooftop dinners", "Sunday reset"].map((item, index) => <span key={item}><b>0{index + 1}</b>{item}</span>)}
      </div>
    </section>
  );
}

function PrinciplesSection() {
  return (
    <section className="principles-section">
      <div className="pixel-noise" aria-hidden="true">{Array.from({ length: 72 }, (_, index) => <i key={index} style={{ "--x": `${(index * 43) % 100}%`, "--y": `${(index * 71) % 100}%`, "--c": ["#aa4be8", "#ffbd00", "#0879ea", "#00b147"][index % 4] } as React.CSSProperties} />)}</div>
      <div className="principles-copy">
        <Reveal><span className="section-pill">The Units principles</span></Reveal>
        <WordReveal text="Live like you mean it." />
      </div>
      <div className="principle-list">
        {principles.map((principle, index) => (
          <Reveal className="principle-row" key={principle} delay={index * 0.04}>
            <span>0{index + 1}</span><h3>{principle}</h3><div className={`pixel-face pixel-face-${index + 1}`}><i /><i /><b /></div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function StoriesSection() {
  const stories = [
    { quote: "It felt like home before I had even unpacked.", name: "Maya", course: "Architecture · 2nd year", color: "#ffbd00" },
    { quote: "My closest friends are literally one floor away.", name: "Alex", course: "Computer Science · 1st year", color: "#aa4be8" },
    { quote: "The rooftop is where every good plan begins.", name: "Niko", course: "Business · 3rd year", color: "#00b147" },
  ];
  return (
    <section className="stories-section">
      <div className="stories-heading"><Reveal><span className="section-pill section-pill-light">Life, according to residents</span></Reveal><WordReveal text="Good people. Real stories." /></div>
      <div className="story-cards">
        {stories.map((story, index) => (
          <Reveal className="story-card" key={story.name} delay={index * 0.08}>
            <div className="story-quote" style={{ background: story.color }}>“{story.quote}”</div>
            <div className="story-meta"><div className="story-avatar">{story.name[0]}</div><div><b>{story.name}</b><span>{story.course}</span></div><Headphones /></div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid" />
      <div className="footer-top">
        <Reveal><span className="section-pill section-pill-light">Ready when you are</span></Reveal>
        <WordReveal text="Your next chapter has a room." />
        <Reveal className="footer-actions"><Link className="button button-light" href="/book">Book your Unit <ArrowUpRight /></Link><Link className="button button-outline-light" href="/contact">Ask us anything</Link></Reveal>
      </div>
      <div className="footer-newsletter">
        <div><span>THE UNITS UPDATE</span><h3>News, openings and good stuff. Occasionally.</h3></div>
        <form onSubmit={(event) => event.preventDefault()}><label htmlFor="newsletter">Email address</label><input id="newsletter" type="email" placeholder="you@email.com" required /><button aria-label="Subscribe"><ArrowRight /></button></form>
      </div>
      <div className="footer-bottom">
        <div className="footer-logo">units.</div>
        <div><a href="#">Instagram</a><a href="#">TikTok</a><a href="#">Facebook</a></div>
        <div><Link href="/homes">Student Homes</Link><Link href="/book">Book a Unit</Link><Link href="/contact">Contact</Link></div>
        <small>© 2026 Units Student Living<br />Concept experience. All rights reserved.</small>
      </div>
    </footer>
  );
}

export function HomePage() {
  return (
    <SiteChrome>
      <main>
        <Hero />
        <LocationSection />
        <LivingSection />
        <InclusiveSection />
        <HomesPortal />
        <CommunitySection />
        <PrinciplesSection />
        <StoriesSection />
      </main>
      <Footer />
    </SiteChrome>
  );
}

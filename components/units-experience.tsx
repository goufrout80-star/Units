"use client";

import Image from "next/image";
import {
  AirVent,
  ArrowDown,
  ArrowUpRight,
  Check,
  ChevronDown,
  CircleCheck,
  CookingPot,
  Globe2,
  Laptop,
  Mail,
  MapPin,
  Move,
  ShowerHead,
  Sparkles,
  Tv,
  Users,
  Wifi,
  X,
  Zap,
} from "lucide-react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { FormEvent, useEffect, useMemo, useState } from "react";

const pages = [
  { number: "01", label: "Student Homes", short: "Homes", color: "#0877e8" },
  { number: "02", label: "Our way of living", short: "Living", color: "#ffb800" },
  { number: "03", label: "Community", short: "Community", color: "#ff5600" },
  { number: "04", label: "Contact", short: "Contact", color: "#00ae43" },
];

const benefits = [
  "Super-fast WiFi",
  "24/7 Hot water",
  "Electric bike stations",
  "Elevator access",
  "On-site team",
];

const tunnelColors = ["#a94bf0", "#ff5a00", "#ffbd00", "#00ad43", "#0877e8", "#ef3340"];

const transition = { type: "spring" as const, stiffness: 300, damping: 32 };

function Brand() {
  return (
    <button className="brand" aria-label="Go to Student Homes">
      <span>units.</span>
      <small>UNIQUE STUDENT HOMES</small>
    </button>
  );
}

function Marquee() {
  return (
    <div className="marquee" aria-label="Included amenities">
      <div className="marquee-track">
        {[...benefits, ...benefits].map((item, index) => (
          <span key={`${item}-${index}`}>
            <Zap size={12} fill="currentColor" /> {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function SideNavigation({ active, onNavigate, onBook }: {
  active: number;
  onNavigate: (page: number) => void;
  onBook: () => void;
}) {
  return (
    <aside className="side-nav" aria-label="Main navigation">
      <div className="nav-pages">
        {pages.map((page, index) => (
          <motion.button
            key={page.number}
            className={`nav-card ${active === index ? "is-active" : ""}`}
            style={{ backgroundColor: page.color }}
            onClick={() => onNavigate(index)}
            whileHover={{ x: 3 }}
            whileTap={{ scale: 0.98 }}
            aria-current={active === index ? "page" : undefined}
          >
            <span>{page.number}</span>
            <ArrowUpRight size={16} />
            <strong>{page.label}</strong>
          </motion.button>
        ))}
      </div>

      <motion.button className="book-button" onClick={onBook} whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
        Book your Unit <ArrowUpRight size={15} />
      </motion.button>

      <button className="language-button">
        English <Globe2 size={16} />
      </button>

      <div className="social-bar" aria-label="Social links">
        <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><span className="instagram">◎</span></a>
        <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook"><span className="facebook">f</span></a>
        <a href="https://tiktok.com" target="_blank" rel="noreferrer" aria-label="TikTok"><span className="tiktok">♪</span></a>
      </div>
    </aside>
  );
}

function MobileNavigation({ active, onNavigate, onBook }: {
  active: number;
  onNavigate: (page: number) => void;
  onBook: () => void;
}) {
  return (
    <nav className="mobile-nav" aria-label="Mobile navigation">
      {pages.map((page, index) => (
        <button
          key={page.number}
          className={active === index ? "is-active" : ""}
          style={{ "--nav-color": page.color } as React.CSSProperties}
          onClick={() => onNavigate(index)}
          aria-label={page.label}
          aria-current={active === index ? "page" : undefined}
        >
          <span>{page.number}</span>
          <small>{page.short}</small>
        </button>
      ))}
      <button className="mobile-book" onClick={onBook} aria-label="Book your Unit"><ArrowUpRight size={18} /></button>
    </nav>
  );
}

function Feature({ icon, label }: { icon: React.ReactNode; label: string }) {
  return <li>{icon}<span>{label}</span></li>;
}

function Tunnel() {
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 100, damping: 18 });
  const springY = useSpring(pointerY, { stiffness: 100, damping: 18 });
  const rotateY = useTransform(springX, [-1, 1], [-2.5, 2.5]);
  const rotateX = useTransform(springY, [-1, 1], [2.5, -2.5]);
  const translateX = useTransform(springX, [-1, 1], [-5, 5]);
  const translateY = useTransform(springY, [-1, 1], [-5, 5]);

  const updatePointer = (event: React.PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - rect.left) / rect.width) * 2 - 1);
    pointerY.set(((event.clientY - rect.top) / rect.height) * 2 - 1);
  };

  const nestedRects = useMemo(() => [
    [1, 1, 798, 698], [72, 52, 656, 594], [146, 110, 508, 480],
    [217, 166, 366, 368], [278, 216, 244, 268], [326, 257, 148, 186],
  ], []);

  return (
    <motion.div
      className="tunnel"
      onPointerMove={updatePointer}
      onPointerLeave={() => { pointerX.set(0); pointerY.set(0); }}
      style={reduceMotion ? undefined : { rotateX, rotateY }}
    >
      <motion.svg
        viewBox="0 0 800 700"
        role="img"
        aria-label="An abstract perspective hallway made from colorful rooms"
        style={reduceMotion ? undefined : { x: translateX, y: translateY }}
      >
        <defs>
          <clipPath id="door-clip"><polygon points="646,1 798,1 728,52 610,52" /></clipPath>
          <clipPath id="room-clip"><polygon points="1,500 72,446 72,594 1,698" /></clipPath>
          <clipPath id="room-side"><polygon points="654,110 728,52 728,240 654,272" /></clipPath>
        </defs>

        <rect width="800" height="700" fill="#f5ece5" />
        <image href="/images/student-door.webp" width="800" height="920" x="180" y="-100" preserveAspectRatio="xMidYMid slice" clipPath="url(#door-clip)" />
        <image href="/images/student-room.webp" width="650" height="500" x="-120" y="340" preserveAspectRatio="xMidYMid slice" clipPath="url(#room-clip)" />
        <image href="/images/student-room.webp" width="440" height="410" x="520" y="10" preserveAspectRatio="xMidYMid slice" clipPath="url(#room-side)" />

        <g className="color-tiles">
          <polygon points="1,1 170,1 208,52 72,52" fill={tunnelColors[0]} />
          <polygon points="170,1 360,1 378,52 208,52" fill={tunnelColors[1]} />
          <polygon points="610,52 728,52 654,110 559,110" fill={tunnelColors[2]} />
          <polygon points="72,52 146,110 146,246 72,210" fill={tunnelColors[3]} />
          <polygon points="1,354 72,318 72,446 1,500" fill={tunnelColors[4]} />
          <polygon points="728,410 798,448 798,568 728,518" fill={tunnelColors[0]} />
          <polygon points="217,166 300,166 316,216 278,216" fill={tunnelColors[5]} />
          <polygon points="500,166 583,166 522,216 484,216" fill={tunnelColors[1]} />
          <polygon points="326,443 376,443 356,534 302,534" fill={tunnelColors[2]} />
          <polygon points="424,443 474,443 498,534 444,534" fill={tunnelColors[3]} />
          <polygon points="217,534 302,534 250,594 146,594" fill={tunnelColors[4]} />
          <polygon points="498,534 583,534 654,594 550,594" fill={tunnelColors[5]} />
        </g>

        <g className="tunnel-lines">
          {nestedRects.map(([x, y, width, height], index) => (
            <rect key={index} x={x} y={y} width={width} height={height} />
          ))}
          <path d="M1 1 326 257M170 1 350 257M360 1 386 257M646 1 438 257M798 1 474 257" />
          <path d="M1 698 326 443M170 698 350 443M360 698 386 443M646 698 438 443M798 698 474 443" />
          <path d="M1 1 326 257M1 175 326 302M1 350 326 350M1 525 326 398M1 698 326 443" />
          <path d="M798 1 474 257M798 175 474 302M798 350 474 350M798 525 474 398M798 698 474 443" />
        </g>
        <rect x="326" y="257" width="148" height="186" fill="#f5ece5" stroke="#111" strokeWidth="2" />
      </motion.svg>
      <motion.div className="explore-pill" animate={reduceMotion ? undefined : { y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity }}>
        <Move size={13} /> Move to explore
      </motion.div>
    </motion.div>
  );
}

function StudentHomes({ onNavigate }: { onNavigate: (page: number) => void }) {
  return (
    <motion.section className="home-view view" variants={pageVariants} initial="enter" animate="center" exit="exit">
      <div className="home-copy panel-outline">
        <span className="eyebrow">Our Units</span>
        <div className="copy-block">
          <motion.h1 initial={{ y: 28, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ ...transition, delay: 0.08 }}>
            Student living,<br />redefined.
          </motion.h1>
          <p>A new concept in student living—fully furnished, move-in ready units designed for comfort and ease. Units is more than just a place to stay; it&apos;s a place to belong.</p>
          <ul className="feature-list">
            <Feature icon={<Laptop />} label="Private workspace" />
            <Feature icon={<Tv />} label="Smart TV" />
            <Feature icon={<CookingPot />} label="Private kitchen" />
            <Feature icon={<AirVent />} label="Air-conditioning" />
            <Feature icon={<ShowerHead />} label="Private bathroom" />
            <Feature icon={<Wifi />} label="Super-fast WiFi" />
          </ul>
          <motion.button className="primary-cta" onClick={() => onNavigate(1)} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            Check out our Units <ArrowUpRight size={17} />
          </motion.button>
        </div>
      </div>
      <div className="tunnel-wrap panel-outline"><Tunnel /></div>
    </motion.section>
  );
}

const pixelGrid = Array.from({ length: 40 }, (_, index) => ({
  id: index,
  left: `${(index * 37) % 96}%`,
  top: `${44 + ((index * 29) % 50)}%`,
  color: tunnelColors[index % tunnelColors.length],
  delay: (index % 9) * 0.06,
}));

function PixelSmile() {
  return (
    <motion.div className="pixel-smile" initial={{ scale: 0, rotate: -30 }} animate={{ scale: 1, rotate: 0 }} transition={{ ...transition, delay: 0.45 }} aria-hidden="true">
      <span className="eye left" /><span className="eye right" /><span className="mouth m1" /><span className="mouth m2" /><span className="mouth m3" />
    </motion.div>
  );
}

function OurWay() {
  return (
    <motion.section className="manifesto-view view panel-outline" variants={pageVariants} initial="enter" animate="center" exit="exit">
      <div className="manifesto-grid" />
      <div className="pixel-field" aria-hidden="true">
        {pixelGrid.map((pixel) => (
          <motion.span
            key={pixel.id}
            style={{ left: pixel.left, top: pixel.top, background: pixel.color }}
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1, 1, 0.6] }}
            transition={{ delay: pixel.delay, duration: 1.4, repeat: Infinity, repeatDelay: 2.8 }}
          />
        ))}
      </div>
      <span className="eyebrow manifesto-eyebrow">Our approach</span>
      <div className="manifesto-center">
        <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          A new approach to student living.
        </motion.p>
        <motion.h2 initial={{ clipPath: "inset(0 100% 0 0)" }} animate={{ clipPath: "inset(0 0% 0 0)" }} transition={{ duration: 0.8, delay: 0.25 }}>
          Home should make life<br />feel more possible.
        </motion.h2>
      </div>
      <div className="statement-band">
        <PixelSmile />
        <motion.div initial={{ x: "12%" }} animate={{ x: "-35%" }} transition={{ duration: 12, repeat: Infinity, ease: "linear" }}>
          HOW WE THINK ABOUT LIVING · HOW WE THINK ABOUT LIVING ·
        </motion.div>
      </div>
      <div className="scroll-cue"><ArrowDown size={15} /> Keep exploring</div>
    </motion.section>
  );
}

const principles = [
  {
    number: "1",
    title: "Practical ease and convenience, every day",
    color: "#ffe600",
    copy: "From move-in day to laundry night, the useful things are already handled.",
    image: "/images/student-door.webp",
    stat: "ZERO",
    statLabel: "furniture runs",
  },
  {
    number: "2",
    title: "A new take on student living",
    color: "#29ed56",
    copy: "Community-first spaces with the freedom and privacy of your own studio.",
    image: "/images/student-room.webp",
    stat: "100%",
    statLabel: "your own space",
  },
  {
    number: "3",
    title: "Security and comfort from day one",
    color: "#24b9ea",
    copy: "A friendly on-site team, smart access and support when you actually need it.",
    image: "/images/student-room.webp",
    stat: "24/7",
    statLabel: "peace of mind",
  },
];

function Community() {
  return (
    <motion.section className="community-view view" variants={pageVariants} initial="enter" animate="center" exit="exit">
      <div className="community-title panel-outline">
        <Sparkles size={18} />
        <h2>Why Units hits different.</h2>
        <Sparkles size={18} />
      </div>
      <div className="principle-grid">
        {principles.map((principle, index) => (
          <motion.article
            className="principle-column"
            key={principle.number}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ ...transition, delay: index * 0.08 }}
          >
            <motion.div className="principle-head panel-outline" style={{ background: principle.color }} whileHover={{ y: -4 }}>
              <span>{principle.number}</span>
              <strong>{principle.title}</strong>
            </motion.div>
            {index === 1 && (
              <div className="mini-list panel-outline">
                <span>Community that&apos;s optional</span><span>Spaces without forced vibes</span><span>Support that feels human</span>
              </div>
            )}
            <div className={`principle-photo panel-outline photo-${index + 1}`}>
              <Image src={principle.image} alt="Student enjoying life at Units" fill sizes="(max-width: 768px) 90vw, 28vw" />
              <span className="image-tag">Living, upgraded.</span>
            </div>
            <div className="principle-copy panel-outline">
              <p>{principle.copy}</p>
              <div><strong>{principle.stat}</strong><span>{principle.statLabel}</span></div>
            </div>
          </motion.article>
        ))}
      </div>
    </motion.section>
  );
}

function Contact({ onBook }: { onBook: () => void }) {
  return (
    <motion.section className="contact-view view panel-outline" variants={pageVariants} initial="enter" animate="center" exit="exit">
      <div className="contact-grid" />
      <div className="contact-intro">
        <span className="eyebrow">Contact</span>
        <h2>Come say hi.</h2>
        <p>Questions, viewings, availability—or just curious what living at Units feels like? Our team is ready.</p>
        <motion.button className="primary-cta" onClick={onBook} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          Book a viewing <ArrowUpRight size={17} />
        </motion.button>
      </div>
      <div className="contact-cards">
        <a href="mailto:hello@unitsliving.com" className="contact-card yellow panel-outline">
          <Mail /><span>Write to us</span><strong>hello@unitsliving.com</strong><ArrowUpRight />
        </a>
        <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="contact-card purple panel-outline">
          <MapPin /><span>Find us</span><strong>Right where student life happens.</strong><ArrowUpRight />
        </a>
        <div className="contact-card cream panel-outline">
          <Users /><span>Resident support</span><strong>People first. Always.</strong><CircleCheck />
        </div>
      </div>
      <div className="contact-word" aria-hidden="true">UNITS.</div>
    </motion.section>
  );
}

const pageVariants = {
  enter: { opacity: 0, scale: 0.985, y: 12 },
  center: { opacity: 1, scale: 1, y: 0, transition },
  exit: { opacity: 0, scale: 1.01, y: -8, transition: { duration: 0.18 } },
};

function BookingModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false);

  const closeModal = () => {
    setSubmitted(false);
    onClose();
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSubmitted(false);
        onClose();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={closeModal}>
          <motion.div
            className="booking-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-title"
            initial={{ y: 50, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 25, opacity: 0, scale: 0.97 }}
            transition={transition}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button className="modal-close" onClick={closeModal} aria-label="Close booking form"><X /></button>
            {submitted ? (
              <motion.div className="success-state" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                <div className="success-icon"><Check /></div>
                <span>YOU&apos;RE ON THE LIST</span>
                <h2>Nice. Let&apos;s find your Unit.</h2>
                <p>We&apos;ll come back to you with availability and viewing times.</p>
                <button className="primary-cta" onClick={closeModal}>Done</button>
              </motion.div>
            ) : (
              <>
                <span className="eyebrow">Book your Unit</span>
                <h2 id="booking-title">Let&apos;s get you moved in.</h2>
                <p>Tell us a little about your plans. We&apos;ll match you with the right space.</p>
                <form onSubmit={handleSubmit}>
                  <label>Full name<input name="name" type="text" placeholder="Your name" autoComplete="name" required /></label>
                  <label>Email address<input name="email" type="email" placeholder="you@email.com" autoComplete="email" required /></label>
                  <div className="form-row">
                    <label>Move-in month<select name="moveIn" required defaultValue=""><option value="" disabled>Select</option><option>August</option><option>September</option><option>October</option><option>Later</option></select><ChevronDown /></label>
                    <label>Study city<select name="city" required defaultValue=""><option value="" disabled>Select</option><option>Amsterdam</option><option>Rotterdam</option><option>Utrecht</option><option>Not sure yet</option></select><ChevronDown /></label>
                  </div>
                  <button type="submit" className="primary-cta">Show me my options <ArrowUpRight size={17} /></button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function PointerGlow() {
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 600, damping: 45 });
  const springY = useSpring(y, { stiffness: 600, damping: 45 });

  useEffect(() => {
    if (reduceMotion) return;
    const move = (event: PointerEvent) => { x.set(event.clientX - 12); y.set(event.clientY - 12); };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, [reduceMotion, x, y]);

  if (reduceMotion) return null;
  return <motion.div className="pointer-glow" style={{ x: springX, y: springY }} aria-hidden="true" />;
}

export function UnitsExperience() {
  const [activePage, setActivePage] = useState(0);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [clock, setClock] = useState("");

  useEffect(() => {
    const format = () => setClock(new Intl.DateTimeFormat("en", { hour: "2-digit", minute: "2-digit" }).format(new Date()));
    format();
    const interval = window.setInterval(format, 30000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (bookingOpen) return;
      if (event.key === "ArrowDown" || event.key === "ArrowRight") setActivePage((page) => (page + 1) % pages.length);
      if (event.key === "ArrowUp" || event.key === "ArrowLeft") setActivePage((page) => (page - 1 + pages.length) % pages.length);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [bookingOpen]);

  return (
    <main className="site-stage">
      <PointerGlow />
      <motion.div className="site-shell" initial={{ opacity: 0, scale: 0.94, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ ...transition, delay: 0.05 }}>
        <header className="shell-header">
          <div onClick={() => setActivePage(0)}><Brand /></div>
          <Marquee />
          <span className="header-time">{clock}</span>
        </header>

        <SideNavigation active={activePage} onNavigate={setActivePage} onBook={() => setBookingOpen(true)} />

        <div className="content-frame">
          <AnimatePresence mode="wait" initial={false}>
            {activePage === 0 && <StudentHomes key="homes" onNavigate={setActivePage} />}
            {activePage === 1 && <OurWay key="way" />}
            {activePage === 2 && <Community key="community" />}
            {activePage === 3 && <Contact key="contact" onBook={() => setBookingOpen(true)} />}
          </AnimatePresence>
        </div>

        <div className="desktop-hint"><span>{activePage + 1} / 4</span><span>Use arrow keys</span></div>
      </motion.div>

      <MobileNavigation active={activePage} onNavigate={setActivePage} onBook={() => setBookingOpen(true)} />
      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </main>
  );
}

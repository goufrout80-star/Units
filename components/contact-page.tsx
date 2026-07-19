"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight, Clock3, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { FormEvent, useState } from "react";
import { Reveal, WordReveal } from "@/components/reveal";
import { SiteChrome } from "@/components/site-chrome";

export function ContactPage() {
  const [sent, setSent] = useState(false);
  const handleSubmit = (event: FormEvent) => { event.preventDefault(); setSent(true); };
  return (
    <SiteChrome>
      <main className="contact-page">
        <section className="contact-hero">
          <div className="contact-grid-bg" />
          <Reveal><span className="section-pill section-pill-light">04 · Contact</span></Reveal>
          <WordReveal text="Talk to a human." />
          <Reveal><p>Questions, viewings, move-in nerves or just curious? We&apos;re here, and we&apos;re good listeners.</p></Reveal>
          <div className="contact-pixel-face"><i /><i /><b /></div>
        </section>
        <section className="contact-main">
          <div className="contact-details">
            <Reveal><h2>Choose your channel.</h2></Reveal>
            <Reveal className="contact-method"><span><Mail /></span><div><small>EMAIL US</small><a href="mailto:hello@units-home.com">hello@units-home.com <ArrowUpRight /></a><p>We normally reply within one working day.</p></div></Reveal>
            <Reveal className="contact-method" delay={0.05}><span><Phone /></span><div><small>CALL US</small><a href="tel:+302100000000">+30 210 000 0000 <ArrowUpRight /></a><p>Monday to Friday, 09:00–18:00.</p></div></Reveal>
            <Reveal className="contact-method" delay={0.1}><span><MapPin /></span><div><small>COME BY</small><b>Units Parkside, Athens</b><p>Book a viewing so we can give you the full tour.</p></div></Reveal>
            <Reveal className="contact-quick"><Clock3 /><div><b>Looking for a room now?</b><p>The booking form is the fastest way to tell us what you need.</p></div><Link href="/book">Start <ArrowRight /></Link></Reveal>
          </div>
          <Reveal className="contact-form-wrap">
            {sent ? <div className="contact-sent"><MessageCircle /><h2>Message received.</h2><p>Thanks for reaching out. This demo form is ready to connect to your email or CRM endpoint before launch.</p><button onClick={() => setSent(false)}>Send another</button></div> :
              <form onSubmit={handleSubmit} className="contact-form"><span>SEND A MESSAGE</span><h2>What&apos;s on your mind?</h2><label><span>Your name</span><input required placeholder="Full name" /></label><label><span>Email address</span><input required type="email" placeholder="you@email.com" /></label><label><span>I want to ask about</span><select defaultValue=""><option value="" disabled>Choose a topic</option><option>Room availability</option><option>A viewing</option><option>My booking</option><option>Partnerships</option><option>Something else</option></select></label><label><span>Your message</span><textarea required rows={6} placeholder="Tell us everything…" /></label><button className="button button-primary">Send message <ArrowRight /></button></form>}
          </Reveal>
        </section>
      </main>
      <footer className="mini-footer"><Link href="/">Back home</Link><strong>units.</strong><span>Athens · Greece</span></footer>
    </SiteChrome>
  );
}

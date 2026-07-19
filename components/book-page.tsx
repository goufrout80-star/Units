"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, ChevronLeft, Home, Mail, MapPin, PartyPopper, Phone, User } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { FormEvent, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Logo } from "@/components/site-chrome";

const rooms = [
  { id: "kick", name: "KICK", area: "20–22 m²", price: "from €640", color: "#0879ea" },
  { id: "boost", name: "BOOST", area: "23–25 m²", price: "from €690", color: "#ffbd00" },
  { id: "flex", name: "FLEX", area: "26–29 m²", price: "from €735", color: "#ff5a00" },
  { id: "vibe", name: "VIBE", area: "30–34 m²", price: "from €790", color: "#aa4be8" },
];

const stepLabels = ["Your details", "Your Unit", "Your move", "Review"];

export function BookPage() {
  const searchParams = useSearchParams();
  const initialRoom = searchParams.get("room") ?? "boost";
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", room: initialRoom, moveDate: "", resident: "student", tour: "video", message: "", consent: false });
  const selectedRoom = useMemo(() => rooms.find((room) => room.id === form.room) ?? rooms[1], [form.room]);
  const canContinue = step === 0
    ? Boolean(form.firstName.trim() && form.lastName.trim() && form.email.trim() && form.phone.trim())
    : step === 2
      ? Boolean(form.moveDate)
      : true;

  const update = (key: keyof typeof form, value: string | boolean) => setForm((current) => ({ ...current, [key]: value }));
  const next = () => setStep((current) => Math.min(current + 1, 3));
  const previous = () => setStep((current) => Math.max(current - 1, 0));
  const submit = (event: FormEvent) => { event.preventDefault(); setSubmitted(true); window.scrollTo({ top: 0, behavior: "smooth" }); };

  if (submitted) {
    return (
      <main className="booking-success">
        <div className="booking-success-grid" />
        <Link className="booking-back" href="/"><ArrowLeft /> Home</Link>
        <motion.div initial={{ scale: 0.82, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 170, damping: 16 }}>
          <div className="success-icon"><PartyPopper /></div>
          <span>REQUEST RECEIVED</span>
          <h1>Nice one,<br />{form.firstName || "future resident"}.</h1>
          <p>We&apos;ve got your request for a {selectedRoom.name} Unit. This demo keeps your details only in this browser; connect the form to your CRM before launch.</p>
          <div className="success-card"><small>YOUR PREFERENCE</small><b>{selectedRoom.name} · {selectedRoom.area}</b><span>Move-in: {form.moveDate || "Flexible"}</span></div>
          <Link className="button button-primary" href="/homes">Keep exploring <ArrowRight /></Link>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="booking-page">
      <aside className="booking-aside">
        <Logo />
        <div className="booking-aside-copy"><span>BOOK YOUR UNIT</span><h1>Let&apos;s find your place.</h1><p>Four short steps. No commitment. A real person from our team will follow up.</p></div>
        <ol className="booking-steps">
          {stepLabels.map((label, index) => <li className={step === index ? "is-active" : step > index ? "is-complete" : ""} key={label}><span>{step > index ? <Check /> : index + 1}</span><b>{label}</b></li>)}
        </ol>
        <div className="booking-help"><span>NEED HELP?</span><a href="tel:+302100000000"><Phone /> +30 210 000 0000</a><a href="mailto:hello@units-home.com"><Mail /> hello@units-home.com</a></div>
      </aside>

      <section className="booking-form-side">
        <div className="booking-mobile-top"><Logo /><Link href="/homes"><ArrowLeft /> Exit</Link></div>
        <div className="booking-progress-mobile"><span style={{ width: `${(step + 1) * 25}%` }} /></div>
        <form onSubmit={submit}>
          <AnimatePresence mode="wait" initial={false}>
            {step === 0 && (
              <motion.div className="form-step" key="details" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
                <span className="form-kicker">STEP 01 / 04</span><h2>First, who are you?</h2><p>We&apos;ll use these details only to help with your enquiry.</p>
                <div className="field-grid">
                  <label><span>First name</span><input value={form.firstName} onChange={(event) => update("firstName", event.target.value)} placeholder="Ada" required autoFocus /><User /></label>
                  <label><span>Last name</span><input value={form.lastName} onChange={(event) => update("lastName", event.target.value)} placeholder="Lovelace" required /></label>
                  <label className="field-wide"><span>Email address</span><input type="email" value={form.email} onChange={(event) => update("email", event.target.value)} placeholder="ada@email.com" required /><Mail /></label>
                  <label className="field-wide"><span>Phone number</span><input type="tel" value={form.phone} onChange={(event) => update("phone", event.target.value)} placeholder="+30 690 000 0000" required /><Phone /></label>
                </div>
                <div className="choice-group"><span>I am a…</span><div>{[["student", "Student"], ["parent", "Parent / guardian"], ["other", "Other"]].map(([value, label]) => <button type="button" className={form.resident === value ? "is-selected" : ""} onClick={() => update("resident", value)} key={value}>{form.resident === value && <Check />}{label}</button>)}</div></div>
              </motion.div>
            )}
            {step === 1 && (
              <motion.div className="form-step" key="room" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
                <span className="form-kicker">STEP 02 / 04</span><h2>Pick your kind of space.</h2><p>You can change your mind later. This just gives us a starting point.</p>
                <div className="booking-room-options">
                  {rooms.map((room) => <button type="button" key={room.id} onClick={() => update("room", room.id)} className={form.room === room.id ? "is-selected" : ""} style={{ "--room-color": room.color } as React.CSSProperties}><span>{form.room === room.id ? <Check /> : <Home />}</span><div><b>{room.name}</b><small>{room.area}</small></div><strong>{room.price}<small> / month</small></strong></button>)}
                </div>
              </motion.div>
            )}
            {step === 2 && (
              <motion.div className="form-step" key="move" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
                <span className="form-kicker">STEP 03 / 04</span><h2>When should we expect you?</h2><p>A rough date is completely fine.</p>
                <label className="date-field"><span>Preferred move-in date</span><input type="date" value={form.moveDate} onChange={(event) => update("moveDate", event.target.value)} required /></label>
                <div className="choice-group choice-block"><span>How would you like to look around?</span><div>{[["video", "Live video tour"], ["physical", "Visit in person"], ["none", "No tour needed"]].map(([value, label]) => <button type="button" className={form.tour === value ? "is-selected" : ""} onClick={() => update("tour", value)} key={value}>{form.tour === value && <Check />}{label}</button>)}</div></div>
                <label className="textarea-field"><span>Anything else we should know? <small>Optional</small></span><textarea value={form.message} onChange={(event) => update("message", event.target.value)} placeholder="Tell us about dates, accessibility needs, questions…" rows={5} /></label>
              </motion.div>
            )}
            {step === 3 && (
              <motion.div className="form-step" key="review" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
                <span className="form-kicker">STEP 04 / 04</span><h2>Everything look right?</h2><p>Review your request, then send it our way.</p>
                <div className="review-card">
                  <div><small>CONTACT</small><b>{form.firstName} {form.lastName}</b><span>{form.email}<br />{form.phone}</span><button type="button" onClick={() => setStep(0)}>Edit</button></div>
                  <div style={{ background: selectedRoom.color }}><small>YOUR UNIT</small><b>{selectedRoom.name}</b><span>{selectedRoom.area}<br />{selectedRoom.price} / month</span><button type="button" onClick={() => setStep(1)}>Edit</button></div>
                  <div><small>YOUR MOVE</small><b>{form.moveDate || "Flexible"}</b><span>{form.tour === "video" ? "Live video tour" : form.tour === "physical" ? "Visit in person" : "No tour needed"}</span><button type="button" onClick={() => setStep(2)}>Edit</button></div>
                </div>
                <label className="consent-field"><input type="checkbox" checked={form.consent} onChange={(event) => update("consent", event.target.checked)} required /><span><i><Check /></i>I agree to be contacted about this enquiry and accept the privacy policy.</span></label>
              </motion.div>
            )}
          </AnimatePresence>
          <div className="form-navigation">
            {step > 0 ? <button type="button" className="form-back" onClick={previous}><ChevronLeft /> Back</button> : <Link className="form-back" href="/homes"><ChevronLeft /> Exit</Link>}
            {step < 3 ? <button type="button" className="form-next" onClick={next} disabled={!canContinue}>Continue <ArrowRight /></button> : <button type="submit" className="form-next">Send request <ArrowRight /></button>}
          </div>
        </form>
        <div className="booking-location"><MapPin /><span>UNITS PARKSIDE</span><small>Athens, Greece</small></div>
      </section>
    </main>
  );
}

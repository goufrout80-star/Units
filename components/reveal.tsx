"use client";

import { motion, useReducedMotion } from "motion/react";

export function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 48 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function WordReveal({ text, className = "" }: { text: string; className?: string }) {
  const words = text.split(" ");
  return (
    <motion.h2 className={className} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.45 }}>
      {words.map((word, index) => (
        <span className="word-mask" key={`${word}-${index}`}><motion.span variants={{ hidden: { y: "110%" }, show: { y: 0, transition: { duration: 0.68, delay: index * 0.045, ease: [0.22, 1, 0.36, 1] } } }}>{word}&nbsp;</motion.span></span>
      ))}
    </motion.h2>
  );
}

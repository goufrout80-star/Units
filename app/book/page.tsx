import type { Metadata } from "next";
import { Suspense } from "react";
import { BookPage } from "@/components/book-page";

export const metadata: Metadata = {
  title: "Book your Unit",
  description: "Tell us what you need and start your Units Parkside booking.",
};

export default function Page() {
  return <Suspense fallback={<main className="booking-loading">Loading your booking…</main>}><BookPage /></Suspense>;
}

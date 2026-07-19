import type { Metadata } from "next";
import { ContactPage } from "@/components/contact-page";

export const metadata: Metadata = {
  title: "Contact",
  description: "Talk to the Units team about rooms, viewings and life at Parkside.",
};

export default function Page() {
  return <ContactPage />;
}

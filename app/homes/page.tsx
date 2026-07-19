import type { Metadata } from "next";
import { HomesPage } from "@/components/homes-page";

export const metadata: Metadata = {
  title: "Student Homes",
  description: "Explore KICK, BOOST, FLEX and VIBE — four fully furnished student homes at Units Parkside, Athens.",
};

export default function Page() {
  return <HomesPage />;
}

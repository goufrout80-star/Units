import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://units-home.vercel.app"),
  title: {
    default: "Units. — Your place. Your people. Your Athens.",
    template: "%s — Units.",
  },
  description:
    "Design-led, fully furnished student homes in Athens with everything you need to live, work and belong.",
  keywords: ["student living Athens", "student homes", "student accommodation", "Units Parkside"],
  openGraph: {
    title: "Units. — Your place. Your people. Your Athens.",
    description: "Private student homes. Everything included. Community, naturally.",
    type: "website",
    images: [{ url: "/images/hero-lounge.webp", width: 1672, height: 941 }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0879ea",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="js">
      <body>{children}</body>
    </html>
  );
}

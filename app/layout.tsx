import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://units-student-living.vercel.app"),
  title: "Units. — Student living, redefined.",
  description:
    "Design-led, fully furnished student homes with everything you need to live, work and belong.",
  keywords: ["student living", "student homes", "student accommodation", "Units"],
  openGraph: {
    title: "Units. — Student living, redefined.",
    description: "Move in ready. Community included.",
    type: "website",
    images: [{ url: "/images/student-room.webp", width: 1400, height: 934 }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0877e8",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

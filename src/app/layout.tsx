import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/smooth-scroll";
import Navigation from "@/components/navigation";
import Cursor from "@/components/cursor";

const archivo = localFont({
  src: "./fonts/archivo-latin.woff2",
  variable: "--font-archivo",
  weight: "100 900",
  display: "swap",
});

const caveat = localFont({
  src: "./fonts/caveat-latin.woff2",
  variable: "--font-caveat",
  weight: "400 700",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ADYATVA LABS — The first principles studio",
  description:
    "We don't start with the solution. We start with the problem. Brand. Content. Distribution. Systems. Products. Think from first principles, build with precision, execute deliberately.",
  keywords: [
    "first principles",
    "strategy studio",
    "branding",
    "content",
    "distribution",
    "systems",
    "AI systems",
    "automation",
    "digital products",
    "PathWatch",
    "Werkz de Square",
    "Mount",
  ],
  metadataBase: new URL("https://adyatva.com"),
  openGraph: {
    title: "ADYATVA LABS — The first principles studio",
    description:
      "We don't start with the solution. We start with the problem.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0d0c0c",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${caveat.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-white text-ink">
        <SmoothScroll>
          <Cursor />
          <Navigation />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
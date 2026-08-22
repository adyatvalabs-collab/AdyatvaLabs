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
  metadataBase: new URL("https://adyatvalabs.com"),
  title: {
    default: "ADYATVA LABS — The first principles studio",
    template: "%s | ADYATVA LABS",
  },
  description:
    "We don't start with the solution. We start with the problem. Brand. Content. Distribution. Systems. Products. Think from first principles, build with precision, execute deliberately.",
  keywords: [
    "Adyatva Labs",
    "Adyatva",
    "adyatvalabs",
    "first principles studio",
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
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    title: "ADYATVA LABS — The first principles studio",
    description:
      "We don't start with the solution. We start with the problem.",
    url: "https://adyatvalabs.com",
    siteName: "ADYATVA LABS",
    type: "website",
    locale: "en_IN",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "ADYATVA LABS — The first principles studio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ADYATVA LABS — The first principles studio",
    description:
      "We don't start with the solution. We start with the problem.",
    images: ["/og-image.png"],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "ADYATVA LABS",
              alternateName: ["Adyatva Labs", "Adyatva", "adyatvalabs"],
              url: "https://adyatvalabs.com",
              logo: "https://adyatvalabs.com/og-image.png",
              description:
                "The first principles studio. Brand, content, distribution, systems and products — think from first principles, build with precision, execute deliberately.",
              email: "ceo@adyatvalabs.com",
            }),
          }}
        />
        <SmoothScroll>
          <Cursor />
          <Navigation />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
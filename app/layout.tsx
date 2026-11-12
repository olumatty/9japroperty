import type { Metadata } from "next";
import { Inter, Playfair_Display, Syne } from "next/font/google";
import "./globals.css";
import { siteUrl } from "@/app/lib/site";
import { Navbar } from "@/app/components/layout/Navbar";
import { BackToTop } from "@/app/components/layout/BackToTop";
import { WhatsAppButton } from "@/app/components/layout/WhatsAppButton";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "The9jaPropertyChic | Your Property Connection to Nigeria and the Diaspora",
    template: "%s",
  },
  description:
    "Your property connection to Nigeria and the diaspora. Buy, sell, invest and stay with The9jaPropertyChic. Local expertise, global connection.",
  applicationName: "The9jaPropertyChic",
  openGraph: {
    type: "website",
    siteName: "The9jaPropertyChic",
    title: "The9jaPropertyChic | Your Property Connection to Nigeria and the Diaspora",
    description:
      "Find property in Nigeria, invest, and get a smooth landing when you come home. Serving clients in the UK, US, Canada, Europe and Nigeria.",
    locale: "en_NG",
  },
  twitter: {
    card: "summary_large_image",
    title: "The9jaPropertyChic | Your Property Connection to Nigeria and the Diaspora",
    description:
      "Find property in Nigeria, invest, and get a smooth landing when you come home.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${playfair.variable} ${syne.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        {children}
        <BackToTop />
        <WhatsAppButton />
      </body>
    </html>
  );
}

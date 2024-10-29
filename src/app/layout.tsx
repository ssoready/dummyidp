import { Inter, Roboto_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";

import "@/pages/globals.css";
import { Footer } from "@/components/Footer";
import { Metadata } from "next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const roboto_mono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s - DummyIDP",
    default: "DummyIDP - SAML testing made easy",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${roboto_mono.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/css?f%5B%5D=switzer@400,500,600,700&amp;display=swap"
        />
      </head>
      <body>
        {children}
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}

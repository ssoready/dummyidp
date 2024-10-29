import { Inter, Roboto_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { Footer } from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { GradientBackground } from "@/components/GradientBackground";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${inter.variable} ${robotoMono.variable}`}>
      <div className="overflow-hidden">
        <GradientBackground />
        <Navbar />
        {children}
        <Footer />
        <Toaster />
      </div>
    </div>
  );
}

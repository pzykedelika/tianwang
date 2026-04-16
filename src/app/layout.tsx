import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tian Wang | Creative Director",
  description:
    "Creative Director based in Adelaide. Specializing in videography, photography, and web creation.",
  keywords: [
    "Tian Wang",
    "Creative Director",
    "Videography",
    "Photography",
    "Web Design",
    "Adelaide",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${syne.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <CustomCursor />
        <Navbar />
        <SmoothScroll>
          <main className="flex-1 w-full">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}

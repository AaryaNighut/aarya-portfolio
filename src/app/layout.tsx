import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: 1280,
};

export const metadata: Metadata = {
  title: "Aarya Subhash Nighut - AI & Full Stack Developer Portfolio",
  description: "Building intelligent applications with AI, MERN Stack and Cloud Technologies. B.E Computer Science student at LTCE, maintaining a 9+ CGPA.",
  keywords: ["Aarya Subhash Nighut", "Portfolio", "Full Stack Developer", "AI Developer", "Machine Learning", "MERN Stack", "Cloud Computing"],
  authors: [{ name: "Aarya Subhash Nighut" }],
  openGraph: {
    title: "Aarya Subhash Nighut - AI & Full Stack Developer Portfolio",
    description: "Building intelligent applications with AI, MERN Stack and Cloud Technologies.",
    url: "https://aarya-nighut.vercel.app/",
    siteName: "Aarya Subhash Nighut Portfolio",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-[#050816] text-[#f8fafc]">
        <SmoothScroll>
          <CustomCursor />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}

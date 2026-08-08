import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Accredian Enterprise",
  description: "Next-Gen Expertise for Your Enterprise",
};

import SmoothScroll from "@/components/ui/SmoothScroll";

import BackgroundLines from "@/components/ui/BackgroundLines";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden w-full max-w-[100vw] no-scrollbar">
      <body className={`${inter.className} bg-[#F9F6F0] overflow-x-hidden w-full max-w-[100vw] no-scrollbar`}>
        <SmoothScroll>
          <BackgroundLines />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}

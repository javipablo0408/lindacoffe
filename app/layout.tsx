import "./globals.css";
import type { ReactNode } from "react";
import { Cormorant_Garamond, Quicksand } from "next/font/google";
import type { Metadata } from "next";

const headingFont = Cormorant_Garamond({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
  weight: ["400", "500", "600", "700"]
});

const bodyFont = Quicksand({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
  weight: ["400", "500", "600", "700"]
});

type RootLayoutProps = {
  children: ReactNode;
};

export const metadata: Metadata = {
  title: "Linda · Specialty Coffee & Brunch",
  description:
    "Linda es una cafetería de specialty coffee y brunch artesanal con un ambiente cálido, natural y cercano."
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="es" className={`${headingFont.variable} ${bodyFont.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}


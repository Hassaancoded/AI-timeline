import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import "./globals.css";

// Elegant serif font for historical theme
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AI Time Travel Timeline",
  description: "A beautiful scroll through history from 1947 to 2025.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} font-serif antialiased bg-[#f8f4e3] text-[#3a2e26] min-h-screen`}
        style={{
          backgroundImage: 'url("/parchment-texture.jpg")',
          backgroundSize: "cover",
          backgroundRepeat: "repeat",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 py-6">{children}</div>
      </body>
    </html>
  );
}

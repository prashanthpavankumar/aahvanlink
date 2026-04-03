import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "Aahvan Link | Luxury Digital Invitations",
  description: "Create luxury digital invitations for weddings, birthdays, and every life milestone. Elegance in every click.",
  keywords: ["digital invitation", "wedding website", "online invite", "event management", "rsvp tracker", "luxury wedding", "Aahvan Link"],
  openGraph: {
    title: "Aahvan Link | Beautiful Digital Invitations",
    description: "Create luxury digital invitation websites for every celebration.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}

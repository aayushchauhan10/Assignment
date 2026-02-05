import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Simple Booking Manager",
  description: "A modern booking management system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow container mx-auto px-4 py-8">
            {children}
          </main>
          <footer className="bg-white/50 backdrop-blur-sm border-t border-gray-200 py-6">
            <div className="container mx-auto px-4 text-center text-gray-600">
              <p>&copy; 2026 Booking Manager.</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}

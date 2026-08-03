import type { Metadata } from "next";
import { Rubik, Assistant } from "next/font/google";
import "./globals.css";

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["hebrew", "latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const assistant = Assistant({
  variable: "--font-assistant",
  subsets: ["hebrew", "latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "הרב יעקב זיסהולץ | הבית החם",
  description: "מקום שקט לדבר עם הרב יעקב זיסהולץ — לשאול, להתייעץ ולקבל כוח.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl" className={`${rubik.variable} ${assistant.variable}`}>
      <body className="min-h-screen font-body antialiased">{children}</body>
    </html>
  );
}

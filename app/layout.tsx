import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Duc & Vy — Invitation",
  description: "Duc & Vy wedding invitation · 24/01/2026",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}

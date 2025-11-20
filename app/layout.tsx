import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Admin CMS",
  description: "Next.js Admin Panel",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
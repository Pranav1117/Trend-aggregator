import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Trend Aggregator",
  description: "Aggregates latest trends from platform like youtube and reddit",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

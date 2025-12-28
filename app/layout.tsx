import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Risk Game",
  description: "A simple Risk-like strategy board game",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const openSans = localFont({
  src: "./fonts/OpenSans-Light.woff",
});

export const metadata: Metadata = {
  title: "MaYi's Draft Tools",
  description: "A Toolkit for MaYi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${openSans.className}`}
      >
        {children}
      </body>
    </html>
  );
}

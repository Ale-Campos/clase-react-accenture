"use client";

import localFont from "next/font/local";
import "./globals.css";
import Link from "next/link";
import { Button } from "@mui/material";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <header className="menu-header">
          <nav className="menu-header">
            <Link href="/">
              <Button variant="text" color="black">
                Home
              </Button>
            </Link>
            <Link href="/users">
              <Button variant="text" color="black">
                Usuarios
              </Button>
            </Link>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}

import Link from "next/link";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ignacio Díaz — Software and startups",
  description: "Website about software development and startups by Ignacio Díaz",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav>
          <h1>
            <Link href={"/"}>Ignacio Díaz</Link>
          </h1>
          <ul>
            <li>
              <Link href={"/blog"}>Blog</Link>
              <Link href={"/projects"}>Projects</Link>
              <Link href={"/about"}>About</Link>
            </li>
          </ul>
        </nav>
        {children}
      </body>
    </html>
  );
}

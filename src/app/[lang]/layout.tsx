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
        <header className={"py-5"}>
          <div className={"max-w-3xl mx-auto flex flex-col md:flex-row md:justify-between items-center"}>
            <h1 className={"text-3xl font-semibold"}>
              <Link href={"/"}>Ignacio Díaz</Link>
            </h1>
            <nav className={"mt-3 md:mt-0"}>
              <ul className={"flex justify-center"}>
                <li className={"px-2"}>
                  <Link href={"/blog"}>Blog</Link>
                </li>
                <li className={"px-2"}>
                  <Link href={"/about"}>About</Link>
                </li>
                {/* <li className={"px-2"}>
                  <Link href={"/projects"}>Projects</Link>
                </li> */}
                <li className={"px-2"}>
                  <Link href={"/contact"}>Contact</Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>
        <main className={"max-w-3xl mx-auto px-3 md:px-0 py-5"}>{children}</main>
        <footer className={"flex justify-center items-center py-3"}>
          <Link className={"px-2 underline"} href={"https://github.com/ignaciodiazb"} target={"_blank"}>
            GitHub
          </Link>
          <Link className={"px-2 underline"} href={"https://www.linkedin.com/in/ignaciodiazb/"} target={"_blank"}>
            LinkedIn
          </Link>
        </footer>
      </body>
    </html>
  );
}

import Link from "next/link";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./layout.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ignacio Díaz — Software and startups",
  description: "Website about software development and startups by Ignacio Díaz",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className={"head"}>
          <div className={"head__content"}>
            <h1 className={"logo"}>
              <Link className={"logo__link"} href={"/"}>
                Ignacio Díaz
              </Link>
            </h1>
            <nav className={"nav"}>
              <ul className={"nav__list"}>
                <li className={"nav__item"}>
                  <Link className={"nav__link"} href={"/blog"}>
                    Blog
                  </Link>
                </li>
                <li className={"nav__item"}>
                  <Link className={"nav__link"} href={"/about"}>
                    About
                  </Link>
                </li>
                {/* <li className={"nav__item"}>
                  <Link className={"nav__link"} href={"/projects"}>Projects</Link>
                </li> */}
                <li className={"nav__item"}>
                  <Link className={"nav__link"} href={"/contact"}>
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>
        <main className={"main"}>{children}</main>
      </body>
    </html>
  );
}

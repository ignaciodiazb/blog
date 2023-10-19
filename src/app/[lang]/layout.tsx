import Link from "next/link";
import { Inter } from "next/font/google";
import type { Metadata } from "next";

import LocaleSwitcher from "@/components/locale-switcher";
import Providers from "./providers";
import { Locale, i18n } from "../../../i18n-config";
import { getDictionary } from "@/lib/dictionary";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ignacio Díaz — Software and startups",
  description: "Website about software development and startups by Ignacio Díaz",
};

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(lang);

  return (
    <html lang={lang}>
      <body className={inter.className}>
        <Providers>
          <header className={"py-5"}>
            <div className={"max-w-3xl mx-auto flex flex-col md:flex-row md:justify-between items-center"}>
              <h1 className={"text-3xl font-semibold"}>
                <Link href={`/${lang}`}>Ignacio Díaz</Link>
              </h1>
              <nav className={"mt-3 md:mt-0"}>
                <ul className={"flex justify-center"}>
                  <li className={"px-2"}>
                    <Link href={`/${lang}/blog`}>{dictionary.navigation.blog}</Link>
                  </li>
                  <li className={"px-2"}>
                    <Link href={`/${lang}/about`}>{dictionary.navigation.about}</Link>
                  </li>
                  {/* <li className={"px-2"}>
                  <Link href={`/${lang}/projects`}>{dictionary.navigation.projects}</Link>
                </li> */}
                  <li className={"px-2"}>
                    <Link href={`/${lang}/contact`}>{dictionary.navigation.contact}</Link>
                  </li>
                  <li className={"px-2"}>
                    <LocaleSwitcher lang={lang} />
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
        </Providers>
      </body>
    </html>
  );
}

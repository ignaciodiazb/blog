"use client";

import Link from "next/link";
import { Fragment } from "react";
import { usePathname } from "next/navigation";

import { Locale, i18n } from "../../i18n-config";

export default function LocaleSwitcher({ lang }: { lang: Locale }) {
  const pathname = usePathname();

  const redirectedPathname = (locale: Locale) => {
    if (!pathname) return "/";

    const segments = pathname.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  return (
    <Fragment>
      <ul className={"flex justify-center"}>
        {i18n.locales.map((locale) => (
          <li className={"px-1"} key={locale}>
            <Link
              className={`text-xs uppercase ${locale === lang ? "font-semibold underline" : ""}`}
              href={redirectedPathname(locale)}>
              {locale}
            </Link>
          </li>
        ))}
      </ul>
    </Fragment>
  );
}

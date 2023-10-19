import Link from "next/link";

import Date from "./date";
import type { Locale } from "../../i18n-config";

interface Props {
  date: string;
  intro: string;
  lang: Locale;
  readingTime: number;
  slug: string;
  title: string;
}

export default function Post({ date, intro, lang, slug, readingTime, title }: Props) {
  return (
    <article>
      <h3 className={"text-lg font-medium"}>
        <Link className={"underline"} href={`/${lang}/blog/${slug}`}>
          {title}
        </Link>
      </h3>
      <p className={"text-xs text-slate-600 dark:text-slate-400"}>
        <Date dateString={date} lang={lang} /> &middot; {readingTime} min read
      </p>
      <p className={""}>{intro}</p>
    </article>
  );
}

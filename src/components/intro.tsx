import Link from "next/link";

import { Locale } from "../../i18n-config";
import { getDictionary } from "@/lib/dictionary";

export default async function Intro({ lang }: { lang: Locale }) {
  const dictionary = await getDictionary(lang);

  return (
    <section className={"bg-slate-100 p-4 border-l-2 border-l-slate-400"}>
      <h2 className={"text-xl font-semibold mb-3"}>{dictionary.page.home.intro.title}</h2>
      <p>{dictionary.page.home.intro.description.p1}</p>
      <p className={"mb-3"}>{dictionary.page.home.intro.description.p2}</p>
      <Link className={"underline"} href={`/${lang}/about`}>
        {dictionary.page.home.intro.aboutLink}
      </Link>
    </section>
  );
}

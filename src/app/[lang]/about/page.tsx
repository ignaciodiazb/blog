import { Fragment } from "react";

import { Locale, i18n } from "../../../../i18n-config";
import { getDictionary } from "@/lib/dictionary";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function AboutPage({ params: { lang } }: { params: { lang: Locale } }) {
  const dictionary = await getDictionary(lang);

  return (
    <Fragment>
      <h2 className={"text-3xl font-medium mb-3"}>{dictionary.page.about.title}</h2>
      <p className={"mb-2"}>{dictionary.page.about.description.p1}</p>
      <p className={"mb-2"}>{dictionary.page.about.description.p2}</p>
      <p className={"mb-2"}>{dictionary.page.about.description.p3}</p>
      <p>{dictionary.page.about.description.p4}</p>
    </Fragment>
  );
}

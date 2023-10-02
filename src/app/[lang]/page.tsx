import { Fragment } from "react";

import Intro from "@/components/intro";
import LatestPosts from "@/components/latest-posts";
import { Locale, i18n } from "../../../i18n-config";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default function HomePage({ params: { lang } }: { params: { lang: Locale } }) {
  return (
    <Fragment>
      <Intro lang={lang} />
      <LatestPosts lang={lang} />
    </Fragment>
  );
}

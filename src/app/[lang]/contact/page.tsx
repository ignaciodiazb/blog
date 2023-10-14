import { Fragment } from "react";

import ContactForm from "@/components/contact-form";
import { Locale, i18n } from "../../../../i18n-config";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function ContactPage({ params: { lang } }: { params: { lang: Locale } }) {
  return (
    <Fragment>
      <h2 className={"text-3xl font-medium"}>Contact</h2>
      <p className={"mt-4 mb-6"}>Please fill out the form below to get in touch.</p>
      <ContactForm />
    </Fragment>
  );
}

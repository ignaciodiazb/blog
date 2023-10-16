import { Fragment } from "react";

import ContactForm from "@/components/contact-form";
import { Locale, i18n } from "../../../../i18n-config";
import { getDictionary } from "@/lib/dictionary";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function ContactPage({ params: { lang } }: { params: { lang: Locale } }) {
  const {
    page: { contact },
  } = await getDictionary(lang);

  return (
    <Fragment>
      <h2 className={"text-3xl font-medium"}>{contact.title}</h2>
      <p className={"mt-4 mb-6"}>{contact.description}</p>
      <ContactForm actions={contact.form.actions} labels={contact.form.fields} />
    </Fragment>
  );
}

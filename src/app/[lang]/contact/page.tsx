import { Fragment } from "react";

import { Locale, i18n } from "../../../../i18n-config";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function ContactPage({ params: { lang } }: { params: { lang: Locale } }) {
  return (
    <Fragment>
      <h2 className={"text-3xl font-medium"}>Contact</h2>
      <form action={""}>
        <div className={"mb-6"}>
          <label className={"text-sm font-medium text-gray-900"} htmlFor={"name"}>
            Name
          </label>
          <input
            className={"bg-gray-50 border border-gray-300 text-sm text-gray-900 rounded-md block w-full p-2.5"}
            id={"name"}
            name={"name"}
            type={"text"}
          />
        </div>
        <div className={"mb-6"}>
          <label className={"text-sm font-medium text-gray-900"} htmlFor={"email"}>
            Email
          </label>
          <input
            className={"bg-gray-50 border border-gray-300 text-sm text-gray-900 rounded-md block w-full p-2.5"}
            id={"email"}
            name={"email"}
            type={"email"}
          />
        </div>
        <div className={"mb-6"}>
          <label className={"text-sm font-medium text-gray-900"} htmlFor={"message"}>
            Message
          </label>
          <textarea
            className={"bg-gray-50 border border-gray-300 text-sm text-gray-900 rounded-md block w-full p-2.5"}
            id={"message"}
            name={"message"}
          />
        </div>
        <button
          className={
            "text-white bg-black hover:bg-slate-700 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 mr-3 text-center"
          }
          type={"submit"}>
          Submit
        </button>
        <button
          className={
            "text-black bg-white hover:bg-slate-50 border font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          }>
          Reset
        </button>
      </form>
    </Fragment>
  );
}

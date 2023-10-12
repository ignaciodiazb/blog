import { format, parseISO } from "date-fns";

import { locales } from "@/lib/date";
import type { Locale } from "../../i18n-config";

export default function Date({ dateString, lang }: { dateString: string; lang: Locale }) {
  const date = parseISO(dateString);

  return <time dateTime={dateString}>{format(date, "PPP", { locale: locales[lang] })}</time>;
}

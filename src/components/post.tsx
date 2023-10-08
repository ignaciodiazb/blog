import Link from "next/link";

interface Props {
  date: string;
  intro: string;
  lang: string;
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
      <p className={"text-xs text-slate-600"}>
        <time dateTime={date}>{date}</time> &middot; {readingTime} min read
      </p>
      <p className={""}>{intro}</p>
    </article>
  );
}

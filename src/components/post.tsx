import Link from "next/link";

interface PostProps {
  date: string;
  intro: string;
  readingTime: number;
  slug: string;
  title: string;
}

export default function Post(props: PostProps) {
  const { date, intro, slug, readingTime, title } = props;

  return (
    <article>
      <h3 className={"text-lg font-medium"}>
        <Link className={"underline"} href={`/blog/${slug}`}>
          {title}
        </Link>
      </h3>
      <p className={"text-xs text-slate-600"}>
        <time className={""} dateTime={date}>
          {date}
        </time>{" "}
        &middot; {readingTime} min read
      </p>
      <p className={""}>{intro}</p>
    </article>
  );
}

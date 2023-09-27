import Link from "next/link";

import "./post.css";

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
    <article className={"post"}>
      <h3 className={"post__title"}>
        <Link className={"post__link"} href={`/blog/${slug}`}>
          {title}
        </Link>
      </h3>
      <p className={"post__details"}>
        <time className={"post__date"} dateTime={date}>
          {date}
        </time>{" "}
        &middot; {readingTime} min read
      </p>
      <p className={"post__intro"}>{intro}</p>
    </article>
  );
}

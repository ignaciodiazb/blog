import Link from "next/link";

import Post from "@/components/post";
import { Locale } from "../../i18n-config";
import { getDictionary } from "@/lib/dictionary";
import { getPostsMetadata } from "@/lib/posts";

export default async function LatestPosts({ lang }: { lang: Locale }) {
  const dictionary = await getDictionary(lang);
  const posts = await getPostsMetadata(lang, 3);

  return (
    <section className={"my-8"}>
      <h2 className={"text-xl font-medium"}>{dictionary.page.home.latestPosts.title}</h2>
      <ul className={"my-3 divide-y divide-slate-200"} role={"list"}>
        {posts.map((post) => (
          <li className={"py-4 first:pt-0 last:pb-0"} key={post.slug}>
            <Post
              date={post.date}
              intro={post.intro}
              lang={lang}
              readingTime={post.readingTime}
              slug={post.slug}
              title={post.title}
            />
          </li>
        ))}
      </ul>
      <Link className={"underline"} href={`/${lang}/blog`}>
        {dictionary.page.home.latestPosts.blogLink}
      </Link>
    </section>
  );
}

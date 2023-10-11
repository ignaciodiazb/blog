import { Fragment } from "react";

import Post from "@/components/post";
import { Locale, i18n } from "../../../../i18n-config";
import { getPostsMetadata } from "@/lib/posts";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function BlogPage({ params: { lang } }: { params: { lang: Locale } }) {
  const posts = await getPostsMetadata(lang);

  return (
    <Fragment>
      <h2 className={"text-3xl font-medium"}>Blog</h2>
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
    </Fragment>
  );
}

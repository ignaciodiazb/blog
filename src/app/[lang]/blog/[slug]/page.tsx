import Link from "next/link";
import { Metadata } from "next";

import { Locale } from "../../../../../i18n-config";
import { getPostBySlug, getPostsParams } from "@/lib/posts";

interface Props {
  params: { lang: Locale; slug: string };
}

export const dynamicParams = false;

export async function generateMetadata({ params: { lang, slug } }: Props): Promise<Metadata> {
  const post = await getPostBySlug(slug, lang);

  return {
    title: post.title,
  };
}

export async function generateStaticParams() {
  const params = getPostsParams();

  return params;
}

export default async function BlogPostPage({ params: { lang, slug } }: Props) {
  const post = await getPostBySlug(slug, lang);

  return (
    <article className={"py-4"}>
      <h1 className={"text-2xl font-bold lg:text-3xl my-3"}>{post.title}</h1>
      <p className={"text-sm mb-3 text-slate-600"}>
        <time dateTime={post.date}>{post.date}</time> &middot; {post.readingTime} min read
      </p>
      <div className={"prose prose-stone lg:prose-lg my-3"} dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
      <Link className={"underline"} href={`/${lang}`}>
        &#8592; Back to home
      </Link>
    </article>
  );
}

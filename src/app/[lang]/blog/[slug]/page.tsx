import Link from "next/link";
import { Metadata } from "next";

import { Locale } from "../../../../../i18n-config";
import { getPostBySlug, getPostsParams } from "@/lib/posts";

interface Props {
  params: { lang: Locale; slug: string };
}

export const dynamicParams = false;

export async function generateMetadata({ params: { lang, slug } }: Props): Promise<Metadata> {
  const { meta } = await getPostBySlug(slug, lang);

  return {
    title: meta.title,
  };
}

export async function generateStaticParams() {
  const params = getPostsParams();

  return params;
}

export default async function BlogPostPage({ params: { lang, slug } }: Props) {
  const { contentHtml, meta } = await getPostBySlug(slug, lang);

  return (
    <article className={"py-4"}>
      <h1 className={"text-2xl font-bold lg:text-3xl my-3"}>{meta.title}</h1>
      <p className={"text-sm mb-3 text-slate-600 dark:text-slate-400"}>
        <time dateTime={meta.date}>{meta.date}</time> &middot; {meta.readingTime} min read
      </p>
      <div
        className={"prose prose-stone lg:prose-lg mt-3 mb-10 dark:prose-invert"}
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
      <Link className={"underline"} href={`/${lang}`}>
        &#8592; Back to home
      </Link>
    </article>
  );
}

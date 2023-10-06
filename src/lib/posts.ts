import fs from "fs";
import html from "remark-html";
import matter from "gray-matter";
import path from "path";
import { remark } from "remark";

import { Locale, i18n } from "../../i18n-config";

interface BlogPost {
  contentHtml: string;
  date: string;
  intro: string;
  readingTime: number;
  slug: string;
  title: string;
}
interface BlogPostMetadata {
  date: string;
  intro: string;
  readingTime: number;
  slug: string;
  title: string;
}
interface BlogPostParams {
  lang: string;
  slug: string;
}

const postsDirectory = path.join(process.cwd(), "src", "posts");

export async function getPostBySlug(slug: string, lang: Locale = "en"): Promise<BlogPost> {
  const fullPath = path.join(postsDirectory, lang, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const { content, data } = matter(fileContents);

  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return {
    contentHtml,
    slug,
    ...(data as { date: string; intro: string; readingTime: number; title: string }),
  };
}

export function getPostsMetadata(lang: Locale = "en"): BlogPostMetadata[] {
  const postsDirectoryWithLocale = path.join(postsDirectory, lang);
  const fileNames = fs.readdirSync(postsDirectoryWithLocale);

  const allPostsData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");

    const fullPath = path.join(postsDirectoryWithLocale, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const { data } = matter(fileContents);

    return {
      slug,
      ...(data as { date: string; intro: string; readingTime: number; title: string }),
    };
  });

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostsParams(): BlogPostParams[] {
  const params: BlogPostParams[] = [];

  i18n.locales.forEach((locale) => {
    const postsDirectoryWithLocale = path.join(postsDirectory, locale);
    const fileNames = fs.readdirSync(postsDirectoryWithLocale);
    fileNames.forEach((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      params.push({
        lang: locale,
        slug,
      });
    });
  });

  return params;
}

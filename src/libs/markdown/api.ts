import fs from "fs";
import { join } from "path";

import matter from "gray-matter";

const POSTS_DIRECTORY_NAME = "src/muuuuminn-blog/posts";

const MARKDOWN_FIELDS = ["title", "date", "slug", "content", "ogImageUrl", "coverImage"] as const;
type FieldsType = typeof MARKDOWN_FIELDS[number];

const postsDirectory = join(process.cwd(), POSTS_DIRECTORY_NAME);

const formatPost = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: { [key: string]: any },
  content: string,
  fields: FieldsType[] = [],
  slug: string,
) => {
  type Items = {
    [key in FieldsType]: string;
  };

  const items: Items = {
    content: "",
    title: "",
    slug: "",
    date: "",
    ogImageUrl: "",
    coverImage: "",
  };

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === "slug") {
      items[field] = slug;
    }
    if (field === "content") {
      items[field] = content;
    }

    if (typeof data[field] !== "undefined") {
      items[field] = data[field];
    }
  });

  return items;
};

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string, fields: FieldsType[]) {
  const fullPath = join(postsDirectory, `${slug}/index.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return formatPost(data, content, fields, slug);
}

export function getAllPosts(fields: FieldsType[]) {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}

export const getMarkdownFileByFilename = (
  filename: string,
  fields: FieldsType[],
  directoryName: string = POSTS_DIRECTORY_NAME,
) => {
  const directory = join(process.cwd(), directoryName);
  const fullPath = join(directory, `${filename}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  return formatPost(data, content, fields, filename);
};

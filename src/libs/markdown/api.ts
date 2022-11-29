import fs from "fs";
import { join } from "path";

import matter from "gray-matter";

import { MASTER_CATEGORIES } from "@/features/post/subFeatures/category/constants";
import { MASTER_TAGS } from "@/features/post/subFeatures/tag/constants";

const POSTS_DIRECTORY_NAME = "src/muuuuminn-blog/posts";

const MARKDOWN_FIELDS = [
  "title",
  "date",
  "slug",
  "content",
  "ogImageUrl",
  "coverImage",
  "description",
  "category",
  "tags",
] as const;
type FieldsType = typeof MARKDOWN_FIELDS[number];

const postsDirectory = join(process.cwd(), POSTS_DIRECTORY_NAME);

const formatPost = (
  data: { [key: string]: string },
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
    description: "",
    category: "",
    tags: "",
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

  const formattedPlainPost = formatPost(data, content, fields, slug);

  const generatedCategory = MASTER_CATEGORIES.find(
    (category) => category.id === formattedPlainPost.category,
  ) || {
    // TODO: 定数として管理する
    id: "-1",
    name: "Other",
    color: "#c9c9c",
  };
  const generatedTags = formattedPlainPost.tags.split(",").flatMap((key, index) => {
    const foundTag = MASTER_TAGS.find((tag) => tag.id === key.trim());
    // workaround: 重複したタグをmarkdown側で記述しても一意にして表示に影響がでないようにする
    // TODO: タグ名の重複削除
    return foundTag ? { ...foundTag, id: `${foundTag.id}_${index}` } : [];
  });

  return {
    ...formattedPlainPost,
    category: generatedCategory,
    tags: generatedTags,
  };
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

import { CategoryType } from "@/features/post/subFeatures/category/types";
import { TagType } from "@/features/post/subFeatures/tag/types";

export type PostType = {
  content: string;
  title: string;
  slug: string;
  date: string;
  coverImage: string;
  description: string;
  category: CategoryType;
  tags: TagType[];
};

export type PostListType = PostType[];

export type PostDetailType = {
  ogImageUrl: string;
} & PostType;

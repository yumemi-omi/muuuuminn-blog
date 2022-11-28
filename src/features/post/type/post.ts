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

export type TagType = {
  id: string;
  name: string;
  color: string;
};

export type CategoryType = {
  id: string;
  name: string;
  color: string;
};

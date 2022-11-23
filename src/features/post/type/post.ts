export type Post = {
  content: string;
  title: string;
  slug: string;
  date: string;
  coverImage: string;
};

export type PostList = Post[];

export type PostDetail = {
  ogImageUrl: string;
} & Post;

export type TagType = {
  id: string;
  name: string;
  color: string;
};

export type CategoryType = {
  id: string;
  name: string;
};

export type PostType = {
  id: string;
  category: CategoryType | null;
  tags: TagType[];
  title: string;
  description: string;
  coverImage: string;
  ogImageUrl: string;
  content?: string;
  closed: boolean;
  updatedAt: string;
};

export type PostPageInfo = {
  totalCount: number;
  endCursor?: string | null | undefined;
  hasNextPage: boolean;
  startCursor?: string | null | undefined;
  hasPreviousPage: boolean;
};

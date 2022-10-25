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

export type PostType = {
  id: string;
  category: {
    id: string;
    name: string;
  } | null;
  tags: {
    id: string;
    name: string;
    color: string;
  }[];
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

export type TagType = {
  id: string;
  name: string;
  color: string;
};

export type CategoryType = {
  id: string;
  name: string;
};

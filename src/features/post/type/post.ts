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

export type MarkdownFile = {
  data: MarkdownData;
  content: string;
};

export type MarkdownData = {
  title: string;
  excerpt: string;
  coverImage: string;
  date: string;
  ogImage: {
    url: string;
  };
};

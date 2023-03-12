import { GetStaticProps, GetStaticPropsContext } from "next";

import { MASTER_CATEGORIES } from "@/features/category/constants";
import { CategoryType } from "@/features/category/types";
import { PostListType } from "@/features/post/types";
import { MASTER_TAGS } from "@/features/tag/constants";
import { TagType } from "@/features/tag/types";
import { getAllPosts } from "@/libs/markdown/api";
import generateRssFeed from "@/libs/rss/generateRSSFeed";
import { BaseLayout } from "@/shared/components/BaseLayout";

import { Posts } from "./Posts";
import { PostsLayout } from "./PostsLayout";

import type { NextPageWithLayout } from "@/pages/_app.page";
import type { ReactElement } from "react";

type PostsPageProps = {
  posts: PostListType;
  categories: CategoryType[];
  tags: TagType[];
};

const PostsPage: NextPageWithLayout<PostsPageProps> = (props) => {
  return (
    <>
      <Posts {...props} />
    </>
  );
};

PostsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <BaseLayout>
      <PostsLayout {...page.props}>{page}</PostsLayout>
    </BaseLayout>
  );
};

export const getStaticProps: GetStaticProps = async (_context: GetStaticPropsContext) => {
  const posts = getAllPosts([
    "title",
    "date",
    "slug",
    "coverImage",
    "description",
    "category",
    "tags",
  ]);

  await generateRssFeed();

  return {
    props: {
      posts,
      categories: MASTER_CATEGORIES,
      tags: MASTER_TAGS,
    },
  };
};

export default PostsPage;

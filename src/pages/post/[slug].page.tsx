import { ReactElement } from "react";
import markdownToHtml from "zenn-markdown-html";

import { PostDetailType, PostListType } from "@/features/post/types";
import { getRelatedPosts } from "@/features/related-posts/utils/getRelatedPosts";
import { getPostBySlug, getAllPosts } from "@/libs/markdown/api";
import { BaseLayout } from "@/shared/components";

import { Post } from "./Post";
import { PostLayout } from "./PostLayout";

import type { NextPageWithLayout } from "@/pages/_app.page";

type PostPageProps = {
  post: PostDetailType;
  relatedPosts: PostListType;
};

const PostPage: NextPageWithLayout<PostPageProps> = ({ post, relatedPosts }) => {
  return <Post post={post} relatedPosts={relatedPosts} />;
};

PostPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <BaseLayout>
      <PostLayout>{page}</PostLayout>
    </BaseLayout>
  );
};

type Params = {
  params: {
    slug: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const post = getPostBySlug(params.slug, [
    "title",
    "date",
    "slug",
    "content",
    "ogImageUrl",
    "coverImage",
    "description",
    "category",
    "tags",
  ]);
  const content = await markdownToHtml(post.content || "");

  const posts = getAllPosts([
    "title",
    "date",
    "slug",
    "coverImage",
    "description",
    "category",
    "tags",
  ]);
  const relatedPosts = getRelatedPosts(posts, {
    category: post.category,
    tags: post.tags,
    tagMatchLevel: 2,
    limit: 5,
    excludeSlug: post.slug,
  });

  return {
    props: {
      post: {
        ...post,
        content,
      },
      relatedPosts,
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(["slug", "date"]);

  const paths = posts.map((post) => {
    return {
      params: {
        slug: post.slug,
      },
    };
  });

  paths.push(...paths.map((p) => ({ ...p, locale: "en" })));

  return {
    paths: paths,
    fallback: false,
  };
}

export default PostPage;

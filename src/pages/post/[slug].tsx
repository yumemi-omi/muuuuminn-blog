import { ReactElement } from "react";
import markdownToHtml from "zenn-markdown-html";

import { PostPage } from "@/_pages/post/PostPage";
import { PostPageLayout } from "@/_pages/post/PostPageLayout";
import { PostDetailType, PostListType } from "@/features/post/types";
import { getRelatedPosts } from "@/features/related-posts/utils/getRelatedPosts";
import { getPostBySlug, getAllPosts } from "@/libs/markdown/api";
import { BaseLayout } from "@/shared/components/BaseLayout";

import type { NextPageWithLayout } from "@/pages/_app";

type PostProps = {
  post: PostDetailType;
  relatedPosts: PostListType;
};

const Post: NextPageWithLayout<PostProps> = ({ post, relatedPosts }) => {
  return <PostPage post={post} relatedPosts={relatedPosts} />;
};

Post.getLayout = function getLayout(page: ReactElement) {
  return (
    <BaseLayout>
      <PostPageLayout>{page}</PostPageLayout>
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

export default Post;

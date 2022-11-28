import { ReactElement } from "react";
import markdownToHtml from "zenn-markdown-html";

import { PostPage } from "@/_pages/post/PostPage";
import { PostPageLayout } from "@/_pages/post/PostPageLayout";
import { PostDetailType } from "@/features/post/type/post";
import { getPostBySlug, getAllPosts } from "@/libs/markdown/api";
import { BasicLayout } from "@/shared/components/BasicLayout";

import type { NextPageWithLayout } from "@/pages/_app";

type PostProps = {
  post: PostDetailType;
};

const Post: NextPageWithLayout<PostProps> = ({ post }) => {
  return <PostPage post={post} />;
};

Post.getLayout = function getLayout(page: ReactElement) {
  return (
    <BasicLayout>
      <PostPageLayout>{page}</PostPageLayout>
    </BasicLayout>
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

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(["slug"]);

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

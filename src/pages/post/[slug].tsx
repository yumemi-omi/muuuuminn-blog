import { ReactElement } from "react";

import { PostPage } from "@/features/post/components/PostPage";
import { PostPageLayout } from "@/features/post/components/PostPageLayout";
import { BasicLayout } from "@/shared/components/BasicLayout";
import { getPostBySlug, getAllPosts } from "@/shared/libs/markdown/api";
import markdownToHtml from "@/shared/libs/markdown/markdownToHtml";

import { NextPageWithLayout } from "../_app";

type Props = {
  post: any;
};

const Post: NextPageWithLayout<Props> = ({ post }) => {
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
    "author",
    "content",
    "ogImage",
    "coverImage",
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

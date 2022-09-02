import Head from "next/head";
import { useRouter } from "next/router";
import { ReactElement } from "react";

import { BasicLayout } from "@/shared/components/BasicLayout";
import { getPostBySlug, getAllPosts } from "@/shared/libs/markdown/api";
import markdownToHtml from "@/shared/libs/markdown/markdownToHtml";

import { NextPageWithLayout } from "../_app";

type Props = {
  post: any;
};

const Post: NextPageWithLayout<Props> = ({ post }) => {
  const router = useRouter();

  return (
    <div>
      {router.isFallback ? (
        <p>Loading…</p>
      ) : (
        <>
          <article>
            <Head>
              <title>{post.title} | detail</title>
              <meta property="og:image" content={post.ogImage.url} />
            </Head>
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </article>
        </>
      )}
    </div>
  );
};

Post.getLayout = function getLayout(page: ReactElement) {
  return <BasicLayout>{page}</BasicLayout>;
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

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}

export default Post;

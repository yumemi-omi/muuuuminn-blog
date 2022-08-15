import Head from "next/head";
import Link from "next/link";

import { useTranslation } from "@/shared/hooks/useTranslation";
import { getAllPosts } from "@/shared/libs/markdown/api";

type Props = {
  posts: any[];
};

export default function Index({ posts }: Props) {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{t.SITE_NAME}</title>
      </Head>
      {posts.map((post) => (
        <div key={post.slug}>
          <Link as={`/post/${post.slug}`} href="/post/[slug]">
            <a className="hover:underline">{post.title}</a>
          </Link>
        </div>
      ))}
      <div
        dangerouslySetInnerHTML={{
          __html: posts[0].excerpt as string,
        }}
      />
    </>
  );
}

export const getStaticProps = async () => {
  const posts = getAllPosts(["title", "date", "slug", "author", "coverImage", "excerpt"]);

  return {
    props: { posts },
  };
};

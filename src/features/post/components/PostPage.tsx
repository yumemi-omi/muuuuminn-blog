import Head from "next/head";
import { useRouter } from "next/router";
import { FC } from "react";

type Props = {
  post: any;
};

export const PostPage: FC<Props> = ({ post }) => {
  const router = useRouter();
  const title = `${post.title} | detail`;

  return (
    <div>
      {router.isFallback ? (
        <p>Loading…</p>
      ) : (
        <>
          <article>
            <Head>
              <title>{title}</title>
              <meta property="og:image" content={post.ogImage.url} />
            </Head>
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </article>
        </>
      )}
    </div>
  );
};

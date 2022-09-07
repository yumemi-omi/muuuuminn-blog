import Head from "next/head";
import { FC } from "react";

import { PostCardList } from "@/features/post/components/PostCardList";
import { PostList } from "@/features/post/type/post";
import { useTranslation } from "@/libs/i18n";

type Props = {
  posts: PostList;
};

export const HomePage: FC<Props> = ({ posts }) => {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{t.SITE_NAME}</title>
      </Head>
      <PostCardList posts={posts} />
    </>
  );
};

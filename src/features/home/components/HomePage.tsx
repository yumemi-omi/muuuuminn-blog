import Head from "next/head";
import { FC } from "react";

import { useTranslation } from "@/libs/i18n";
import { PostList } from "@/shared/type/post";

import { PostCardList } from "./PostCardList";

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

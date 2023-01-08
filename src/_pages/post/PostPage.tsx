import { FC } from "react";

import { AdSense } from "@/features/advertise/components/AdSense";
import { PostDetail } from "@/features/post/components/PostDetail";
import { PostDetailType } from "@/features/post/types";
import { useTranslation } from "@/libs/i18n";
import { ArticleSeo, ArticleSeoProps } from "@/shared/components/Seo";

type PostPageProps = {
  post: PostDetailType;
};
export const PostPage: FC<PostPageProps> = ({ post }) => {
  const { t } = useTranslation();

  const seo: ArticleSeoProps = {
    title: post.title,
    description: post.description,
    path: `/post/${post.slug}`,
    ogImage: {
      url: post.ogImageUrl,
      alt: `${post.title}${t.ALT.THUMBNAIL_OF}`,
    },
    articleOgp: {
      publishedTime: post.date,
      section: post.category.name,
      tags: post.tags.map((tag) => tag.name),
    },
  };

  return (
    <>
      <ArticleSeo {...seo} />
      <PostDetail
        overflowX={"hidden"}
        marginY={{ base: 2 }}
        // maxWidth={"640px"}
        marginX={"auto"}
        postDetail={post}
      />
      <AdSense />
    </>
  );
};

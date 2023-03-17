import { FC } from "react";

import { AdSense } from "@/features/advertise/components";
import { PostDetail } from "@/features/post/components";
import { PostDetailType, PostListType } from "@/features/post/types";
import { RelatedPostsArea } from "@/features/related-posts/components";
import { Stack } from "@/libs/chakra";
import { useTranslation } from "@/libs/i18n";
import {
  ArticleSeo,
  ArticleSeoProps,
  ArticleJsonLd,
  ArticleJsonLdProps,
} from "@/shared/components";

type PostProps = {
  post: PostDetailType;
  relatedPosts: PostListType;
};
export const Post: FC<PostProps> = ({ post, relatedPosts }) => {
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

  const jsonLd: ArticleJsonLdProps = {
    title: post.title,
    description: post.description,
    url: `/post/${post.slug}`,
    images: [post.ogImageUrl],
    datePublished: post.date,
    dateModified: post.date,
  };

  return (
    <>
      <ArticleSeo {...seo} />
      <ArticleJsonLd {...jsonLd} />
      <Stack
        marginX={"auto"}
        marginY={{ base: 2 }}
        minWidth={"300px"}
        overflowX={"hidden"}
        spacing={10}
      >
        <PostDetail postDetail={post} />
        {relatedPosts.length !== 0 && <RelatedPostsArea relatedPosts={relatedPosts} />}
      </Stack>
      <div style={{ display: "none" }}>
        <AdSense />
      </div>
    </>
  );
};

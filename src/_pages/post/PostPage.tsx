import { FC } from "react";

import { AdSense } from "@/features/advertise/components/AdSense";
import { PostDetail } from "@/features/post/components/PostDetail";
import { PostDetailType, PostListType } from "@/features/post/types";
import { RelatedPostsArea } from "@/features/related-posts/components/RelatedPostsArea";
import { Stack } from "@/libs/chakra";
import { useTranslation } from "@/libs/i18n";
import { ArticleJsonLd, ArticleJsonLdProps } from "@/shared/components/JsonLd";
import { ArticleSeo, ArticleSeoProps } from "@/shared/components/Seo";

type PostPageProps = {
  post: PostDetailType;
  relatedPosts: PostListType;
};
export const PostPage: FC<PostPageProps> = ({ post, relatedPosts }) => {
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
        spacing={10}
        minWidth={"300px"}
        overflowX={"hidden"}
        marginY={{ base: 2 }}
        marginX={"auto"}
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

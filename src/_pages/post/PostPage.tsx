import { FC } from "react";

import { AdSense } from "@/features/advertise/components/AdSense";
import { PostDetail } from "@/features/post/components/PostDetail";
import { PostDetailType, PostListType } from "@/features/post/types";
import { RelatedPostsArea } from "@/features/related-posts/components/RelatedPostsArea";
import { Spacer, Stack } from "@/libs/chakra";
import { useTranslation } from "@/libs/i18n";
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

  return (
    <>
      <ArticleSeo {...seo} />
      <Stack spacing={10}>
        <PostDetail overflowX={"hidden"} marginY={{ base: 2 }} marginX={"auto"} postDetail={post} />
        {relatedPosts.length !== 0 && <RelatedPostsArea relatedPosts={relatedPosts} />}
      </Stack>
      <div style={{ display: "none" }}>
        <AdSense />
      </div>
    </>
  );
};

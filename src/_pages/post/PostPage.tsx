import { FC } from "react";

import { PostDetail } from "@/features/post/components/PostDetail";
import { PostDetailType } from "@/features/post/types";
import { ArticleSeo, ArticleSeoProps } from "@/shared/components/Seo";

type PostPageProps = {
  post: PostDetailType;
};
export const PostPage: FC<PostPageProps> = ({ post }) => {
  const seo: ArticleSeoProps = {
    title: post.title,
    description: post.description,
    path: `/post/${post.slug}`,
    ogImage: {
      url: post.ogImageUrl,
      alt: `${post.title}のサムネイル`,
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
    </>
  );
};

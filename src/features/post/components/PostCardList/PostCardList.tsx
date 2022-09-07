import { FC } from "react";

import { PostCard } from "@/features/post/components/PostCard";
import { PostList } from "@/features/post/type/post";
import { Box, BoxProps } from "@/libs/chakra";
import { ChakraNextLink } from "@/libs/next";

type PostCardListProps = {
  posts: PostList;
} & BoxProps;

export const PostCardList: FC<PostCardListProps> = ({ posts }) => {
  return (
    <Box my={10}>
      {posts.map((post) => (
        <ChakraNextLink key={post.slug} href={`/post/${post.slug}`}>
          <PostCard post={post} />
        </ChakraNextLink>
      ))}
    </Box>
  );
};

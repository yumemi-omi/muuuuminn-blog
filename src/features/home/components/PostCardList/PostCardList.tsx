import { FC } from "react";

import { Box, BoxProps } from "@/libs/chakra";
import { ChakraNextLink } from "@/libs/next";
import { PostList } from "@/shared/type/post";

import { PostCard } from "../PostCard/PostCard";

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

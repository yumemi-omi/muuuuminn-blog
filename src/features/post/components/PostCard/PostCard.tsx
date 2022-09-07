import { FC } from "react";

import { Post } from "@/features/post/type/post";
import { Box, BoxProps } from "@/libs/chakra";
import { ChakraNextImage } from "@/libs/next";

type PostCardProps = {
  post: Post;
} & BoxProps;

export const PostCard: FC<PostCardProps> = ({ post }) => {
  return (
    <Box>
      <ChakraNextImage width={100} height={100} src={post.coverImage} />
      {post.title}
      {post.date}
    </Box>
  );
};

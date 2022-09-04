import { FC } from "react";

import { Box, BoxProps } from "@/libs/chakra";
import { ChakraNextImage } from "@/libs/next";
import { Post } from "@/shared/type/post";

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

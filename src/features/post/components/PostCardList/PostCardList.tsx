import { FC } from "react";

import { PostCard } from "@/features/post/components/PostCard";
import { PostList } from "@/features/post/type/post";
import { Box, BoxProps } from "@/libs/chakra";

type PostCardListProps = {
  posts: PostList;
} & BoxProps;

export const PostCardList: FC<PostCardListProps> = ({ posts }) => {
  return (
    <Box my={10}>
      {posts.map((post) => (
        <PostCard post={post} key={post.slug} />
      ))}
    </Box>
  );
};

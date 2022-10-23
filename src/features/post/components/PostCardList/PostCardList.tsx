import { FC } from "react";

import { PostCard } from "@/features/post/components/PostCard";
import { PostType } from "@/features/post/type/post";
import { Grid, GridItem } from "@/libs/chakra";

type PostCardListProps = {
  posts: PostType[];
};

export const PostCardList: FC<PostCardListProps> = ({ posts }) => {
  return (
    <Grid gridGap={"4"} templateColumns={"repeat(auto-fit, minmax(320px, 1fr))"}>
      {posts.map((post) => {
        return (
          <GridItem key={post.id}>
            <PostCard post={post} />
          </GridItem>
        );
      })}
    </Grid>
  );
};

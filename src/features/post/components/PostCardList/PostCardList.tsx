import { FC } from "react";

import { PostCard } from "@/features/post/components/PostCard";
import { PostList } from "@/features/post/type/post";
import { Grid, GridItem } from "@/libs/chakra";

type PostCardListProps = {
  posts: PostList;
};

export const PostCardList: FC<PostCardListProps> = ({ posts }) => {
  return (
    <Grid gridGap={"4"} templateColumns={"repeat(auto-fit, minmax(320px, 1fr))"}>
      {posts.map((post) => {
        return (
          <GridItem key={post.slug}>
            <PostCard post={post} />
          </GridItem>
        );
      })}
    </Grid>
  );
};

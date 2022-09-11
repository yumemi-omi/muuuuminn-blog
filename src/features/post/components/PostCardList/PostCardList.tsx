import { Container, Divider, GridItem } from "@chakra-ui/react";
import { FC } from "react";

import { PostCard } from "@/features/post/components/PostCard";
import { PostList } from "@/features/post/type/post";
import { Box, BoxProps, Flex, Grid } from "@/libs/chakra";

import { FeaturedPostCard } from "../FeaturedPostCard";

type PostCardListProps = {
  posts: PostList;
} & BoxProps;

export const PostCardList: FC<PostCardListProps> = ({ posts }) => {
  return (
    <Grid
      gridGap={"4"}
      templateColumns={"1fr 1fr"}
      templateRows={"1fr 1fr"}
      templateAreas={`
      'topic subTopic'
      'others others'
    `}
    >
      <GridItem area={"topic"}>
        {/* TODO: Featured post cardをつくる */}
        <FeaturedPostCard post={posts[0]} />
      </GridItem>
      <GridItem area={"subTopic"}>
        <PostCard post={posts[1]} />
        <PostCard post={posts[2]} />
        <PostCard post={posts[3]} />
      </GridItem>
      <GridItem area={"others"}>
        <Divider my={"4"} />
        <Flex wrap={"wrap"} gap={"4"} justify={"space-between"}>
          {posts.map((post, index) => {
            return (
              <Box maxWidth={"400px"} key={post.slug}>
                <PostCard post={post} />
              </Box>
            );
          })}
        </Flex>
      </GridItem>
    </Grid>
  );
};

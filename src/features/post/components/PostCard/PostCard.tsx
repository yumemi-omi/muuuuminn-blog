import { LinkBox, LinkBoxProps } from "@chakra-ui/react";
import { FC } from "react";

import { PostType } from "@/features/post/type/post";
import { Flex, HStack, Stack, Text, VStack } from "@/libs/chakra";

import { Category } from "../Category";
import { PostDate } from "../PostDate";
import { PostThumbnail } from "../PostThumbnail";
import { PostTitle } from "../PostTitle";
import { TagList } from "../TagList";

type PostCardProps = {
  post: PostType;
} & LinkBoxProps;

export const PostCard: FC<PostCardProps> = ({ post, ...rest }) => {
  return (
    <LinkBox py={"2"} as={"article"} {...rest}>
      <VStack align={"start"}>
        <HStack>
          {post.category && <Category asLink category={post.category} />}
          <PostDate fontSize={"sm"} date={post.updatedAt} />
        </HStack>
        <HStack w={"full"}>
          <PostThumbnail flexShrink={0} post={post} />
          <Stack h={"100px"} justifyContent="space-between" flex={1} py={"2"}>
            <PostTitle post={post} />
            {/* TODO: Intersection observer */}
            <Flex overflow={"scroll"} gap={"2"} wrap={"nowrap"}>
              <TagList maxWidth={"100px"} tags={post.tags} />
            </Flex>
          </Stack>
        </HStack>
        <Text noOfLines={2}>{post.description}</Text>
      </VStack>
    </LinkBox>
  );
};

import { LinkBox, LinkBoxProps } from "@chakra-ui/react";
import { FC } from "react";

import { PostType } from "@/features/post/type/post";
import { HStack, Stack, Text, VStack } from "@/libs/chakra";
import { MotionChakraDiv } from "@/libs/framerMotion";

import { Category } from "../Category";
import { PostDate } from "../PostDate";
import { PostThumbnail } from "../PostThumbnail";
import { PostTitleLink } from "../PostTitleLink";
import { TagList } from "../TagList";

type PostCardProps = {
  post: PostType;
} & LinkBoxProps;

export const PostCard: FC<PostCardProps> = ({ post, ...rest }) => {
  return (
    <LinkBox py={"2"} as={"article"} {...rest}>
      <VStack align={"start"}>
        <MotionChakraDiv layoutId={`category_${post.id}`}>
          <HStack spacing={4}>
            {post.category && <Category asLink category={post.category} />}
            <PostDate fontSize={"sm"} date={post.updatedAt} />
          </HStack>
        </MotionChakraDiv>
        <HStack w={"full"}>
          <MotionChakraDiv layoutId={`thumbnail_${post.id}`}>
            <PostThumbnail flexShrink={0} post={post} imageQuality={50} />
          </MotionChakraDiv>
          <Stack h={"100px"} justifyContent="space-between" flex={1} py={"2"}>
            <MotionChakraDiv layoutId={`title_${post.id}`}>
              <PostTitleLink post={post} />
            </MotionChakraDiv>
            <MotionChakraDiv layoutId={`tag-list_${post.id}`}>
              <TagList tags={post.tags} />
            </MotionChakraDiv>
          </Stack>
        </HStack>
        <Text noOfLines={2}>{post.description}</Text>
      </VStack>
    </LinkBox>
  );
};

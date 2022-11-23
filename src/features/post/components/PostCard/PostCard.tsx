import { LinkBox, LinkBoxProps } from "@chakra-ui/react";
import { FC, memo } from "react";

import { PostType } from "@/features/post/type/post";
import { HStack, Stack, Text, VStack } from "@/libs/chakra";

import { Category } from "../Category";
import { PostDate } from "../PostDate";
import { PostThumbnail } from "../PostThumbnail";
import { PostTitleLink } from "../PostTitleLink";
import { TagList } from "../TagList";

type PostCardProps = {
  post: PostType;
} & LinkBoxProps;

const _PostCard: FC<PostCardProps> = ({ post, ...rest }) => {
  return (
    <LinkBox py={"2"} as={"article"} overflow={"hidden"} {...rest}>
      <VStack align={"start"}>
        <HStack spacing={4}>
          {post.category && <Category asLink category={post.category} />}
          <PostDate fontSize={"sm"} date={post.updatedAt} />
        </HStack>
        <HStack w={"full"}>
          <PostThumbnail flexShrink={0} post={post} imageQuality={50} />
          <Stack h={"100px"} justifyContent="space-between" py={"2"} overflow={"hidden"}>
            <PostTitleLink post={post} />
            {post.id === "I_kwDOIKnT4s5Un5jv" && <TagList tags={post.tags} />}
          </Stack>
        </HStack>
        <Text noOfLines={2}>{post.description}</Text>
      </VStack>
    </LinkBox>
  );
};

export const PostCard = memo(_PostCard);

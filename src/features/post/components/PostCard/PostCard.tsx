import { LinkBox, LinkBoxProps } from "@chakra-ui/react";
import { FC, memo } from "react";

import { PostType } from "@/features/post/type/post";
import { HStack, Stack, Text, VStack } from "@/libs/chakra";

import { Category } from "../Category";
import { PostDate } from "../PostDate";
import { PostThumbnail } from "../PostThumbnail";
import { PostTitleLink } from "../PostTitleLink";
import { NoWrapTagList } from "../TagList";

type PostCardProps = {
  post: PostType;
} & LinkBoxProps;

const _PostCard: FC<PostCardProps> = ({ post, ...rest }) => {
  console.log(post);
  return (
    <LinkBox py={"2"} as={"article"} overflow={"hidden"} {...rest}>
      <VStack align={"start"}>
        <HStack spacing={4}>
          {post.category && <Category asLink category={post.category} />}
          <PostDate fontSize={"sm"} date={post.date} />
        </HStack>
        <HStack w={"full"}>
          <PostThumbnail flexShrink={0} src={post.coverImage} imageQuality={50} />
          <Stack h={"100px"} justifyContent="space-between" py={"2"} overflow={"hidden"}>
            <PostTitleLink post={post} />
            <NoWrapTagList tags={post.tags} />
          </Stack>
        </HStack>
        <Text noOfLines={2}>{post.description}</Text>
      </VStack>
    </LinkBox>
  );
};

export const PostCard = memo(_PostCard);

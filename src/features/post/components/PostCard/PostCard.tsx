import { LinkBox, LinkBoxProps } from "@chakra-ui/react";
import { FC, memo } from "react";

import { PostDate } from "@/features/post/components/PostDate";
import { PostThumbnail } from "@/features/post/components/PostThumbnail";
import { PostTitleLink } from "@/features/post/components/PostTitleLink";
import { Category } from "@/features/post/subFeatures/category/components/Category";
import { NoWrapTagList } from "@/features/post/subFeatures/tag/components/TagList";
import { PostType } from "@/features/post/types";
import { HStack, Stack, Text, VStack } from "@/libs/chakra";

type PostCardProps = {
  post: PostType;
} & LinkBoxProps;

const _PostCard: FC<PostCardProps> = ({ post, ...rest }) => {
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

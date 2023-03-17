import { LinkBox, LinkBoxProps } from "@chakra-ui/react";
import { FC, memo } from "react";

import { Category } from "@/features/category/components";
import { PostDate, PostThumbnail, PostTitleLink } from "@/features/post/components";
import { PostType } from "@/features/post/types";
import { NoWrapTagList } from "@/features/tag/components";
import { HStack, Text, VStack } from "@/libs/chakra";
import { useTranslation } from "@/libs/i18n";

type PostCardProps = {
  post: PostType;
} & LinkBoxProps;

const _PostCard: FC<PostCardProps> = ({ post, ...rest }) => {
  const { t } = useTranslation();
  const alt = `${post.title}${t.ALT.THUMBNAIL_OF}`;
  return (
    <LinkBox as={"article"} overflowX={"hidden"} py={"4"} {...rest}>
      <VStack align={"start"}>
        <HStack spacing={4}>
          {post.category && <Category asLink category={post.category} />}
          <PostDate date={post.date} fontSize={"sm"} />
        </HStack>
        <HStack flexShrink={0} spacing={4}>
          <PostThumbnail alt={alt} flexShrink={0} imageQuality={50} src={post.coverImage} />
          <VStack alignItems={"flex-start"}>
            <PostTitleLink post={post} />
            <NoWrapTagList tagProps={{ shallow: true, replace: true }} tags={post.tags} />
          </VStack>
        </HStack>
        <Text noOfLines={2}>{post.description}</Text>
      </VStack>
    </LinkBox>
  );
};

export const PostCard = memo(_PostCard);

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
    <LinkBox as={"article"} py={"4"} overflowX={"hidden"} {...rest}>
      <VStack align={"start"}>
        <HStack spacing={4}>
          {post.category && <Category asLink category={post.category} />}
          <PostDate fontSize={"sm"} date={post.date} />
        </HStack>
        <HStack flexShrink={0} spacing={4}>
          <PostThumbnail flexShrink={0} src={post.coverImage} imageQuality={50} alt={alt} />
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

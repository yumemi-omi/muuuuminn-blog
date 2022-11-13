import { FC } from "react";

import { Category } from "@/features/post/components/Category";
import { PostDate } from "@/features/post/components/PostDate";
import { PostThumbnail } from "@/features/post/components/PostThumbnail";
import { PostTitle } from "@/features/post/components/PostTitle";
import { TagList } from "@/features/post/components/TagList";
import { PostType } from "@/features/post/type/post";
import { Box, BoxProps, Flex, HStack, Stack, VStack } from "@/libs/chakra";
import { RichMarkdownContent } from "@/shared/components/RichMarkdownContent";

type PostDetailProps = {
  postDetail: PostType;
} & BoxProps;

export const PostDetail: FC<PostDetailProps> = ({ postDetail, ...rest }) => {
  return (
    <Box {...rest}>
      <VStack align={"start"}>
        <HStack>
          {postDetail.category && <Category asLink category={postDetail.category} />}
          <PostDate fontSize={"sm"} date={postDetail.updatedAt} />
        </HStack>
        <HStack w={"full"}>
          <PostThumbnail flexShrink={0} post={postDetail} />
          <Stack h={"100px"} justifyContent="space-between" flex={1} py={"2"}>
            <PostTitle post={postDetail} />
            {/* TODO: Intersection observer */}
            <Flex overflow={"scroll"} gap={"2"} wrap={"nowrap"}>
              <TagList maxWidth={"100px"} tags={postDetail.tags} />
            </Flex>
          </Stack>
        </HStack>
      </VStack>
      {postDetail.content && <RichMarkdownContent html={postDetail.content} />}
    </Box>
  );
};

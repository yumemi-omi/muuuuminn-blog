import { FC } from "react";

import { PostDate } from "@/features/post/components/PostDate";
import { PostThumbnail } from "@/features/post/components/PostThumbnail";
import { Category } from "@/features/post/subFeatures/category/components/Category";
import { WrapTagList } from "@/features/post/subFeatures/tag/components/TagList";
import { PostDetailType } from "@/features/post/types";
import { Box, BoxProps, HStack, VStack } from "@/libs/chakra";
import { Text } from "@/libs/chakra";
import { RichMarkdownContent } from "@/shared/components/RichMarkdownContent";

type PostDetailProps = {
  postDetail: PostDetailType;
} & BoxProps;

export const PostDetail: FC<PostDetailProps> = ({ postDetail, ...rest }) => {
  return (
    <Box {...rest}>
      <VStack>
        <HStack alignSelf={"flex-start"} spacing={4}>
          {postDetail.category && <Category asLink category={postDetail.category} />}
          <PostDate fontSize={"sm"} date={postDetail.date} />
        </HStack>
        <VStack>
          <PostThumbnail
            src={postDetail.coverImage}
            imageQuality={75}
            sizeSet={{
              width: "200px",
              height: "200px",
            }}
          />
          <Text fontSize={"lg"} fontWeight={"bold"}>
            {postDetail.title}
          </Text>
          <WrapTagList
            tags={postDetail.tags}
            flexWrap={"wrap"}
            width={"full"}
            justifyContent={"center"}
          />
        </VStack>
      </VStack>
      {postDetail.content && (
        <Box marginTop={4}>
          <RichMarkdownContent html={postDetail.content} />
        </Box>
      )}
    </Box>
  );
};

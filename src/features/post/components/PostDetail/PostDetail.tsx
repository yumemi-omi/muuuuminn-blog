import { FC } from "react";

import { Category } from "@/features/post/components/Category";
import { PostDate } from "@/features/post/components/PostDate";
import { PostThumbnail } from "@/features/post/components/PostThumbnail";
import { TagList } from "@/features/post/components/TagList";
import { PostType } from "@/features/post/type/post";
import { Box, BoxProps, HStack, Stack, VStack } from "@/libs/chakra";
import { Text } from "@/libs/chakra";
import { RichMarkdownContent } from "@/shared/components/RichMarkdownContent";

type PostDetailProps = {
  postDetail: PostType;
} & BoxProps;

export const PostDetail: FC<PostDetailProps> = ({ postDetail, ...rest }) => {
  return (
    <Box overflowX={"hidden"} {...rest}>
      <VStack align={"start"}>
        <HStack spacing={4}>
          {postDetail.category && <Category asLink category={postDetail.category} />}
          <PostDate fontSize={"sm"} date={postDetail.updatedAt} />
        </HStack>
        <VStack>
          <PostThumbnail
            post={postDetail}
            imageQuality={75}
            sizeSet={{
              width: "200px",
              height: "200px",
            }}
          />
          <Text noOfLines={3} fontSize={"lg"} fontWeight={"bold"}>
            {postDetail.title}
          </Text>
          <TagList tags={postDetail.tags} flexWrap={"wrap"} />
        </VStack>
      </VStack>
      {postDetail.content && <RichMarkdownContent html={postDetail.content} />}
    </Box>
  );
};

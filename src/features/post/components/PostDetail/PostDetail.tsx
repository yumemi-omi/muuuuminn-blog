import { FC } from "react";

import { Category } from "@/features/post/components/Category";
import { PostDate } from "@/features/post/components/PostDate";
import { PostThumbnail } from "@/features/post/components/PostThumbnail";
import { TagList } from "@/features/post/components/TagList";
import { PostType } from "@/features/post/type/post";
import { Box, BoxProps, HStack, VStack } from "@/libs/chakra";
import { Text } from "@/libs/chakra";
import { MotionChakraDiv } from "@/libs/framerMotion";
import { RichMarkdownContent } from "@/shared/components/RichMarkdownContent";

type PostDetailProps = {
  postDetail: PostType;
} & BoxProps;

export const PostDetail: FC<PostDetailProps> = ({ postDetail, ...rest }) => {
  return (
    <Box overflowX={"hidden"} {...rest}>
      <VStack align={"start"}>
        <MotionChakraDiv layoutId={`category_${postDetail.id}`}>
          <HStack spacing={4}>
            {postDetail.category && <Category asLink category={postDetail.category} />}
            <PostDate fontSize={"sm"} date={postDetail.updatedAt} />
          </HStack>
        </MotionChakraDiv>
        <VStack width={"full"}>
          <MotionChakraDiv layoutId={`thumbnail_${postDetail.id}`}>
            <PostThumbnail
              post={postDetail}
              imageQuality={75}
              sizeSet={{
                width: "200px",
                height: "200px",
              }}
            />
          </MotionChakraDiv>
          <MotionChakraDiv layoutId={`title_${postDetail.id}`}>
            <Text noOfLines={3} fontSize={"lg"} fontWeight={"bold"}>
              {postDetail.title}
            </Text>
          </MotionChakraDiv>
          <MotionChakraDiv layoutId={`tag-list_${postDetail.id}`}>
            <TagList tags={postDetail.tags} flexWrap={"wrap"} />
          </MotionChakraDiv>
        </VStack>
      </VStack>
      {postDetail.content && <RichMarkdownContent html={postDetail.content} />}
    </Box>
  );
};

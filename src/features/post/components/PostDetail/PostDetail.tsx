import { useBreakpointValue } from "@chakra-ui/react";
import { FC } from "react";

import { PostDate } from "@/features/post/components/PostDate";
import { PostThumbnail } from "@/features/post/components/PostThumbnail";
import { Category } from "@/features/post/subFeatures/category/components/Category";
import { WrapTagList } from "@/features/post/subFeatures/tag/components/TagList";
import { PostDetailType } from "@/features/post/types";
import { Box, BoxProps, HStack, VStack } from "@/libs/chakra";
import { Text } from "@/libs/chakra";
import { useTranslation } from "@/libs/i18n";
import { RichMarkdownContent } from "@/shared/components/RichMarkdownContent";

type PostDetailProps = {
  postDetail: PostDetailType;
} & BoxProps;

export const PostDetail: FC<PostDetailProps> = ({ postDetail, ...rest }) => {
  const { t } = useTranslation();
  const sizeSet = useBreakpointValue({
    base: {
      width: "300px",
      height: "168px",
    },
    md: {
      width: "400px",
      height: "225px",
    },
  });

  const alt = `${postDetail.title}${t.ALT.THUMBNAIL_OF}`;
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
            ratio={{ base: 1.85 / 1, md: 16 / 9 }}
            sizeSet={sizeSet}
            enableBlur
            alt={alt}
          />
          <Text as={"h1"} fontSize={"lg"} fontWeight={"bold"}>
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

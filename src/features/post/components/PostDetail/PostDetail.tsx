import { useBreakpointValue } from "@chakra-ui/react";
import { FC } from "react";

import { Category } from "@/features/category/components";
import { PostDate, PostThumbnail } from "@/features/post/components";
import { PostDetailType } from "@/features/post/types";
import { WrapTagList } from "@/features/tag/components";
import { Box, BoxProps, HStack, VStack } from "@/libs/chakra";
import { Text } from "@/libs/chakra";
import { useTranslation } from "@/libs/i18n";
import { RichMarkdownContent } from "@/shared/components";

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
          <PostDate date={postDetail.date} fontSize={"sm"} />
        </HStack>
        <VStack>
          <PostThumbnail
            alt={alt}
            enableBlur
            imageQuality={75}
            ratio={{ base: 1.85 / 1, md: 16 / 9 }}
            sizeSet={sizeSet}
            src={postDetail.coverImage}
          />
          <Text as={"h1"} fontSize={"lg"} fontWeight={"bold"}>
            {postDetail.title}
          </Text>
          <WrapTagList
            flexWrap={"wrap"}
            justifyContent={"center"}
            tags={postDetail.tags}
            width={"full"}
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

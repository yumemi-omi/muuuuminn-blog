import { AspectRatio, LinkBox } from "@chakra-ui/react";
import { FC } from "react";

import { Post } from "@/features/post/type/post";
import { Box, BoxProps, Text } from "@/libs/chakra";
import { ChakraNextImage, CustomNextLink } from "@/libs/next";

type PostCardProps = {
  post: Post;
} & BoxProps;

export const PostCard: FC<PostCardProps> = ({ post }) => {
  return (
    <LinkBox as={"article"}>
      <Text>カテゴリ</Text>
      <Box>
        <AspectRatio maxW="50" ratio={4 / 3}>
          <ChakraNextImage width={100} height={100} src={post.coverImage} />
        </AspectRatio>
        <Box>
          <Text>
            <CustomNextLink linkType={"withOverlay"} passHref href={`/post/${post.slug}`}>
              {post.title}
            </CustomNextLink>
          </Text>
        </Box>
      </Box>
      <Box _hover={{ textDecoration: "underline" }}>
        <Text fontSize="lg">
          <CustomNextLink href={"#h1"}>タグ</CustomNextLink>
        </Text>
      </Box>
      <Text>{post.content}</Text>
      <Text>{post.date}</Text>
    </LinkBox>
  );
};

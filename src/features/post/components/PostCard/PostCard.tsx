import { AspectRatio, LinkBox, LinkBoxProps } from "@chakra-ui/react";
import { FC } from "react";

import { PostType } from "@/features/post/type/post";
import { Flex, HStack, Stack, Text, VStack } from "@/libs/chakra";
import { ChakraNextImage, CustomNextLink } from "@/libs/next";

import { Category } from "../Category";
import { PostDate } from "../PostDate";
import { TagList } from "../TagList";

type PostCardProps = {
  post: PostType;
} & LinkBoxProps;

export const PostCard: FC<PostCardProps> = ({ post, ...rest }) => {
  return (
    <LinkBox px={"4"} py={"2"} as={"article"} {...rest}>
      <VStack align={"start"}>
        <HStack>
          <AspectRatio ratio={1 / 1} w={"100px"}>
            <ChakraNextImage borderRadius={"xl"} layout={"fill"} src={post.coverImage} />
          </AspectRatio>
          <Stack>
            {post.category && (
              <CustomNextLink href={`?category=${post.category.id}`}>
                <Category maxWidth={"200px"} category={post.category} fontSize={"sm"} />
              </CustomNextLink>
            )}
            <CustomNextLink linkType={"withOverlay"} href={`/post/${post.id}`}>
              <Text noOfLines={2} fontSize={"lg"} fontWeight={"bold"}>
                {post.title}
              </Text>
            </CustomNextLink>
          </Stack>
        </HStack>
        <Flex gap={"2"} wrap={"wrap"}>
          <TagList maxWidth={"100px"} tags={post.tags} />
        </Flex>
        <Text noOfLines={2}>{post.description}</Text>
        <PostDate w={"full"} textAlign={"end"} fontSize={"sm"} date={post.updatedAt} />
      </VStack>
    </LinkBox>
  );
};

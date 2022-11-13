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
          {post.category && (
            <CustomNextLink href={`?category=${post.category.id}`} prefetch={false}>
              <Category w={"100px"} maxWidth={"100px"} category={post.category} fontSize={"sm"} />
            </CustomNextLink>
          )}
          <PostDate fontSize={"sm"} date={post.updatedAt} />
        </HStack>
        <HStack w={"full"}>
          <AspectRatio flexShrink={0} ratio={1 / 1} w={"100px"}>
            <ChakraNextImage borderRadius={"xl"} layout={"fill"} src={post.coverImage} />
          </AspectRatio>
          <Stack h={"100px"} justifyContent="space-between" flex={1} py={"2"}>
            <CustomNextLink linkType={"withOverlay"} href={`/post/${post.id}`} prefetch={false}>
              <Text noOfLines={2} fontSize={"lg"} fontWeight={"bold"}>
                {post.title}
              </Text>
            </CustomNextLink>
            {/* TODO: Intersection observer */}
            <Flex overflow={"scroll"} gap={"2"} wrap={"nowrap"}>
              <TagList maxWidth={"100px"} tags={post.tags} />
            </Flex>
          </Stack>
        </HStack>
        <Text noOfLines={2}>{post.description}</Text>
      </VStack>
    </LinkBox>
  );
};

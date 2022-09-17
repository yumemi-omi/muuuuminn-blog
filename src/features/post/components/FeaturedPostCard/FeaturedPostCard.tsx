import { AspectRatio, LinkBox, LinkBoxProps } from "@chakra-ui/react";
import { FC } from "react";

import { Post } from "@/features/post/type/post";
import { Flex, HStack, Stack, Text, VStack } from "@/libs/chakra";
import { ChakraNextImage, CustomNextLink } from "@/libs/next";

import { Category } from "../Category";
import { PostDate } from "../PostDate";
import { TagList } from "../TagList";

type FeaturedPostCardProps = {
  post: Post;
} & LinkBoxProps;

export const FeaturedPostCard: FC<FeaturedPostCardProps> = ({ post, ...rest }) => {
  return (
    <LinkBox px={"4"} py={"2"} as={"article"} {...rest}>
      <VStack align={"start"}>
        <HStack>
          <AspectRatio ratio={1 / 1} w={"100px"}>
            <ChakraNextImage layout={"fill"} src={post.coverImage} />
          </AspectRatio>
          <Stack>
            <CustomNextLink href={"#"}>
              <Category
                maxWidth={"200px"}
                category={{
                  name: "カテゴリだよカテゴリだよカテゴリだよカテゴリだよ",
                  id: "diaivvkdaif",
                }}
                fontSize={"sm"}
              />
            </CustomNextLink>
            <CustomNextLink linkType={"withOverlay"} href={`/post/${post.slug}`}>
              <Text noOfLines={2} fontSize={"lg"} fontWeight={"bold"}>
                {post.title}
              </Text>
            </CustomNextLink>
          </Stack>
        </HStack>
        <Flex gap={"2"} wrap={"wrap"}>
          <TagList
            maxWidth={"100px"}
            tags={[
              { name: "aaa", id: "ska" },
              { name: "ididiid", id: "dakvadifvk" },
              { name: "ididiidididiidididiidididiidididiidididiid", id: "vfdsbb" },
              { name: "ididiid", id: "cad" },
              { name: "ididiid", id: "cdaf" },
              { name: "ididiid", id: "v" },
              { name: "ididiid", id: "reagvd" },
              { name: "ididiid", id: "vdaserr" },
            ]}
          />
        </Flex>
        <Text noOfLines={2}>
          {post.content ||
            "内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容"}
        </Text>
        <PostDate date={post.date} />
      </VStack>
    </LinkBox>
  );
};

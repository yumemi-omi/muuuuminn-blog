---
title: "Dynamic Routing and Static Generation"
coverImage: "/post/hello/akira.jpeg"
date: "2022-09-14"
ogImageUrl: "/post/hello/akira.jpeg"
---

```tsx[class="line-numbers"]
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
```

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Praesent elementum facilisis leo vel fringilla est ullamcorper eget. At imperdiet dui accumsan sit amet nulla facilities morbi tempus. Praesent elementum facilisis leo vel fringilla. Congue mauris rhoncus aenean vel. Egestas sed tempus urna et pharetra pharetra massa massa ultricies.

Venenatis cras sed felis eget velit. Consectetur libero id faucibus nisl tincidunt. Gravida in fermentum et sollicitudin ac orci phasellus egestas tellus. Volutpat consequat mauris nunc congue nisi vitae. Id aliquet risus feugiat in ante metus dictum at tempor. Sed blandit libero volutpat sed cras. Sed odio morbi quis commodo odio aenean sed adipiscing. Velit euismod in pellentesque massa placerat. Mi bibendum neque egestas congue quisque egestas diam in arcu. Nisi lacus sed viverra tellus in. Nibh cras pulvinar mattis nunc sed. Luctus accumsan tortor posuere ac ut consequat semper viverra. Fringilla ut morbi tincidunt augue interdum velit euismod.

## Lorem Ipsum

Tristique senectus et netus et malesuada fames ac turpis. Ridiculous mus mauris vitae ultricies leo integer malesuada nunc vel. In mollis nunc sed id semper. Egestas tellus rutrum tellus pellentesque. Phasellus vestibulum lorem sed risus ultricies tristique nulla. Quis blandit turpis cursus in hac habitasse platea dictumst quisque. Eros donec ac odio tempor orci dapibus ultrices. Aliquam sem et tortor consequat id porta nibh. Adipiscing elit duis tristique sollicitudin nibh sit amet commodo nulla. Diam vulputate ut pharetra sit amet. Ut tellus elementum sagittis vitae et leo. Arcu non odio euismod lacinia at quis risus sed vulputate.

![markdown dir](/post/hello/akira.jpeg)

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Praesent elementum facilisis leo vel fringilla est ullamcorper eget. At imperdiet dui accumsan sit amet nulla facilities morbi tempus. Praesent elementum facilisis leo vel fringilla. Congue mauris rhoncus aenean vel. Egestas sed tempus urna et pharetra pharetra massa massa ultricies.

Venenatis cras sed felis eget velit. Consectetur libero id faucibus nisl tincidunt. Gravida in fermentum et sollicitudin ac orci phasellus egestas tellus. Volutpat consequat mauris nunc congue nisi vitae. Id aliquet risus feugiat in ante metus dictum at tempor. Sed blandit libero volutpat sed cras. Sed odio morbi quis commodo odio aenean sed adipiscing. Velit euismod in pellentesque massa placerat. Mi bibendum neque egestas congue quisque egestas diam in arcu. Nisi lacus sed viverra tellus in. Nibh cras pulvinar mattis nunc sed. Luctus accumsan tortor posuere ac ut consequat semper viverra. Fringilla ut morbi tincidunt augue interdum velit euismod.

## Lorem Ipsum

Tristique senectus et netus et malesuada fames ac turpis. Ridiculous mus mauris vitae ultricies leo integer malesuada nunc vel. In mollis nunc sed id semper. Egestas tellus rutrum tellus pellentesque. Phasellus vestibulum lorem sed risus ultricies tristique nulla. Quis blandit turpis cursus in hac habitasse platea dictumst quisque. Eros donec ac odio tempor orci dapibus ultrices. Aliquam sem et tortor consequat id porta nibh. Adipiscing elit duis tristique sollicitudin nibh sit amet commodo nulla. Diam vulputate ut pharetra sit amet. Ut tellus elementum sagittis vitae et leo. Arcu non odio euismod lacinia at quis risus sed vulputate.

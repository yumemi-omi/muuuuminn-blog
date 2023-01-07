import { useColorMode } from "@chakra-ui/react";
import { FC, memo } from "react";

import { PostType } from "@/features/post/types";
import { Text } from "@/libs/chakra";
import { CustomNextLink } from "@/libs/next";

type PostTitleProps = {
  post: PostType;
};

const _PostTitleLink: FC<PostTitleProps> = ({ post }) => {
  const { colorMode } = useColorMode();
  return (
    <CustomNextLink
      linkType={"withOverlay"}
      href={`/post/${post.slug}`}
      prefetch={false}
      _hover={{
        color: colorMode === "dark" ? "#fec8c8cc" : "#775f5fcc",
        "--d": "100%",
      }}
      _visited={{ color: colorMode === "dark" ? "#fec8c8" : "#775f5f" }}
      background={"linear-gradient(currentColor 0 0) 0 100% /var(--d, 0) 1px no-repeat"}
      sx={{
        transitionProperty: "var(--chakra-transition-property-common), background",
        transitionDuration: "var(--chakra-transition-duration-normal)",
      }}
    >
      <Text noOfLines={2} fontSize={"lg"} fontWeight={"bold"}>
        {post.title}
      </Text>
    </CustomNextLink>
  );
};

export const PostTitleLink = memo(_PostTitleLink);

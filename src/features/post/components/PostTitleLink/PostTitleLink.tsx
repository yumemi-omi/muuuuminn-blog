import { FC, memo } from "react";

import { PostType } from "@/features/post/types";
import { Text } from "@/libs/chakra";
import { CustomNextLink } from "@/libs/next";

type PostTitleProps = {
  post: PostType;
};

const _PostTitleLink: FC<PostTitleProps> = ({ post }) => {
  return (
    <CustomNextLink
      linkType={"withOverlay"}
      href={`/post/${post.slug}`}
      prefetch={false}
      _hover={{ color: "#fec8c8cc" }}
      _visited={{ color: "#fec8c8" }}
      sx={{
        "transition-property": "var(--chakra-transition-property-common)",
        "transition-duration": "var(--chakra-transition-duration-normal)",
      }}
      // _visited={{ color: "#fec8c8" }}
    >
      <Text noOfLines={2} fontSize={"lg"} fontWeight={"bold"}>
        {post.title}
      </Text>
    </CustomNextLink>
  );
};

export const PostTitleLink = memo(_PostTitleLink);

import { FC, memo } from "react";

import { PostType } from "@/features/post/types";
import { Text } from "@/libs/mantine/typography";
import { CustomNextLink } from "@/libs/next";

type PostTitleProps = {
  post: PostType;
};

const _PostTitleLink: FC<PostTitleProps> = ({ post }) => {
  return (
    <CustomNextLink
      href={`/post/${post.slug}`}
      prefetch={false}
      sx={(theme) => ({
        textDecoration: "none",
        color:
          theme.colorScheme === "dark"
            ? theme.colors["light-coral"][1]
            : theme.colors["light-coral"][8],
        transitionProperty: "var(--transition-property-common)",
        transitionDuration: "var(--transition-duration-common)",
        background: "linear-gradient(currentColor 0 0) 0 100% /var(--d, 0) 1px no-repeat",
        "&:hover": {
          color: theme.colorScheme === "dark" ? "#fec8c8cc" : "#775f5fcc",
          "--d": "100%",
        },
        "&:visited": {
          color:
            theme.colorScheme === "dark"
              ? theme.colors["light-coral"][1]
              : theme.colors["light-coral"][8],
        },
      })}
    >
      <Text fz={"lg"} lineClamp={2} weight={"bold"}>
        {post.title}
      </Text>
    </CustomNextLink>
  );
};

export const PostTitleLink = memo(_PostTitleLink);

import { useColorMode } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FC, memo, useMemo } from "react";

import { TagType } from "@/features/post/subFeatures/tag/types";
import { Box } from "@/libs/chakra";
import { CustomNextLink, CustomNextLinkProps } from "@/libs/next";

type TagProps = Omit<CustomNextLinkProps, "href"> & {
  tag: TagType;
};

const _Tag: FC<TagProps> = ({ tag, ...rest }) => {
  const router = useRouter();
  const categoryNameAsQuery = (router.query.category_name as string) || "";
  const href = useMemo(() => {
    // TODO: クエリ作成を関数化する
    const params = new URLSearchParams();
    params.append("tag", tag.name);
    const searchParams = params.toString();
    const urlSuffix = searchParams ? `/?${searchParams}` : "";

    if (categoryNameAsQuery) {
      return `/posts/${categoryNameAsQuery}${urlSuffix}`;
    } else {
      return `/posts${urlSuffix}`;
    }
  }, [categoryNameAsQuery, tag]);

  const { colorMode } = useColorMode();
  const hoverBackgroundColor = colorMode === "dark" ? "#333333" : "#3333332e";

  return (
    <CustomNextLink
      {...rest}
      href={href}
      prefetch={false}
      px={2}
      display={"flex"}
      justifyContent={"center"}
      textAlign={"center"}
      fontSize={"sm"}
      borderColor={tag.color ? `#${tag.color}cc` : "currentcolor"}
      borderWidth={1}
      borderRadius={16}
      _hover={{ backgroundColor: tag.color ? `#${tag.color}2E` : hoverBackgroundColor }}
    >
      <Box
        noOfLines={1}
        title={`#${tag.name}`}
        /**
         * workaround
         * https://stackoverflow.com/questions/71666775/chakra-ui-text-component-nooflines-doesnt-display-right-in-safari
         * mobile実機のみnoOfLinesが機能しないため、maxHeightを指定してはみ出たテキストは非表示にする
         */
        height={"24px"}
        overflow={"hidden"}
      >
        #{tag.name}
      </Box>
    </CustomNextLink>
  );
};

export const Tag = memo(_Tag);

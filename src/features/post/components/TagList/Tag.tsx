import { FC, memo } from "react";

import { TagType } from "@/features/post/type/post";
import { Box } from "@/libs/chakra";
import { CustomNextLink, CustomNextLinkProps } from "@/libs/next";

type TagProps = Omit<CustomNextLinkProps, "href"> & {
  tag: TagType;
};

const _Tag: FC<TagProps> = ({ tag, ...rest }) => {
  return (
    <CustomNextLink
      {...rest}
      href={`/posts?tag=${tag.id}`}
      prefetch={false}
      px={2}
      display={"flex"}
      justifyContent={"center"}
      textAlign={"center"}
      fontSize={"sm"}
      borderColor={`#${tag.color}CC`}
      borderWidth={1}
      borderRadius={16}
      _hover={{ backgroundColor: `#${tag.color}2E` }}
    >
      <Box
        noOfLines={1}
        title={`#${tag.name}`}
        // 上下のスペース揃え https://coliss.com/articles/build-websites/operation/css/aligning-button-label-vertically.html
        _before={{
          content: "''",
          display: "inline",
          height: "22px",
          verticalAlign: "middle",
        }}
        /**
         * workaround
         * https://stackoverflow.com/questions/71666775/chakra-ui-text-component-nooflines-doesnt-display-right-in-safari
         * mobile実機のみnoOfLinesが機能しないため、maxHeightを指定してはみ出たテキストは非表示にする
         */
        maxHeight={"22px"}
        overflow={"hidden"}
      >
        #{tag.name}
      </Box>
    </CustomNextLink>
  );
};

export const Tag = memo(_Tag);

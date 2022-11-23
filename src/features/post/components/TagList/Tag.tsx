import { FC, useCallback, useEffect, useMemo, useRef, useState, MouseEvent, memo } from "react";

import { TagType } from "@/features/post/type/post";
import { Text, Box, BoxProps } from "@/libs/chakra";
import { CustomNextLink } from "@/libs/next";

type TagProps = BoxProps & {
  tag: TagType;
  transformTagMenu?: boolean;
  countsOfTagInMenu?: number;
};

const _Tag: FC<TagProps> = ({ tag, transformTagMenu, countsOfTagInMenu, ...rest }) => {
  if (transformTagMenu) {
    return (
      <Box display={"flex"} title={`+${countsOfTagInMenu}`} {...rest}>
        <Box bgColor={"brand.700"} borderRadius={6} minWidth={8} px={2}>
          <Text
            fontSize={"sm"}
            // 上下のスペース揃え https://coliss.com/articles/build-websites/operation/css/aligning-button-label-vertically.html
            _before={{
              content: "''",
              display: "inline",
              height: "22px",
              verticalAlign: "middle",
            }}
            maxHeight={"22px"}
            overflow={"hidden"}
          >
            +{countsOfTagInMenu}
          </Text>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      display={"flex"}
      // githubのlabelのカラーに合わせる
      bgColor={`#${tag.color}`}
      borderRadius={16}
      justifyContent={"center"}
      px={2}
      title={`#${tag.name}`}
      {...rest}
    >
      <CustomNextLink
        href={`/posts?tag=${tag.id}`}
        prefetch={false}
        fontSize={"sm"}
        // 上下のスペース揃え https://coliss.com/articles/build-websites/operation/css/aligning-button-label-vertically.html
        _before={{
          content: "''",
          display: "inline",
          height: "22px",
          verticalAlign: "middle",
        }}
        noOfLines={1}
        maxHeight={"22px"}
        overflow={"hidden"}
      >
        #{tag.name}
      </CustomNextLink>
    </Box>
  );
};

export const Tag = memo(_Tag);

import { FC, useCallback, useEffect, useMemo, useRef, useState, MouseEvent, memo } from "react";

import { Text, Box, BoxProps } from "@/libs/chakra";
import { CustomNextLink } from "@/libs/next";

type TagProps = BoxProps & {
  tag: { name: string; id: string };
  transformTagMenu?: boolean;
  countsOfTagInMenu?: number;
};

const _Tag: FC<TagProps> = ({ tag, transformTagMenu, countsOfTagInMenu, ...rest }) => {
  if (transformTagMenu) {
    return (
      <Box display={"flex"} px={2} title={`+${countsOfTagInMenu}`} {...rest}>
        <Box bgColor={"brand.700"} borderRadius={6} minWidth={8} px={2}>
          <Text
            fontSize={"sm"}
            // 上下のスペース揃え https://coliss.com/articles/build-websites/operation/css/aligning-button-label-vertically.html
            // _before={{
            //   content: "''",
            //   display: "inline",
            //   height: "20px",
            //   verticalAlign: "middle",
            // }}
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
      bgColor={"brand.700"}
      borderRadius={16}
      justifyContent={"center"}
      px={2}
      title={`#${tag.name}`}
      {...rest}
    >
      <CustomNextLink noOfLines={1} href={`/posts?tag=${tag.id}`} prefetch={false}>
        <Text
          fontSize={"sm"}
          // 上下のスペース揃え https://coliss.com/articles/build-websites/operation/css/aligning-button-label-vertically.html
          // _before={{
          //   content: "''",
          //   display: "inline",
          //   height: "20px",
          //   verticalAlign: "middle",
          // }}
        >
          #{tag.name}
        </Text>
      </CustomNextLink>
    </Box>
  );
};

export const Tag = memo(_Tag);

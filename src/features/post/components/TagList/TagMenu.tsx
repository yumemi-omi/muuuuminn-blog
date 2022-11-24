import { FC, memo } from "react";

import { Text, Box, BoxProps } from "@/libs/chakra";

type TagProps = BoxProps & {
  countsOfTagInMenu?: number;
};

const _TagMenu: FC<TagProps> = ({ countsOfTagInMenu, ...rest }) => {
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
};

export const TagMenu = memo(_TagMenu);

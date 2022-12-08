import { FC, memo } from "react";

import { TagType } from "@/features/post/subFeatures/tag/types";
import { BoxProps, Box } from "@/libs/chakra";

import { Tag } from "./Tag";

type WrapTagListProps = BoxProps & {
  tags: TagType[];
  tagProps?: {
    shallow?: boolean;
    replace?: boolean;
  };
};

const _WrapTagList: FC<WrapTagListProps> = ({ tags, tagProps, ...boxProps }) => {
  return (
    <Box display={"flex"} gap={2} {...boxProps}>
      {tags.map((tag) => {
        return <Tag {...tagProps} tag={tag} key={tag.id} id={tag.id} />;
      })}
    </Box>
  );
};

export const WrapTagList = memo(_WrapTagList);

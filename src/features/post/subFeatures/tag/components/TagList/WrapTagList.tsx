import { FC, memo } from "react";

import { TagType } from "@/features/post/subFeatures/tag/types";
import { BoxProps, Box } from "@/libs/chakra";

import { Tag } from "./Tag";

type TagListProps = BoxProps & {
  tags: TagType[];
};

const _WrapTagList: FC<TagListProps> = ({ tags, ...boxProps }) => {
  return (
    <Box display={"flex"} gap={2} {...boxProps}>
      {tags.map((tag) => {
        return <Tag tag={tag} key={tag.id} id={tag.id} />;
      })}
    </Box>
  );
};

export const WrapTagList = memo(_WrapTagList);

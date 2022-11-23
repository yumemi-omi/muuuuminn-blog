import { FC, memo } from "react";

import { TagType } from "@/features/post/type/post";
import { BoxProps, Box } from "@/libs/chakra";

import { Tag } from "./Tag";

type TagListProps = BoxProps & {
  tags: TagType[];
  tagProps?: BoxProps;
};

const _WrapTagList: FC<TagListProps> = ({ tags, tagProps, ...boxProps }) => {
  return (
    <Box display={"flex"} gap={2} {...boxProps}>
      {tags.map((tag) => {
        return <Tag tag={tag} key={tag.id} id={tag.id} {...tagProps} />;
      })}
    </Box>
  );
};

export const WrapTagList = memo(_WrapTagList);

import { FC, memo } from "react";

import { TagType } from "@/features/tag/types";
import { FlexProps, Flex } from "@/libs/mantine/layout";

import { Tag } from "./Tag";

type WrapTagListProps = FlexProps & {
  tags: TagType[];
  tagProps?: {
    shallow?: boolean;
    replace?: boolean;
  };
};

const _WrapTagList: FC<WrapTagListProps> = ({ tags, tagProps, ...boxProps }) => {
  return (
    <Flex gap={8} {...boxProps}>
      {tags.map((tag) => {
        return <Tag {...tagProps} key={tag.id} tag={tag} w={"min-content"} />;
      })}
    </Flex>
  );
};

export const WrapTagList = memo(_WrapTagList);

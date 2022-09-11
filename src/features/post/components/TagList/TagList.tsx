import { Tag, TagProps } from "@chakra-ui/react";
import { FC } from "react";

import { Text } from "@/libs/chakra";

type TagListProps = TagProps & {
  tags: { name: string; id: string }[];
};

export const TagList: FC<TagListProps> = ({ tags, ...rest }) => {
  return (
    <>
      {tags.map(
        (tag, index) =>
          index <= 4 && (
            <Tag {...rest} key={tag.id}>
              <Text noOfLines={1}>{tag.name}</Text>
            </Tag>
          ),
      )}
    </>
  );
};

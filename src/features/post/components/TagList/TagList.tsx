import { Tag, TagProps } from "@chakra-ui/react";
import { FC } from "react";

import { Text } from "@/libs/chakra";
import { CustomNextLink } from "@/libs/next";

type TagListProps = TagProps & {
  tags: { name: string; id: string }[];
};

export const TagList: FC<TagListProps> = ({ tags, ...rest }) => {
  return (
    <>
      {tags.map(
        (tag, index) =>
          index <= 4 && (
            <CustomNextLink href={`?tag=${tag.id}`} key={tag.id}>
              <Tag {...rest}>
                <Text noOfLines={1}>{tag.name}</Text>
              </Tag>
            </CustomNextLink>
          ),
      )}
    </>
  );
};

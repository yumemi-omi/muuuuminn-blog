import type { FC } from "react";
import { memo } from "react";

import { Badge, Popover } from "@mantine/core";

import { Box, Flex } from "@/libs/mantine/layout";

import { Tag } from "./Tag";

import type { TagType } from "@/features/tag/types";
import type { BadgeProps } from "@mantine/core";

type TagProps = BadgeProps & {
  countsOfTagInMenu?: number;
  tags: TagType[];
};

const _TagMenu: FC<TagProps> = ({ countsOfTagInMenu, tags, ...rest }) => {
  return (
    <Popover position="bottom-end" shadow="md" withArrow>
      <Popover.Target>
        <Badge
          component="button"
          fullWidth
          fz={"sm"}
          size={"lg"}
          title={"隠されているタグを表示する"}
          variant={"outline"}
          w="max-content"
          {...rest}
        >
          +{countsOfTagInMenu}
        </Badge>
      </Popover.Target>
      <Popover.Dropdown>
        <Flex gap={8}>
          {tags.map((tag, index) => (
            <Box key={`tag_in_menu_${tag.id}_${index}`} sx={{ flexShrink: 0 }}>
              <Tag replace shallow tag={tag} />
            </Box>
          ))}
        </Flex>
      </Popover.Dropdown>
    </Popover>
  );
};

export const TagMenu = memo(_TagMenu);

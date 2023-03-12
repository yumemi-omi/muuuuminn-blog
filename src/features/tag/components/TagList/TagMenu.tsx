import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  Button,
  ButtonProps,
  PopoverArrow,
  PopoverBody,
} from "@chakra-ui/react";
import { FC, memo } from "react";

import { TagType } from "@/features/tag/types";
import { Text, Box } from "@/libs/chakra";

import { Tag } from "./Tag";

type TagProps = ButtonProps & {
  countsOfTagInMenu?: number;
  tags: TagType[];
};

const _TagMenu: FC<TagProps> = ({ countsOfTagInMenu, tags, ...rest }) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Button
          title={`+${countsOfTagInMenu}`}
          variant={"outline"}
          size={"sm"}
          height={6}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          borderRadius={16}
          {...rest}
        >
          <Text fontSize={"sm"}>+{countsOfTagInMenu}</Text>
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        {/* TODO: CloseButtonをいい感じにおきたい */}
        <PopoverBody display={"flex"} gap={2} py={2} overflowX={"auto"}>
          {tags.map((tag, index) => (
            <Box key={`tag_in_menu_${tag.id}_${index}`} flexShrink={0}>
              <Tag shallow replace tag={tag} />
            </Box>
          ))}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export const TagMenu = memo(_TagMenu);

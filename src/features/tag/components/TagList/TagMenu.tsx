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
          alignItems={"center"}
          borderRadius={16}
          display={"flex"}
          height={6}
          justifyContent={"center"}
          size={"sm"}
          title={"隠されているタグを表示する"}
          variant={"outline"}
          {...rest}
        >
          <Text fontSize={"sm"}>+{countsOfTagInMenu}</Text>
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        {/* TODO: CloseButtonをいい感じにおきたい */}
        <PopoverBody display={"flex"} gap={2} overflowX={"auto"} py={2}>
          {tags.map((tag, index) => (
            <Box flexShrink={0} key={`tag_in_menu_${tag.id}_${index}`}>
              <Tag replace shallow tag={tag} />
            </Box>
          ))}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export const TagMenu = memo(_TagMenu);

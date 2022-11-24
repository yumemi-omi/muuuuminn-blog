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

import { TagType } from "@/features/post/type/post";
import { Text } from "@/libs/chakra";

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
          height={"full"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          borderRadius={16}
          {...rest}
        >
          <Text
            fontSize={"sm"}
            // 上下のスペース揃え https://coliss.com/articles/build-websites/operation/css/aligning-button-label-vertically.html
            _before={{
              content: "''",
              display: "inline",
              height: "22px",
              verticalAlign: "middle",
            }}
          >
            +{countsOfTagInMenu}
          </Text>
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        {/* TODO: CloseButtonをいい感じにおきたい */}
        <PopoverBody display={"flex"} gap={2} py={2} overflowX={"auto"}>
          {tags.map((tag) => (
            <Tag key={`tag_in_menu_${tag.id}`} tag={tag} />
          ))}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export const TagMenu = memo(_TagMenu);

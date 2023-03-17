import { HamburgerIcon } from "@chakra-ui/icons";
import { MenuButton, IconButton, MenuList, MenuItem, Menu } from "@chakra-ui/react";

import { Text } from "@/libs/chakra";
import { useTranslation } from "@/libs/i18n";
import { CustomNextLink } from "@/libs/next";

export const HeaderMenu = () => {
  const { t } = useTranslation();
  return (
    <Menu placement={"bottom-end"}>
      <MenuButton
        aria-label={t.ARIA_LABEL.MENU_BUTTON}
        as={IconButton}
        icon={<HamburgerIcon />}
        variant="outline"
      />
      <MenuList>
        {/* https://github.com/chakra-ui/chakra-ui/issues/4892#issuecomment-1003213102
            NextLinkとMenuItemを組み合わせる時は、NextLinkでa要素としてのMenuItemをラップする
        */}
        <CustomNextLink href={"/posts"} linkType="withChakraLink" prefetch={false}>
          <MenuItem>
            <Text fontSize={{ base: "sm", md: "md" }} fontWeight={"bold"}>
              {t.PAGE.POSTS}
            </Text>
          </MenuItem>
        </CustomNextLink>
        <CustomNextLink href={"/policy"} linkType="plainNextLink" prefetch={false} tabIndex={2}>
          <MenuItem
            _focus={{
              outlineColor: "transparent",
            }}
            _focusVisible={{
              outlineOffset: "-3px",
              outlineColor: "green",
            }}
            as="a"
            tabIndex={2}
          >
            <Text fontSize={{ base: "sm", md: "md" }} fontWeight={"bold"}>
              {t.PAGE.POLICY}
            </Text>
          </MenuItem>
        </CustomNextLink>
      </MenuList>
    </Menu>
  );
};

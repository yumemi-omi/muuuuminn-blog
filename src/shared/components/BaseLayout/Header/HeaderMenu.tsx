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
        as={IconButton}
        aria-label={t.ARIA_LABEL.MENU_BUTTON}
        icon={<HamburgerIcon />}
        variant="outline"
      />
      <MenuList>
        {/* https://github.com/chakra-ui/chakra-ui/issues/4892#issuecomment-1003213102
            NextLinkとMenuItemを組み合わせる時は、NextLinkでa要素としてのMenuItemをラップする
        */}
        <CustomNextLink linkType="withChakraLink" href={"/posts"} prefetch={false}>
          <MenuItem>
            <Text fontWeight={"bold"} fontSize={{ base: "sm", md: "md" }}>
              {t.PAGE.POSTS}
            </Text>
          </MenuItem>
        </CustomNextLink>
        <CustomNextLink linkType="plainNextLink" tabIndex={2} href={"/policy"} prefetch={false}>
          <MenuItem
            as="a"
            _focus={{
              outlineColor: "transparent",
            }}
            _focusVisible={{
              outlineOffset: "-3px",
              outlineColor: "green",
            }}
            tabIndex={2}
          >
            <Text fontWeight={"bold"} fontSize={{ base: "sm", md: "md" }}>
              {t.PAGE.POLICY}
            </Text>
          </MenuItem>
        </CustomNextLink>
      </MenuList>
    </Menu>
  );
};

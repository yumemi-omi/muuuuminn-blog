import { HamburgerIcon } from "@chakra-ui/icons";
import { MenuButton, IconButton, MenuList, MenuItem, Menu } from "@chakra-ui/react";

import { Text } from "@/libs/chakra";
import { useTranslation } from "@/libs/i18n";
import { CustomNextLink } from "@/libs/next";

export const HeaderMenu = () => {
  const { t } = useTranslation();
  return (
    <Menu>
      {/* TODO: i18n */}
      <MenuButton as={IconButton} aria-label="Options" icon={<HamburgerIcon />} variant="outline" />
      <MenuList>
        <MenuItem>
          <CustomNextLink href={"/posts"} prefetch={false}>
            <Text fontWeight={"bold"} fontSize={{ base: "sm", md: "md" }}>
              {t.PAGE.HOME}
            </Text>
          </CustomNextLink>
        </MenuItem>
        <MenuItem>
          <CustomNextLink href={"/policy"} prefetch={false}>
            <Text fontWeight={"bold"} fontSize={{ base: "sm", md: "md" }}>
              {t.PAGE.POLICY}
            </Text>
          </CustomNextLink>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

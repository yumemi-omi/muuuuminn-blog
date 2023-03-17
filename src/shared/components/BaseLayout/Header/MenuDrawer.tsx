import { HamburgerIcon } from "@chakra-ui/icons";
import {
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  IconButton,
} from "@chakra-ui/react";
import { useRef } from "react";

import { Stack, Text } from "@/libs/chakra";
import { useTranslation } from "@/libs/i18n";
import { CustomNextLink } from "@/libs/next";

const MenuLinks = [
  {
    name: "POSTS",
    href: "/posts",
    targetBlank: false,
  },
  {
    name: "WISH_LIST",
    href: "https://www.amazon.co.jp/-/en/hz/wishlist/ls/15U19H5XG5941",
    targetBlank: true,
  },
  {
    name: "COFFEE",
    href: "https://www.buymeacoffee.com/muuuuminn",
    targetBlank: true,
  },
  {
    name: "POLICY",
    href: "/policy",
    targetBlank: false,
  },
  {
    name: "CONTACT",
    href: "https://docs.google.com/forms/d/e/1FAIpQLSeXNfr1rEd0Cf_55yIlk2mOjrC4Rs00gA5jw0POoQ7pQOPo7A/viewform",
    targetBlank: true,
  },
  {
    name: "RSS",
    href: "/rss.xml",
    targetBlank: false,
  },
] as const;

export const MenuDrawer = () => {
  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <IconButton
        aria-label={t.ARIA_LABEL.MENU_BUTTON}
        icon={<HamburgerIcon />}
        onClick={onOpen}
        ref={btnRef}
        variant="outline"
      />
      <Drawer finalFocusRef={btnRef} isOpen={isOpen} onClose={onClose} placement="right">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader></DrawerHeader>

          <DrawerBody>
            <Stack spacing={4}>
              {MenuLinks.map((menuLink) => (
                <CustomNextLink
                  href={menuLink.href}
                  key={menuLink.href}
                  onClick={onClose}
                  target={menuLink.targetBlank ? "_blank" : undefined}
                >
                  <Text fontSize={{ base: "sm", md: "md" }} fontWeight={"bold"}>
                    {t.PAGE[menuLink.name]}
                  </Text>
                </CustomNextLink>
              ))}
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

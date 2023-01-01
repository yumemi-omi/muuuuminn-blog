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
  },
  {
    name: "POLICY",
    href: "/policy",
  },
  {
    name: "RSS",
    href: "/rss.xml",
  },
] as const;

export const MenuDrawer = () => {
  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <IconButton
        variant="outline"
        aria-label={t.ARIA_LABEL.MENU_BUTTON}
        icon={<HamburgerIcon />}
        ref={btnRef}
        onClick={onOpen}
      />
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader></DrawerHeader>

          <DrawerBody>
            <Stack spacing={4}>
              {MenuLinks.map((menuLink) => (
                <CustomNextLink
                  key={menuLink.href}
                  href={menuLink.href}
                  prefetch={false}
                  onClick={onClose}
                >
                  <Text fontWeight={"bold"} fontSize={{ base: "sm", md: "md" }}>
                    {t.PAGE[menuLink.name]}
                  </Text>
                </CustomNextLink>
              ))}
              <CustomNextLink
                linkType={"withChakraLink"}
                href={
                  "https://docs.google.com/forms/d/e/1FAIpQLSeXNfr1rEd0Cf_55yIlk2mOjrC4Rs00gA5jw0POoQ7pQOPo7A/viewform"
                }
                target={"_blank"}
                onClick={onClose}
              >
                <Text fontWeight={"bold"} fontSize={{ base: "sm", md: "md" }}>
                  {t.PAGE.CONTACT}
                </Text>
              </CustomNextLink>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

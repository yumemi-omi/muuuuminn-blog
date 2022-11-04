import { AspectRatio, Heading, Text, useColorMode } from "@chakra-ui/react";
import { FC, memo } from "react";

import { Flex, FlexProps, HStack, Spacer } from "@/libs/chakra";
import { useTranslation } from "@/libs/i18n";
import { CustomNextLink, ChakraNextImage } from "@/libs/next";

import { ToggleAppearanceButton } from "./ToggleAppearanceButton";

type HeaderProps = FlexProps;

export const Header: FC<HeaderProps> = memo(function _header() {
  const { t } = useTranslation();
  const { colorMode } = useColorMode();

  return (
    <Flex alignItems={"center"} paddingY={"4"} paddingX={"6"}>
      <CustomNextLink href={"/posts"}>
        <AspectRatio ratio={1 / 1} w={"120px"} hidden={colorMode === "dark"}>
          <ChakraNextImage
            src={"/logo/logo_transparent_reverse.png"}
            alt={t.ALT.SITE_LOGO}
            borderRadius={"xl"}
            layout={"fill"}
          />
        </AspectRatio>
        <AspectRatio ratio={1 / 1} w={"120px"} hidden={colorMode === "light"}>
          <ChakraNextImage
            src={"/logo/logo_transparent.png"}
            alt={t.ALT.SITE_LOGO}
            borderRadius={"xl"}
            layout={"fill"}
          />
        </AspectRatio>
        <Heading hidden>{t.SITE_NAME}</Heading>
      </CustomNextLink>
      <Spacer />
      <HStack>
        <CustomNextLink href={"/posts"} prefetch={false}>
          <Text fontWeight={"bold"} fontSize={"xl"}>
            {t.PAGE.HOME}
          </Text>
        </CustomNextLink>
        <ToggleAppearanceButton />
      </HStack>
    </Flex>
  );
});

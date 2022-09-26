import { AspectRatio, Heading, Text } from "@chakra-ui/react";
import { FC, memo } from "react";

import { Flex, FlexProps, HStack, Spacer } from "@/libs/chakra";
import { useTranslation } from "@/libs/i18n";
import { CustomNextLink, ChakraNextImage } from "@/libs/next";

import { ToggleAppearranceButton } from "./ToggleAppearranceButton";

type HeaderProps = FlexProps;

export const Header: FC<HeaderProps> = memo(function _header() {
  const { t } = useTranslation();
  return (
    <Flex alignItems={"center"} paddingY={"4"} paddingX={"6"}>
      <CustomNextLink href={"/home"}>
        <AspectRatio ratio={1 / 1} w={"120px"}>
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
        <CustomNextLink href={"/home"}>
          <Text fontWeight={"bold"} fontSize={"xl"}>
            {t.PAGE.HOME}
          </Text>
        </CustomNextLink>
        <ToggleAppearranceButton />
      </HStack>
    </Flex>
  );
});

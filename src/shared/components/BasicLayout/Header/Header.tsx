import { Heading, useColorMode } from "@chakra-ui/react";
import { FC, memo } from "react";

import { Flex, FlexProps, Text, HStack, Spacer } from "@/libs/chakra";
import { useTranslation } from "@/libs/i18n";
import { CustomNextLink } from "@/libs/next";

import { HeaderMenu } from "./HeaderMenu";
import { Logo } from "./Logo";
import { ToggleAppearanceButton } from "./ToggleAppearanceButton";

type HeaderProps = FlexProps;

export const Header: FC<HeaderProps> = memo(function _header() {
  const { t } = useTranslation();
  const { colorMode } = useColorMode();

  return (
    <Flex py={"4"} alignItems={"center"}>
      <CustomNextLink href={"/posts"}>
        <Flex gap={2} alignItems={"center"}>
          <Logo />
          <Text
            fontWeight={"extrabold"}
            color={colorMode === "dark" ? "#fec8c8" : "brand.800"}
            fontSize={{ base: "sm", md: "lg" }}
          >
            {t.SITE_NAME}
          </Text>
        </Flex>
        <Heading hidden>{t.SITE_NAME}</Heading>
      </CustomNextLink>
      <Spacer />
      <HStack>
        <ToggleAppearanceButton />
        <HeaderMenu />
      </HStack>
    </Flex>
  );
});

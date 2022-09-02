import { Heading, Text } from "@chakra-ui/react";
import { FC } from "react";

import { Flex, FlexProps, Spacer } from "@/shared/libs/chakra";
import { useTranslation } from "@/shared/libs/i18n/hooks/useTranslation";
import { ChakraNextLink, ChakraNextImage } from "@/shared/libs/next";

type HeaderProps = FlexProps;

export const Header: FC<HeaderProps> = () => {
  const { t } = useTranslation();
  return (
    <Flex alignItems={"center"} paddingY={"4"} paddingX={"6"}>
      <ChakraNextLink href={"/"}>
        <ChakraNextImage
          src={"/logo/logo_transparent.png"}
          alt={t.ALT.SITE_LOGO}
          width={120}
          height={120}
          // max-heightなしだと、6px分サイズが大きくなる
          maxH={"120px"}
          layout={"fixed"}
        />
        <Heading hidden>{t.SITE_NAME}</Heading>
      </ChakraNextLink>
      <Spacer />
      <Flex marginRight={"8"}>
        <ChakraNextLink href={"/"}>
          <Text fontWeight={"bold"} fontSize={"xl"}>
            {t.PAGE.HOME}
          </Text>
        </ChakraNextLink>
      </Flex>
    </Flex>
  );
};

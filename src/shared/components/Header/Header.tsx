import { Heading, Text } from "@chakra-ui/react";
import { FC } from "react";

import { Flex, FlexProps, Spacer } from "@/libs/chakra";
import { useTranslation } from "@/libs/i18n";
import { CustomNextLink, ChakraNextImage } from "@/libs/next";

type HeaderProps = FlexProps;

export const Header: FC<HeaderProps> = () => {
  const { t } = useTranslation();
  return (
    <Flex alignItems={"center"} paddingY={"4"} paddingX={"6"}>
      <CustomNextLink href={"/home"}>
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
      </CustomNextLink>
      <Spacer />
      <Flex marginRight={"8"}>
        <CustomNextLink href={"/home"}>
          <Text fontWeight={"bold"} fontSize={"xl"}>
            {t.PAGE.HOME}
          </Text>
        </CustomNextLink>
      </Flex>
    </Flex>
  );
};

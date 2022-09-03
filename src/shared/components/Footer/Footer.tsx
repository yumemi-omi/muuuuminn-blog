import { Center, Text } from "@chakra-ui/react";
import { FC } from "react";

import { Flex, FlexProps } from "@/libs/chakra";
import { useTranslation } from "@/libs/i18n";
import { ChakraNextLink } from "@/libs/next";

type FooterProps = FlexProps;

export const Footer: FC<FooterProps> = () => {
  const { t } = useTranslation();
  return (
    <Center>
      <Flex alignItems={"center"} paddingY={"4"}>
        <ChakraNextLink href={"/home"}>
          <Text fontWeight={"bold"} fontSize={"xl"}>
            {t.PAGE.HOME}
          </Text>
        </ChakraNextLink>
      </Flex>
    </Center>
  );
};

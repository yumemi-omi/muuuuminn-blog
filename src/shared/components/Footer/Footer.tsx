import { Center, Text } from "@chakra-ui/react";
import { FC } from "react";

import { Flex, FlexProps } from "@/shared/libs/chakra";
import { useTranslation } from "@/shared/libs/i18n/hooks/useTranslation";
import { ChakraNextLink } from "@/shared/libs/next";

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

import { Center, HStack, Text } from "@chakra-ui/react";
import { FC } from "react";

import { FlexProps } from "@/libs/chakra";
import { useTranslation } from "@/libs/i18n";
import { CustomNextLink } from "@/libs/next";

type FooterProps = FlexProps;

export const Footer: FC<FooterProps> = () => {
  const { t } = useTranslation();
  return (
    <Center>
      <HStack alignItems={"center"} paddingY={"4"}>
        <CustomNextLink href={"/posts"} prefetch={false}>
          <Text fontWeight={"bold"} fontSize={"xl"}>
            {t.PAGE.HOME}
          </Text>
        </CustomNextLink>
        <CustomNextLink href={"/policy"} prefetch={false}>
          <Text fontWeight={"bold"} fontSize={"xl"}>
            {t.PAGE.POLICY}
          </Text>
        </CustomNextLink>
      </HStack>
    </Center>
  );
};

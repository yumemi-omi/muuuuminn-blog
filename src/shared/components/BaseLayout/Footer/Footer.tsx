import { FC } from "react";

import { Flex, FlexProps, Text } from "@/libs/chakra";
import { useTranslation } from "@/libs/i18n";
import { CustomNextLink } from "@/libs/next/link/CustomNextLink";

type FooterProps = FlexProps;

export const Footer: FC<FooterProps> = () => {
  const { t } = useTranslation();
  return (
    <Flex alignItems={"center"} as={"footer"} direction={"column"} py={"1"}>
      <CustomNextLink href={"/policy"} prefetch={false}>
        <Text fontSize={"sm"} fontWeight={"bold"}>
          {t.PAGE.POLICY}
        </Text>
      </CustomNextLink>
      <Text fontSize={"xs"}>{t.COPYRIGHT}</Text>
    </Flex>
  );
};

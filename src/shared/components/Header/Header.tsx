import { Heading } from "@chakra-ui/react";
import { FC } from "react";

import { Box, BoxProps } from "@/shared/libs/chakra";
import { useTranslation } from "@/shared/libs/i18n/hooks/useTranslation";
import { ChakraNextLink, ChakraNextImage } from "@/shared/libs/next";

type HeaderProps = BoxProps;

export const Header: FC<HeaderProps> = () => {
  const { t } = useTranslation();
  return (
    <Box>
      <ChakraNextLink href={"/"}>
        <ChakraNextImage
          src={"/logo/logo_transparent.png"}
          alt={"サイトロゴ"}
          width={200}
          height={200}
          // max-heightなしだと、6px分サイズが大きくなる
          maxH={"200px"}
          layout={"fixed"}
        />
        <Heading hidden>{t.SITE_NAME}</Heading>
      </ChakraNextLink>
    </Box>
  );
};

import { AspectRatio, useColorMode } from "@chakra-ui/react";
import { FC, memo } from "react";

import { FlexProps } from "@/libs/chakra";
import { useTranslation } from "@/libs/i18n";
import { ChakraNextImage } from "@/libs/next";

type LogoWithTitleProps = FlexProps;

export const LogoWithTitle: FC<LogoWithTitleProps> = memo(function _logo() {
  const { t } = useTranslation();
  const { colorMode } = useColorMode();

  return (
    <>
      <AspectRatio hidden={colorMode === "dark"} ratio={1 / 1} w={{ base: "60px", md: "100px" }}>
        <ChakraNextImage
          alt={t.ALT.SITE_LOGO}
          borderRadius={"xl"}
          layout={"fill"}
          src={"/logo/logo_transparent_reverse.png"}
        />
      </AspectRatio>
      <AspectRatio hidden={colorMode === "light"} ratio={1 / 1} w={{ base: "60px", md: "100px" }}>
        <ChakraNextImage
          alt={t.ALT.SITE_LOGO}
          borderRadius={"xl"}
          layout={"fill"}
          src={"/logo/logo_transparent.png"}
        />
      </AspectRatio>
    </>
  );
});

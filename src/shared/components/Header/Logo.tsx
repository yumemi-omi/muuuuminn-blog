import { AspectRatio, useColorMode } from "@chakra-ui/react";
import { FC, memo } from "react";

import { FlexProps } from "@/libs/chakra";
import { useTranslation } from "@/libs/i18n";
import { ChakraNextImage } from "@/libs/next";

type LogoProps = FlexProps;

export const Logo: FC<LogoProps> = memo(function _logo() {
  const { t } = useTranslation();
  const { colorMode } = useColorMode();

  return (
    <>
      <AspectRatio ratio={1 / 1} w={{ base: "60px", md: "100px" }} hidden={colorMode === "dark"}>
        <ChakraNextImage
          src={"/logo/logo_transparent_reverse.png"}
          alt={t.ALT.SITE_LOGO}
          borderRadius={"xl"}
          layout={"fill"}
        />
      </AspectRatio>
      <AspectRatio ratio={1 / 1} w={{ base: "60px", md: "100px" }} hidden={colorMode === "light"}>
        <ChakraNextImage
          src={"/logo/logo_transparent.png"}
          alt={t.ALT.SITE_LOGO}
          borderRadius={"xl"}
          layout={"fill"}
        />
      </AspectRatio>
    </>
  );
});

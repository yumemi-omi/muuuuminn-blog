import { AspectRatio, useColorMode, AspectRatioProps } from "@chakra-ui/react";
import { FC, memo } from "react";

import { useTranslation } from "@/libs/i18n";
import { ChakraNextImage } from "@/libs/next";

type LogoProps = AspectRatioProps;

export const Logo: FC<LogoProps> = memo(function _logo({ ...rest }) {
  const { t } = useTranslation();
  const { colorMode } = useColorMode();

  return (
    <>
      <AspectRatio
        hidden={colorMode === "dark"}
        ratio={1 / 0.689}
        w={{ base: "40px", md: "60px" }}
        {...rest}
      >
        <ChakraNextImage
          alt={t.ALT.SITE_LOGO}
          borderRadius={"xl"}
          layout={"fill"}
          quality={50}
          src={"/logo/logo_transparent_reverse_no_title.png"}
        />
      </AspectRatio>
      <AspectRatio
        hidden={colorMode === "light"}
        ratio={1 / 0.689}
        w={{ base: "40px", md: "60px" }}
        {...rest}
      >
        <ChakraNextImage
          alt={t.ALT.SITE_LOGO}
          borderRadius={"xl"}
          layout={"fill"}
          quality={50}
          src={"/logo/logo_transparent_no_title.png"}
        />
      </AspectRatio>
    </>
  );
});

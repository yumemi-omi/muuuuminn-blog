import { Box, BoxProps } from "@chakra-ui/react";
import { FC } from "react";

import { useTranslation } from "@/shared/libs/i18n/hooks/useTranslation";

type HeaderProps = BoxProps;

export const Header: FC<HeaderProps> = () => {
  const { t } = useTranslation();
  return <Box>{t.SITE_NAME}</Box>;
};

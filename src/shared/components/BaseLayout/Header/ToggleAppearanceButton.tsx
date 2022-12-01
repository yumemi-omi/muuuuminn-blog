import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { IconButton, useColorMode } from "@chakra-ui/react";

import { useTranslation } from "@/libs/i18n";

export const ToggleAppearanceButton = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { t } = useTranslation();
  const Icon = colorMode === "light" ? <MoonIcon /> : <SunIcon />;

  return (
    <IconButton
      onClick={toggleColorMode}
      aria-label={t.ARIA_LABEL.TOGGLE_APPEARANCE_BUTTON}
      icon={Icon}
      variant="outline"
    />
  );
};

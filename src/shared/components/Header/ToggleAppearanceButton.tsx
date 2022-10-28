import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { IconButton, useColorMode } from "@chakra-ui/react";

export const ToggleAppearanceButton = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const Icon = colorMode === "light" ? <MoonIcon /> : <SunIcon />;

  return <IconButton onClick={toggleColorMode} aria-label="Toggle Appearance" icon={Icon} />;
};

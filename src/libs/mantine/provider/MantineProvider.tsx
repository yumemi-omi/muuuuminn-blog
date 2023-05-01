import {
  ColorScheme,
  ColorSchemeProvider as _ColorSchemeProvider,
  MantineProvider as _MantineProvider,
  MantineProviderProps,
} from "@mantine/core";
import { useColorScheme, useLocalStorage } from "@mantine/hooks";
import { FC, ReactNode, useEffect } from "react";

import theme from "@/libs/mantine/theme";

type Props = {
  children: ReactNode;
} & MantineProviderProps;

export const MantineProvider: FC<Props> = ({ children }) => {
  const preferredColorScheme = useColorScheme();

  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: preferredColorScheme,
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  useEffect(() => {
    setColorScheme(preferredColorScheme);
  }, [setColorScheme, preferredColorScheme]);

  return (
    <_ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <_MantineProvider
        theme={{ colorScheme: colorScheme, ...theme }}
        withGlobalStyles
        withNormalizeCSS
      >
        {children}
      </_MantineProvider>
    </_ColorSchemeProvider>
  );
};

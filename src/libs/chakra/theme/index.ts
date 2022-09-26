import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "system",
  useSystemColorMode: true,
  disableTransitionOnChange: false,
};

export default extendTheme({
  config,
  styles: {
    global: {
      body: {
        overflow: "overlay",
      },
    },
  },
  colors: {
    brand: {
      50: "#ffe4e4",
      100: "#feb4b4",
      200: "#fb8383",
      300: "#f95352",
      400: "#f82721",
      500: "#de1409",
      600: "#ad0d06",
      700: "#7c0604",
      800: "#4b0101",
      900: "#1d0000",
    },
  },
});

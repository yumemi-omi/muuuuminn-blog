import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

import foundations from "./foundations";

const config: ThemeConfig = {
  initialColorMode: "system",
  useSystemColorMode: true,
  disableTransitionOnChange: false,
};

const styles = {
  global: {
    body: {
      overflow: "overlay",
    },
  },
};

export default extendTheme({
  ...foundations,
  config,
  styles,
});

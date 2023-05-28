import colors from "./colors";
import components from "./components";

import type { MantineThemeOverride } from "@mantine/core";

const theme: MantineThemeOverride = {
  fontFamily: "inherit",
  colors,
  primaryColor: "light-coral",
  primaryShade: {
    light: 8,
    dark: 1,
  },
  globalStyles(theme) {
    return {
      ":root": {
        "--transition-duration-common": "200ms",
        "--transition-property-common":
          "background-color,border-color,color,fill,stroke,opacity,box-shadow,transform,background;",
      },
      body: {
        overflow: "overlay",
        // TODO: #1f3134と#f3f3f3を定義する
        background: theme.colorScheme === "dark" ? "#1f3134" : "#f3f3f3",
        transitionProperty: "var(--transition-property-common)",
        transitionDuration: "var(--transition-duration-common)",
      },
    };
  },
  components,
};

export default theme;

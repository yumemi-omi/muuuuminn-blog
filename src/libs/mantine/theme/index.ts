import { MantineThemeOverride } from "@mantine/core";

import colors from "./colors";
import components from "./components";

const theme: MantineThemeOverride = {
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
        color:
          theme.colorScheme === "dark"
            ? theme.colors["light-coral"][1]
            : theme.colors["light-coral"][8],
        // TODO: #1f3134と#f3f3f3を定義する
        background: theme.colorScheme === "dark" ? "#1f3134" : "#f3f3f3",
      },
    };
  },
  components,
};

export default theme;

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
  globalStyles(_theme) {
    return {
      ":root": {
        "--transition-duration-common": "200ms",
        "--transition-property-common":
          "background-color,border-color,color,fill,stroke,opacity,box-shadow,transform,background;",
      },
    };
  },
  components,
};

export default theme;

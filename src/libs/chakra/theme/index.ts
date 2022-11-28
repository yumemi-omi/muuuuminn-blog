import { extendTheme } from "@chakra-ui/react";

import componentStyles from "./componentStyles";
import foundations from "./foundations";
import globalStyles from "./globalStyles";
import themeConfig from "./themeConfig";

export default extendTheme({
  config: themeConfig,
  ...foundations,
  styles: globalStyles,
  components: componentStyles,
});

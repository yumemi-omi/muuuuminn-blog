import { Styles } from "@chakra-ui/theme-tools";

const globalStyles: Styles = {
  global: (props) => ({
    body: {
      overflow: "overlay",
      color: props.colorMode === "dark" ? "brand.50" : "brand.800",
      // TODO: #1f3134と#f3f3f3を定義する
      background: props.colorMode === "dark" ? "#1f3134" : "#f3f3f3",
    },
  }),
};

export default globalStyles;

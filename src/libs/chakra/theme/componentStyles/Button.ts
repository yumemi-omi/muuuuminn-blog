import { ComponentStyleConfig } from "@chakra-ui/react";

/**
 * ButtonとIconButtonでスタイルを共有
 */
const Button: ComponentStyleConfig = {
  variants: {
    outline: ({ colorMode }) => ({
      // TODO: #fec8c8を定義する
      color: colorMode === "dark" ? "#fec8c8" : "#brand.800",
    }),
  },
  defaultProps: {
    colorScheme: "brand",
  },
};

export default Button;

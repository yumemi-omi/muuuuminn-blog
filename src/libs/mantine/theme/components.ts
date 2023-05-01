import { MantineThemeOverride } from "@mantine/core";

const components: MantineThemeOverride["components"] = {
  ActionIcon: {
    defaultProps: {
      variant: "outline",
      radius: "sm",
    },
    styles: (theme) => ({
      /**
       * workaround: primaryColorで設定しても適用されない
       * defaultPropsでcolorを指定しても、variantがoutlineだと適用されない。そのためstyleで直接設定する
       */
      root: {
        "--var-action-icon-color":
          theme.colorScheme === "dark"
            ? theme.colors["light-coral"][1]
            : theme.colors["light-coral"][8],
        color: "var(--var-action-icon-color)",
        borderColor: "var(--var-action-icon-color)",
      },
    }),
  },
  Badge: {
    styles: (theme) => ({
      /**
       * workaround: primaryColorで設定しても適用されない
       * defaultPropsでcolorを指定しても、variantがoutlineだと適用されない。そのためstyleで直接設定する
       */
      root: {
        "--var-badge-color":
          theme.colorScheme === "dark"
            ? theme.colors["light-coral"][1]
            : theme.colors["light-coral"][8],
        color: "var(--var-badge-color)",
        boxShadow: "inset 0 0 0px 1px var(--var-badge-color)",
        border: "none",
      },
    }),
  },
};

export default components;

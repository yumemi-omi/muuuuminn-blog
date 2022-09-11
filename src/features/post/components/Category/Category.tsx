import { TextProps } from "@chakra-ui/react";
import { FC } from "react";

import { Text } from "@/libs/chakra";

type CategoryProps = TextProps & {
  category: { name: string; id: string };
};

export const Category: FC<CategoryProps> = ({ category, ...rest }) => {
  return (
    <Text _hover={{ textDecoration: "underline" }} noOfLines={1} {...rest}>
      {category.name}
    </Text>
  );
};

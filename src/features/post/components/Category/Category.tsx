import { TextProps, Badge } from "@chakra-ui/react";
import { FC } from "react";

import { Text } from "@/libs/chakra";

type CategoryProps = TextProps & {
  category: { name: string; id: string };
};

export const Category: FC<CategoryProps> = ({ category, ...rest }) => {
  return (
    <Badge _hover={{ textDecoration: "underline" }} noOfLines={1} color={"brand.100"} {...rest}>
      {category.name}
    </Badge>
  );
};

import { TextProps, Badge } from "@chakra-ui/react";
import { FC } from "react";

type CategoryProps = TextProps & {
  category: { name: string; id: string };
};

export const Category: FC<CategoryProps> = ({ category, ...rest }) => {
  return (
    <Badge _hover={{ textDecoration: "underline" }} noOfLines={1} {...rest}>
      {category.name}
    </Badge>
  );
};

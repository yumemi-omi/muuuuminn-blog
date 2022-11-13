import { TextProps, Badge } from "@chakra-ui/react";
import { FC, ReactNode } from "react";

import { CustomNextLink } from "@/libs/next";

type CategoryProps = TextProps & {
  category: { name: string; id: string };
  asLink?: boolean;
};

export const Category: FC<CategoryProps> = ({ category, asLink = false, ...rest }) => {
  return (
    <Wrapper asLink={asLink} category={category}>
      <Badge
        _hover={{ textDecoration: "underline" }}
        noOfLines={1}
        w={"100px"}
        maxWidth={"100px"}
        fontSize={"sm"}
        {...rest}
      >
        {category.name}
      </Badge>
    </Wrapper>
  );
};

type WrapperProps = {
  children: ReactNode;
  asLink: boolean;
  category: { name: string; id: string };
};

const Wrapper: FC<WrapperProps> = ({ children, category, asLink }) =>
  asLink ? (
    <CustomNextLink href={`?category=${category.id}`} prefetch={false}>
      {children}
    </CustomNextLink>
  ) : (
    <>{children}</>
  );

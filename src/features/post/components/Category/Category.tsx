import { TextProps, Badge } from "@chakra-ui/react";
import { FC, ReactNode } from "react";

import { CustomNextLink } from "@/libs/next";

import { CategoryType } from "../../type/post";

type CategoryProps = TextProps & {
  category: CategoryType;
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
  category: CategoryType;
};

const Wrapper: FC<WrapperProps> = ({ children, category, asLink }) =>
  asLink ? (
    <CustomNextLink href={`/posts?category=${category.id}`} prefetch={false}>
      {children}
    </CustomNextLink>
  ) : (
    <>{children}</>
  );

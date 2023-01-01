import { TextProps, Badge, useColorMode } from "@chakra-ui/react";
import { FC, ReactNode } from "react";

import { CategoryType } from "@/features/post/subFeatures/category/types";
import { CustomNextLink } from "@/libs/next";

type CategoryProps = TextProps & {
  category: CategoryType;
  asLink?: boolean;
};

export const Category: FC<CategoryProps> = ({ category, asLink = false, ...rest }) => {
  const { colorMode } = useColorMode();

  return (
    <Wrapper asLink={asLink} category={category}>
      <Badge
        _hover={{ textDecoration: "underline" }}
        noOfLines={1}
        w={"100px"}
        maxWidth={"100px"}
        fontSize={"sm"}
        // TODO: いい感じの色の管理をする！
        sx={{
          "--new-badge-color": colorMode === "dark" ? "#fec8c8" : "colors.brand.800",
          boxShadow: "inset 0 0 0px 1px var(--new-badge-color)",
          color: "var(--new-badge-color)",
        }}
        variant={"outline"}
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
    <CustomNextLink href={`/posts?category=${category.name}`} prefetch={false} shallow>
      {children}
    </CustomNextLink>
  ) : (
    <>{children}</>
  );

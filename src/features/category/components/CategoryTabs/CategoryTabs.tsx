import { useColorMode, ColorMode } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FC, useCallback, useMemo } from "react";

import { CategoryType } from "@/features/category/types";
import { Box, BoxProps, HStack } from "@/libs/chakra";
import { CustomNextLink } from "@/libs/next";

type CategoryTabsProps = BoxProps & {
  categories: CategoryType[];
};

export const CategoryTabs: FC<CategoryTabsProps> = ({ categories }) => {
  const { colorMode } = useColorMode();
  const router = useRouter();
  const categoryNameAsQuery = (router.query.category_name as string) || "";

  const tabList = useMemo(
    () => [{ id: "-1", name: "All", color: "" }, ...categories],
    [categories],
  );

  const getBorderStyle = useCallback(
    (colorMode: ColorMode, tab: CategoryType) => {
      if (tab.id === "-1") {
        return !categoryNameAsQuery
          ? colorMode === "dark"
            ? "#fec8c8"
            : "brand.800"
          : "transparent";
      } else {
        return tab.name.toLowerCase() === categoryNameAsQuery
          ? colorMode === "dark"
            ? "#fec8c8"
            : "brand.800"
          : "transparent";
      }
    },
    [categoryNameAsQuery],
  );

  const getHref = useCallback((tab: CategoryType) => {
    if (tab.id === "-1") {
      return `/posts`;
    } else {
      return `/posts/${tab.name.toLowerCase()}`;
    }
  }, []);

  return (
    <Box>
      <HStack as={"ul"} overflowX="scroll" listStyleType={"none"}>
        {tabList.map((tab) => (
          <Box
            as={"li"}
            id={`${tab.id}`}
            key={tab.id}
            transition="0.2s"
            _hover={{
              borderColor: colorMode === "dark" ? "#fec8c82e" : "#473a392e",
            }}
            borderColor={getBorderStyle(colorMode, tab)}
            borderBottomWidth={"2px"}
          >
            <CustomNextLink
              key={tab.id}
              href={getHref(tab)}
              display={"block"}
              paddingX={"4"}
              paddingY={"2"}
              _hover={{
                textDecoration: "none",
              }}
            >
              {tab.name}
            </CustomNextLink>
          </Box>
        ))}
      </HStack>
    </Box>
  );
};

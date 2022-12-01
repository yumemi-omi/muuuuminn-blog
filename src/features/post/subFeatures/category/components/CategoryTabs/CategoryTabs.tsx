import { Tabs, TabList, Tab, TabPanels, useColorMode } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FC, useCallback, useMemo } from "react";

import { CategoryType } from "@/features/post/subFeatures/category/types";
import { BoxProps } from "@/libs/chakra";

type CategoryTabsProps = BoxProps & {
  categories: CategoryType[];
};

export const CategoryTabs: FC<CategoryTabsProps> = ({ categories }) => {
  const { colorMode } = useColorMode();
  const router = useRouter();
  const categoryNameAsQuery = (router.query.category as string) || "";

  const selectedCategory = useMemo(
    () => categories.find((category) => category.name === categoryNameAsQuery),
    [categories, categoryNameAsQuery],
  );

  const tabList = useMemo(() => [{ id: "-1", name: "All" }, ...categories], [categories]);

  const selectedTabIndex = useMemo(() => {
    const foundCategoryTabIndex = tabList.findIndex((tab) => tab.name === selectedCategory?.name);
    return foundCategoryTabIndex === -1 ? 0 : foundCategoryTabIndex;
  }, [tabList, selectedCategory]);

  const handleChangeTab = useCallback(
    (index: number) => {
      const category = tabList[index].name;
      if (category === "All") {
        router.replace("", undefined, { shallow: true });
      } else {
        router.replace(`?category=${category}`, undefined, { shallow: true });
      }
    },
    [tabList, router],
  );

  return (
    <Tabs
      size={{ base: "sm", md: "md" }}
      onChange={handleChangeTab}
      variant="unstyled"
      index={selectedTabIndex}
      overflowX="scroll"
    >
      <TabList>
        {tabList.map((tab) => (
          <Tab
            backgroundColor={"transparent"}
            _selected={{
              borderColor: colorMode === "dark" ? "#fec8c8" : "brand.800",
            }}
            _hover={{
              borderColor: colorMode === "dark" ? "#fec8c82e" : "#473a392e",
            }}
            borderColor={"transparent"}
            borderBottomWidth={"2px"}
            borderRadius={"none"}
            id={`${tab.id}`}
            key={tab.id}
          >
            {tab.name}
          </Tab>
        ))}
      </TabList>
      <TabPanels>1</TabPanels>
    </Tabs>
  );
};

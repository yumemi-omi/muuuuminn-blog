import { Tabs, TabList, Tab, TabPanels } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FC, useCallback, useMemo } from "react";

import { CategoryType } from "@/features/post/subFeatures/category/types";
import { BoxProps } from "@/libs/chakra";

type CategoryTabsProps = BoxProps & {
  categories: CategoryType[];
};

export const CategoryTabs: FC<CategoryTabsProps> = ({ categories }) => {
  const router = useRouter();
  const categoryNameAsQuery = (router.query.category as string) || "";

  const selectedCategory = useMemo(
    () => categories.find((category) => category.name === categoryNameAsQuery),
    [categories, categoryNameAsQuery],
  );

  const tabList = useMemo(() => [{ id: "0", name: "All" }, ...categories], [categories]);

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
    <Tabs onChange={handleChangeTab} variant="enclosed" index={selectedTabIndex}>
      <TabList>
        {tabList.map((tab, index) => (
          <Tab id={`${index}`} key={index}>
            {tab.name}
          </Tab>
        ))}
      </TabList>
      <TabPanels>1</TabPanels>
    </Tabs>
  );
};

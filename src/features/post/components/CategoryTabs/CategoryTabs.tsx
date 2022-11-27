import { Tabs, TabList, Tab, TabPanels } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FC } from "react";

import { BoxProps } from "@/libs/chakra";

import { CategoryType } from "../../type/post";

type CategoryTabsProps = BoxProps & {
  categories: CategoryType[];
};

export const CategoryTabs: FC<CategoryTabsProps> = ({ categories }) => {
  const router = useRouter();

  const categoryNameAsQuery = (router.query.category as string) || "";
  const selectedCategory = categories.find((category) => category.name === categoryNameAsQuery);

  const tabList = [{ id: "0", name: "All" }, ...categories];
  const defaultIndex = tabList.findIndex((tab) => tab.name === selectedCategory?.name) ?? 0;

  const handleChangeTab = (index: number) => {
    const category = tabList[index].name;
    if (category === "All") {
      router.replace("", undefined, { shallow: true });
    } else {
      router.replace(`?category=${category}`, undefined, { shallow: true });
    }
  };

  return (
    <Tabs onChange={handleChangeTab} defaultIndex={defaultIndex} variant="enclosed">
      <TabList>
        {tabList.map((tab) => (
          <Tab key={tab.id}>{tab.name}</Tab>
        ))}
      </TabList>
      <TabPanels>1</TabPanels>
    </Tabs>
  );
};

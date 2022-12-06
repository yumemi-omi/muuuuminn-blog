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
  const tagNameAsQuery = (router.query.tag as string) || "";

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
      // TODO: クエリ作成を関数化する
      const params = new URLSearchParams();
      if (tagNameAsQuery) {
        params.append("tag", tagNameAsQuery);
      }

      const categoryName = tabList[index].name;
      if (categoryName !== "All") {
        params.append("category", categoryName);
      }

      const searchParams = params.toString();
      const urlSuffix = searchParams ? `/?${searchParams}` : "";

      router.replace(`/posts${urlSuffix}`, undefined, { shallow: true });
    },
    [tabList, router, tagNameAsQuery],
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

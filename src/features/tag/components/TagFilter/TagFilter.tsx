import { Select } from "@mantine/core";
import { useRouter } from "next/router";
import { FC, memo, useCallback } from "react";

import { TagType } from "@/features/tag/types";
import { useTranslation } from "@/libs/i18n";
import { Flex } from "@/libs/mantine/layout";
import { Text } from "@/libs/mantine/typography";

type TagFilterProps = {
  tags: TagType[];
};

const _TagFilter: FC<TagFilterProps> = ({ tags }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const categoryNameAsQuery = (router.query.category_name as string) || "";
  const tagNameAsQuery = (router.query.tag as string) || "";

  const onChange = useCallback(
    (e: string | null) => {
      // TODO: クエリ作成を関数化する
      const params = new URLSearchParams();
      const tagName = e;
      if (tagName) {
        params.append("tag", tagName);
      }
      const searchParams = params.toString();
      const urlSuffix = searchParams ? `/?${searchParams}` : "";

      if (categoryNameAsQuery) {
        void router.replace(`/posts/${categoryNameAsQuery}${urlSuffix}`, undefined, {
          shallow: true,
        });
      } else {
        void router.replace(`/posts${urlSuffix}`, undefined, { shallow: true });
      }
    },
    [router, categoryNameAsQuery],
  );

  return (
    <Flex align={"center"} gap={2}>
      <Select
        clearable
        data={[
          { value: "", label: t.COMPONENTS.TAG.PLACEHOLDER },
          ...tags.map((tag) => ({ value: tag.name, label: tag.name })),
        ]}
        onChange={onChange}
        placeholder={t.COMPONENTS.TAG.PLACEHOLDER}
        searchable
        size={"xs"}
        styles={(theme) => ({
          fontSize: "16px",
          transform: "scale(0.8)",
          item: {
            // applies styles to selected item
            "&[data-selected]": {
              "&, &:hover": {
                color: theme.colorScheme === "dark" ? theme.black : theme.white,
              },
            },
          },
        })}
        value={tagNameAsQuery}
        w={"100%"}
      />
      <Text fz={"xs"} sx={{ flexShrink: 0 }}>
        {t.COMPONENTS.TAG.LABEL}
      </Text>
    </Flex>
  );
};

export const TagFilter = memo(_TagFilter);

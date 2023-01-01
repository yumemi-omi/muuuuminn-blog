import { Select } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ChangeEvent, FC, memo, useCallback } from "react";

import { TagType } from "@/features/post/subFeatures/tag/types";
import { Flex, Text } from "@/libs/chakra";
import { useTranslation } from "@/libs/i18n";

type TagFilterProps = {
  tags: TagType[];
};

const _TagFilter: FC<TagFilterProps> = ({ tags }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const categoryNameAsQuery = (router.query.category as string) || "";
  const tagNameAsQuery = (router.query.tag as string) || "";

  const onChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      // TODO: クエリ作成を関数化する
      const params = new URLSearchParams();
      if (categoryNameAsQuery) {
        params.append("category", categoryNameAsQuery);
      }
      const tagName = e.target.value;
      if (tagName) {
        params.append("tag", tagName);
      }
      const searchParams = params.toString();
      const urlSuffix = searchParams ? `/?${searchParams}` : "";

      router.replace(`/posts${urlSuffix}`, undefined, { shallow: true });
    },
    [router, categoryNameAsQuery],
  );

  return (
    <Flex alignItems={"center"} gap={2} justifyContent={"center"}>
      <Select
        onChange={onChange}
        size={"xs"}
        placeholder={t.COMPONENTS.TAG.PLACEHOLDER}
        value={tagNameAsQuery}
      >
        {tags.map((tag) => (
          <option key={tag.name} value={tag.name}>
            {tag.name}
          </option>
        ))}
      </Select>
      <Text fontSize={"xs"} flexShrink={0}>
        {t.COMPONENTS.TAG.LABEL}
      </Text>
    </Flex>
  );
};

export const TagFilter = memo(_TagFilter);

import { Select } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ChangeEvent, FC, memo, useCallback } from "react";

import { TagType } from "@/features/tag/types";
import { Flex, Text } from "@/libs/chakra";
import { useTranslation } from "@/libs/i18n";

type TagFilterProps = {
  tags: TagType[];
};

const _TagFilter: FC<TagFilterProps> = ({ tags }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const categoryNameAsQuery = (router.query.category_name as string) || "";
  const tagNameAsQuery = (router.query.tag as string) || "";

  const onChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      // TODO: クエリ作成を関数化する
      const params = new URLSearchParams();
      const tagName = e.target.value;
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
    <Flex alignItems={"center"} gap={2} justifyContent={"center"}>
      <Select
        onChange={onChange}
        placeholder={t.COMPONENTS.TAG.PLACEHOLDER}
        size={"xs"}
        value={tagNameAsQuery}
      >
        {tags.map((tag) => (
          <option key={tag.name} value={tag.name}>
            {tag.name}
          </option>
        ))}
      </Select>
      <Text flexShrink={0} fontSize={"xs"}>
        {t.COMPONENTS.TAG.LABEL}
      </Text>
    </Flex>
  );
};

export const TagFilter = memo(_TagFilter);

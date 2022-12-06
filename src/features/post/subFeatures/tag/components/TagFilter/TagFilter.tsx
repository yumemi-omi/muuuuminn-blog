import { Select } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ChangeEvent, FC, memo, useCallback } from "react";

import { TagType } from "@/features/post/subFeatures/tag/types";

type TagFilterProps = {
  tags: TagType[];
};

const _TagFilter: FC<TagFilterProps> = ({ tags }) => {
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
    <Select
      onChange={onChange}
      marginTop={2}
      size="xs"
      placeholder="タグを選択して絞り込み"
      value={tagNameAsQuery}
    >
      {tags.map((tag) => (
        <option key={tag.name} value={tag.name}>
          {tag.name}
        </option>
      ))}
    </Select>
  );
};

export const TagFilter = memo(_TagFilter);

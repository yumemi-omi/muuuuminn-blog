import { FC, useCallback, useEffect, useMemo, useRef, useState, memo } from "react";

import { TagType } from "@/features/tag/types";
import { BoxProps, Box } from "@/libs/chakra";

import { Tag } from "./Tag";
import { TagMenu } from "./TagMenu";

type NoWrapTagListProps = BoxProps & {
  tags: TagType[];
  tagProps?: {
    shallow?: boolean;
    replace?: boolean;
  };
};

const _NoWrapTagList: FC<NoWrapTagListProps> = ({ tags, tagProps, ...boxProps }) => {
  const childrenWrapper = useRef<HTMLDivElement>(null);
  const [visibilityMap, setVisibilityMap] = useState<Record<string, boolean>>({});

  const lastVisibleTagIndex = useMemo(
    () => Object.values(visibilityMap).findIndex((v) => !v) - 1,
    [visibilityMap],
  );

  const invisibleTags = useMemo(() => {
    const invisibleTags = [...tags.filter((tag) => !visibilityMap[tag.id])];
    return [tags[lastVisibleTagIndex], ...invisibleTags];
  }, [tags, visibilityMap, lastVisibleTagIndex]);

  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    const updatedEntries: Record<string, boolean> = {};
    entries.forEach((entry) => {
      if (entry.target) {
        const targetId = (entry.target as HTMLElement).id as string;
        if (entry.isIntersecting) {
          updatedEntries[targetId] = true;
        } else {
          updatedEntries[targetId] = false;
        }
      }
    });
    setVisibilityMap((prev) => ({
      ...prev,
      ...updatedEntries,
    }));
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 1,
    });
    if (childrenWrapper.current) {
      Array.from(childrenWrapper.current.children).forEach((item) => {
        observer.observe(item);
      });
    }
    return () => observer.disconnect();
  }, [handleIntersection]);

  return (
    <Box ref={childrenWrapper} display={"flex"} gap={2} width={"max-content"} {...boxProps}>
      {tags.map((tag, index) => {
        const isVisibleTag = visibilityMap[tag.id];
        return (
          <Box
            key={tag.id}
            id={tag.id}
            flexShrink={0}
            // タグがひとつであれば、省略せずに全表示する
            width={tags.length === 1 ? "full" : "90px"}
            height={6}
          >
            {index === lastVisibleTagIndex ? (
              <TagMenu tags={invisibleTags} countsOfTagInMenu={invisibleTags.length} />
            ) : (
              <Tag {...tagProps} tag={tag} visibility={isVisibleTag ? "visible" : "hidden"} />
            )}
          </Box>
        );
      })}
    </Box>
  );
};

export const NoWrapTagList = memo(_NoWrapTagList);

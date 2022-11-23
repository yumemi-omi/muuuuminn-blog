import { FC, useCallback, useEffect, useMemo, useRef, useState, MouseEvent, memo } from "react";

import { TagType } from "@/features/post/type/post";
import { BoxProps, Box } from "@/libs/chakra";

import { Tag } from "./Tag";

type TagListProps = BoxProps & {
  tags: TagType[];
  tagProps?: BoxProps;
};

const _NoWrapTagList: FC<TagListProps> = ({ tags, tagProps, ...boxProps }) => {
  const childrenWrapper = useRef<HTMLDivElement>(null);
  const [visibilityMap, setVisibilityMap] = useState<Record<string, boolean>>({});

  const lastVisibleTagIndex = useMemo(
    () => Object.values(visibilityMap).findIndex((v) => !v) - 1,
    [visibilityMap],
  );
  const invisibleTagCounts = useMemo(
    () => Object.values(visibilityMap).filter((v) => !v).length + 1,
    [visibilityMap],
  );

  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    const updatedEntries: Record<string, boolean> = {};
    entries.forEach((entry) => {
      if (entry.target) {
        const targetid = (entry.target as HTMLElement).id as string;
        if (entry.isIntersecting) {
          updatedEntries[targetid] = true;
        } else {
          updatedEntries[targetid] = false;
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

  const [isShownMenu, setIsShownMenu] = useState(false);

  const onMouseEnter = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsShownMenu(true);
  }, []);

  const onMouseLeave = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsShownMenu(false);
  }, []);

  return (
    <Box ref={childrenWrapper} display={"flex"} gap={2} width={"max-content"} {...boxProps}>
      {tags.map((tag, index) => {
        const isVisibleTag = visibilityMap[tag.id];
        return (
          <Tag
            tag={tag}
            key={tag.id}
            id={tag.id}
            transformTagMenu={index === lastVisibleTagIndex}
            countsOfTagInMenu={invisibleTagCounts}
            visibility={isVisibleTag ? "visible" : "hidden"}
            flexShrink={0}
            // SEで2つタグが見えるギリギリのサイズ
            width={"78px"}
            {...tagProps}
          />
        );
      })}
    </Box>
  );
};

export const NoWrapTagList = memo(_NoWrapTagList);

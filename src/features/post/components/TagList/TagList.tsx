import { Tag, TagProps } from "@chakra-ui/react";
import { FC, useCallback, useEffect, useMemo, useRef, useState, MouseEvent } from "react";

import { Text, FlexProps, Box } from "@/libs/chakra";
import { CustomNextLink } from "@/libs/next";

type TagListProps = FlexProps & {
  tags: { name: string; id: string }[];
  tagProps?: TagProps;
};

export const TagList: FC<TagListProps> = ({ tags, tagProps, ...flexProps }) => {
  const childrenWrapper = useRef<HTMLDivElement>(null);

  const [visibilityMap, setVisibilityMap] = useState<Record<string, boolean>>({});
  const [isShownMenu, setIsShownMenu] = useState(false);

  const lastInvisibleToolButtonIndex = useMemo(
    () => Object.values(visibilityMap).findIndex((v) => !v),
    [visibilityMap],
  );

  const onMouseEnter = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsShownMenu(true);
  }, []);

  const onMouseLeave = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsShownMenu(false);
  }, []);

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
      root: document.body,
      threshold: 1,
    });

    if (childrenWrapper.current) {
      Array.from(childrenWrapper.current.children).forEach((item) => {
        observer.observe(item);
      });
    }

    return () => observer.disconnect();
  }, [handleIntersection]);

  console.log(visibilityMap);

  return (
    <Box ref={childrenWrapper} display={"flex"} gap={"2"} {...flexProps}>
      {tags.map(
        (tag, index) =>
          index <= 4 && (
            <CustomNextLink id={tag.id} href={`/posts?tag=${tag.id}`} key={tag.id} prefetch={false}>
              <Tag {...tagProps}>
                <Text noOfLines={1}>{tag.name}</Text>
              </Tag>
            </CustomNextLink>
          ),
      )}
    </Box>
  );
};

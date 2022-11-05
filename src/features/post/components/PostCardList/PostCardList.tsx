import { useVirtualizer } from "@tanstack/react-virtual";
import { FC, LegacyRef, useEffect, useRef } from "react";

import { PostCard } from "@/features/post/components/PostCard";
import { PostType } from "@/features/post/type/post";
import { Box, Grid, GridItem } from "@/libs/chakra";

import { useInfinitePosts } from "../../hooks/useInfinitePosts";

type PostCardListProps = {
  posts: PostType[];
};

export const PostCardList: FC<PostCardListProps> = ({ posts }) => {
  const { error, isFetching, isFetchingNextPage, hasNextPage } = useInfinitePosts();

  const allRows = posts ? posts : [];
  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: hasNextPage ? allRows.length + 1 : allRows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 185,
    overscan: 5,
  });

  return (
    <Box overflow={"scroll"} h={"400px"} ref={parentRef}>
      <Box position={"relative"} h={`${rowVirtualizer.getTotalSize()}px`}>
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const isLoaderRow = virtualRow.index > allRows.length - 1;
          const post = allRows[virtualRow.index];
          return (
            <Box
              position={"absolute"}
              w={"max"}
              top={0}
              left={0}
              transform={`translateY(${virtualRow.start}px)`}
              h={`${virtualRow.size}px`}
              key={virtualRow.index}
            >
              {isLoaderRow ? (
                hasNextPage ? (
                  "Loading more..."
                ) : (
                  "Nothing more to load"
                )
              ) : (
                <PostCard post={post} />
              )}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

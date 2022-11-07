import { number } from "@recoiljs/refine";
import { FC, useCallback, useEffect, useMemo, useRef } from "react";
import { ListRange, Virtuoso } from "react-virtuoso";
import { useRecoilState } from "recoil";
import { syncEffect } from "recoil-sync";
import { initializableAtomFamily } from "recoil-sync-next";

import { PostCard } from "@/features/post/components/PostCard";
import { Box } from "@/libs/chakra";

import { useInfinitePosts } from "../../hooks/useInfinitePosts";

export const scrollPosition = initializableAtomFamily<number, string>({
  key: "scrollPositionState",
  effects: [
    syncEffect({
      storeKey: "ui-state",
      refine: number(),
    }),
  ],
});

type PostCardListProps = {};

export const PostCardList: FC<PostCardListProps> = () => {
  const { error, isFetching, isFetchingNextPage, hasNextPage, fetchNextPage, posts } =
    useInfinitePosts();

  const once = useRef(true);
  useEffect(() => {
    once.current = false;
    return () => {
      once.current = true;
    };
  }, []);

  const [scrollY, setScrollY] = useRecoilState(scrollPosition("postList", 0));
  const initialIndex = useMemo(() => {
    if (once && scrollY !== 0) {
      return scrollY;
    }
    return 0;
  }, [scrollY]);

  const rangeChanged = useCallback(
    (range: ListRange) => {
      if (range) {
        setScrollY(range.startIndex);
      }
    },
    [setScrollY],
  );

  return (
    <Box>
      <Virtuoso
        data={posts}
        overscan={10}
        useWindowScroll
        initialTopMostItemIndex={initialIndex}
        endReached={() => fetchNextPage()}
        totalCount={posts.length}
        itemContent={(_index, post) => <PostCard post={post} />}
        rangeChanged={rangeChanged}
      />
    </Box>
  );
};

import { number } from "@recoiljs/refine";
import { FC, useCallback, useEffect, useMemo, useRef } from "react";
import { ListRange, Virtuoso, VirtuosoHandle } from "react-virtuoso";
import { FixedSizeList as List } from "react-window";
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
  // const initialIndex = useMemo(() => {
  //   if (once && scrollY !== 0) {
  //     return scrollY;
  //   }
  //   return 0;
  // }, [scrollY]);

  // const rangeChanged = useCallback(
  //   (range: ListRange) => {
  //     if (range) {
  //       setScrollY(range.startIndex);
  //     }
  //   },
  //   [setScrollY],
  // );

  // const listRef = useRef<HTMLElement | Window | null>(null);
  // const handleScroll = useCallback(
  //   (e: Event) => {
  //     if (listRef.current && "nodeType" in listRef.current) {
  //       console.log({ setScroll: listRef.current });
  //       setScrollY(listRef.current.scrollTop);
  //     }
  //   },
  //   [setScrollY],
  // );
  // const scrollerRef = useCallback((element: HTMLElement | Window | null) => {
  //   console.log({ element });
  //   listRef.current = element;
  // }, []);
  // useEffect(() => {
  //   if (listRef.current) {
  //     listRef.current.addEventListener("click", handleScroll);
  //   }
  //   return () => {
  //     if (listRef.current) {
  //       listRef.current.removeEventListener("click", handleScroll);
  //     }
  //   };
  // }, [handleScroll]);

  const handleScroll2 = useCallback(() => {
    if (window && window.screenY !== 0) {
      setScrollY(window.scrollY);
      console.log({ window }, window.scrollY);
    }
  }, [setScrollY]);
  useEffect(() => {
    if (window) {
      window.addEventListener("mousedown", handleScroll2);
    }
    return () => {
      if (window) {
        window.removeEventListener("mousedown", handleScroll2);
      }
    };
  }, [handleScroll2]);
  useEffect(() => {
    console.log({ scrollY: scrollY });
    if (window && scrollY !== 0) {
      window.scrollTo({ top: scrollY });
    }
  }, [scrollY]);

  // const virtuosoRef = useRef<VirtuosoHandle>(null);
  // const scrolling = useCallback(() => {
  //   const virtuosoEle = virtuosoRef.current;
  //   if (virtuosoEle) {
  //     console.log({ windowY: scrollY });
  //     virtuosoEle.scrollTo({ top: scrollY });
  //   }
  // }, [scrollY]);
  // useEffect(() => {
  //   const virtuosoEle = virtuosoRef.current;
  //   console.log({ windowY: scrollY });
  //   if (virtuosoEle && scrollY !== 0) {
  //     virtuosoEle.scrollTo({ top: scrollY });
  //   }
  // }, [scrollY]);

  return (
    <Box>
      <Virtuoso
        // ref={virtuosoRef}
        data={posts}
        overscan={10}
        useWindowScroll={true}
        computeItemKey={(_, post) => post.id}
        // initialTopMostItemIndex={{ align: "start", index: initialIndex }}
        endReached={() => fetchNextPage()}
        totalCount={posts.length}
        itemContent={(_index, post) => <PostCard post={post} />}
        // rangeChanged={rangeChanged}
        defaultItemHeight={240}
        // scrollerRef={scrollerRef}
        // initialScrollTop={scrollY}
      />
      {/* <List
        height={400}
        itemCount={posts.length}
        itemSize={190}
        width={"100%"}
        // onScroll={({ scrollDirection, scrollOffset, scrollUpdateWasRequested }) =>
        //   console.log({ scrollDirection, scrollOffset, scrollUpdateWasRequested })
        // }
        onItemsRendered={({
          overscanStartIndex,
          overscanStopIndex,
          visibleStartIndex,
          visibleStopIndex,
        }) =>
          console.log({
            overscanStartIndex,
            overscanStopIndex,
            visibleStartIndex,
            visibleStopIndex,
          })
        }
        ref={listRef}
      >
        {({ index }) => <PostCard post={posts[index]} />}
      </List> */}
    </Box>
  );
};

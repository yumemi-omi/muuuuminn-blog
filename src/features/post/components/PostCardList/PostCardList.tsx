import { number } from "@recoiljs/refine";
import { useCallback, useRef } from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList, ListOnScrollProps } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import { useRecoilState } from "recoil";
import { syncEffect } from "recoil-sync";
import { initializableAtomFamily } from "recoil-sync-next";

import { useInfinitePosts } from "../../hooks/useInfinitePosts";
import { PostCard } from "../PostCard";

export const scrollTop = initializableAtomFamily<number, string>({
  key: "scrollTopState",
  effects: [
    syncEffect({
      storeKey: "ui-state",
      refine: number(),
    }),
  ],
});

// TODO: スクロールがあることを示すために上下に矢印をabsoluteで置くか、ボカシをいれて示すかしたい
export const PostCardList = () => {
  const { posts, fetchNextPage, hasNextPage } = useInfinitePosts();

  const [scrollTopState, setScrollTopState] = useRecoilState(scrollTop("scrollParam", 0));
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const onScroll = useCallback(
    (scrollProps: ListOnScrollProps) => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(function () {
        setScrollTopState(scrollProps.scrollOffset);
      }, 100);
    },
    [setScrollTopState],
  );

  const checkIfPostLoaded = (index: number) => {
    return !hasNextPage || index < posts.length;
  };
  return (
    <InfiniteLoader
      isItemLoaded={checkIfPostLoaded}
      loadMoreItems={() => {
        fetchNextPage();
      }}
      itemCount={Infinity}
    >
      {({ onItemsRendered, ref }) => (
        <AutoSizer defaultHeight={201} ref={ref}>
          {({ height, width }) => (
            <FixedSizeList
              initialScrollOffset={scrollTopState}
              height={height}
              width={width}
              itemCount={posts.length}
              itemSize={201}
              onItemsRendered={onItemsRendered}
              onScroll={onScroll}
            >
              {({ index, style }) => {
                const post = posts[index];
                return <PostCard key={post.id} post={post} style={style} />;
              }}
            </FixedSizeList>
          )}
        </AutoSizer>
      )}
    </InfiniteLoader>
  );
};

import { number } from "@recoiljs/refine";
import { useCallback, useMemo } from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import { useRecoilState } from "recoil";
import { syncEffect } from "recoil-sync";
import { initializableAtomFamily } from "recoil-sync-next";

import { useInfinitePosts } from "../../hooks/useInfinitePosts";
import { PostCard } from "../PostCard";

export const virtualStartIndex = initializableAtomFamily<number, string>({
  key: "virtualStartIndexState",
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

  const [virtualStartIndexState, setVirtualStartIndexState] = useRecoilState(
    virtualStartIndex("virtualStartIndexParam", 0),
  );

  const initialScrollOffset = useMemo(() => {
    return virtualStartIndexState * 201;
  }, [virtualStartIndexState]);

  const checkIfPostLoaded = useCallback(
    (index: number) => {
      return !hasNextPage || index < posts.length;
    },
    [hasNextPage, posts],
  );

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
              initialScrollOffset={initialScrollOffset}
              height={height}
              width={width}
              itemCount={posts.length}
              itemSize={201}
              onItemsRendered={({ visibleStartIndex, ...rest }) => {
                setVirtualStartIndexState(visibleStartIndex);
                onItemsRendered({ visibleStartIndex, ...rest });
              }}
              // onScroll={onScroll}
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

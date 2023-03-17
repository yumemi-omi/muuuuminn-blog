import { number } from "@recoiljs/refine";
import { FC, memo, useCallback, useMemo, useRef } from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList, ListOnItemsRenderedProps } from "react-window";
import { useRecoilState } from "recoil";
import { syncEffect } from "recoil-sync";
import { initializableAtomFamily } from "recoil-sync-next";

import { PostListType } from "@/features/post/types";

import { PostCard } from "../PostCard";

type PostCardListProps = {
  posts: PostListType;
};

const POST_CARD_HEIGHT = 220;

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
const _PostCardList: FC<PostCardListProps> = ({ posts }) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [virtualStartIndexState, setVirtualStartIndexState] = useRecoilState(
    virtualStartIndex("virtualStartIndexParam", 0),
  );

  const onItemsRendered = useCallback(
    ({ visibleStartIndex }: ListOnItemsRenderedProps) => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(function () {
        setVirtualStartIndexState(visibleStartIndex);
      }, 200);
    },
    [setVirtualStartIndexState],
  );

  const initialScrollOffset = useMemo(() => {
    return virtualStartIndexState * POST_CARD_HEIGHT;
  }, [virtualStartIndexState]);

  return (
    <AutoSizer>
      {({ height, width }) => (
        <FixedSizeList
          height={height}
          initialScrollOffset={initialScrollOffset}
          itemCount={posts.length}
          itemSize={POST_CARD_HEIGHT}
          onItemsRendered={onItemsRendered}
          overscanCount={10}
          width={width}
        >
          {({ index, style }) => {
            const post = posts[index];
            return <PostCard key={post.slug} post={post} style={style} />;
          }}
        </FixedSizeList>
      )}
    </AutoSizer>
  );
};

export const PostCardList = memo(_PostCardList);

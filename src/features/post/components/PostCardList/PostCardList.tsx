import { number } from "@recoiljs/refine";
import { FC, memo, useMemo } from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList } from "react-window";
import { useRecoilState } from "recoil";
import { syncEffect } from "recoil-sync";
import { initializableAtomFamily } from "recoil-sync-next";

import { PostListType } from "../../type/post";
import { PostCard } from "../PostCard";

type PostCardListProps = {
  posts: PostListType;
};

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
  const [virtualStartIndexState, setVirtualStartIndexState] = useRecoilState(
    virtualStartIndex("virtualStartIndexParam", 0),
  );

  const initialScrollOffset = useMemo(() => {
    return virtualStartIndexState * 201;
  }, [virtualStartIndexState]);

  return (
    <AutoSizer defaultHeight={201}>
      {({ height, width }) => (
        <FixedSizeList
          initialScrollOffset={initialScrollOffset}
          height={height}
          width={width}
          itemCount={posts.length}
          itemSize={201}
          onItemsRendered={({ visibleStartIndex }) => {
            setVirtualStartIndexState(visibleStartIndex);
          }}
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

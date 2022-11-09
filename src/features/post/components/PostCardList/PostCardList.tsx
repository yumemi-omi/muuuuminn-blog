import { number } from "@recoiljs/refine";
import { FC, useRef, useMemo, useCallback, useEffect } from "react";
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
  const { fetchNextPage, posts } = useInfinitePosts();
  const [scrollY, setScrollY] = useRecoilState(scrollPosition("postList", 0));
  const once = useRef(true);

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

  useEffect(() => {
    once.current = false;
    return () => {
      once.current = true;
    };
  }, []);

  return (
    <Box id="restore-scroll-position-element">
      <Virtuoso
        data={posts}
        overscan={5}
        useWindowScroll
        computeItemKey={(_, post) => post.id}
        initialTopMostItemIndex={{ align: "start", index: initialIndex }}
        endReached={() => fetchNextPage()}
        totalCount={posts.length}
        itemContent={(_index, post) => <PostCard post={post} />}
        rangeChanged={rangeChanged}
        defaultItemHeight={240}
        // initialScrollTop={300}
      />
    </Box>
  );
};

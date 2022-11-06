import { FC, useEffect, useRef } from "react";
import { Virtuoso } from "react-virtuoso";

import { PostCard } from "@/features/post/components/PostCard";
import { PostType } from "@/features/post/type/post";
import { Box, Grid, GridItem } from "@/libs/chakra";

import { useInfinitePosts } from "../../hooks/useInfinitePosts";

type PostCardListProps = {
  posts: PostType[];
};

export const PostCardList: FC<PostCardListProps> = ({ posts }) => {
  const { error, isFetching, isFetchingNextPage, hasNextPage, fetchNextPage } = useInfinitePosts();

  return (
    <Box id="restore-scroll-position-element">
      <Virtuoso
        data={posts}
        useWindowScroll
        totalCount={200}
        itemContent={(_index, post) => <PostCard post={post} />}
        components={{
          Footer: () => <button onClick={() => fetchNextPage()}>load more</button>,
        }}
      />
    </Box>
  );
};

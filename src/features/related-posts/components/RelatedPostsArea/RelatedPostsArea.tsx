import { FC, memo } from "react";

import { PostCard } from "@/features/post/components";
import { PostListType } from "@/features/post/types";
import { Stack, Text } from "@/libs/chakra";
import { useTranslation } from "@/libs/i18n";

type RelatedPostsArea = {
  relatedPosts: PostListType;
};

const _RelatedPostsArea: FC<RelatedPostsArea> = ({ relatedPosts }) => {
  const { t } = useTranslation();
  return (
    <Stack>
      <Text as="h1" borderBottom={"2px solid #fec8c8"} fontSize={"lg"} fontWeight={"bold"}>
        {t.COMPONENTS.RELATED_POST_AREA.TITLE}
      </Text>
      {relatedPosts.map((relatedPost) => (
        <PostCard key={relatedPost.slug} post={relatedPost} />
      ))}
    </Stack>
  );
};

export const RelatedPostsArea = memo(_RelatedPostsArea);

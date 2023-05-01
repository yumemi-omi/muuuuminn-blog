import { Title } from "@mantine/core";
import { FC, memo } from "react";

import { PostCard } from "@/features/post/components";
import { PostListType } from "@/features/post/types";
import { useTranslation } from "@/libs/i18n";
import { Stack } from "@/libs/mantine/layout";

type RelatedPostsArea = {
  relatedPosts: PostListType;
};

const _RelatedPostsArea: FC<RelatedPostsArea> = ({ relatedPosts }) => {
  const { t } = useTranslation();
  return (
    <Stack>
      <Title
        fw={"bold"}
        fz={"lg"}
        sx={(theme) => ({
          borderBottom: `2px solid ${
            theme.colorScheme === "dark"
              ? theme.colors["light-coral"][1]
              : theme.colors["light-coral"][8]
          }`,
        })}
      >
        {t.COMPONENTS.RELATED_POST_AREA.TITLE}
      </Title>
      {relatedPosts.map((relatedPost) => (
        <PostCard key={relatedPost.slug} post={relatedPost} />
      ))}
    </Stack>
  );
};

export const RelatedPostsArea = memo(_RelatedPostsArea);

import { NextSeo, NextSeoProps } from "next-seo";
import { FC } from "react";

import { Policy } from "@/features/policy/type/policy";
import { Box } from "@/libs/chakra";
import { useTranslation } from "@/libs/i18n";
import { RichMarkdownContent } from "@/shared/components/RichMarkdownContent";

type Props = {
  policy: Policy;
};

export const PolicyPage: FC<Props> = ({ policy }) => {
  const { t } = useTranslation();
  const seo = {
    title: t.PAGE.POLICY,
    description: "プライバシーポリシー",
  } as NextSeoProps;

  return (
    <>
      <NextSeo {...seo} />
      <Box px={8}>
        <RichMarkdownContent html={policy.content} />
      </Box>
    </>
  );
};

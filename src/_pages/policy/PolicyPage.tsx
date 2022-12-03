import { FC } from "react";

import { Policy } from "@/features/policy/types";
import { Box } from "@/libs/chakra";
import { useTranslation } from "@/libs/i18n";
import { RichMarkdownContent } from "@/shared/components/RichMarkdownContent";
import { BasicSeo, BasicSeoProps } from "@/shared/components/Seo";

type Props = {
  policy: Policy;
};

export const PolicyPage: FC<Props> = ({ policy }) => {
  const { t } = useTranslation();
  const seo: BasicSeoProps = {
    title: t.PAGE.POLICY,
    description: "プライバシーポリシー",
    path: "/policy",
  };

  return (
    <>
      <BasicSeo {...seo} />
      <Box>
        <RichMarkdownContent html={policy.content} />
      </Box>
    </>
  );
};

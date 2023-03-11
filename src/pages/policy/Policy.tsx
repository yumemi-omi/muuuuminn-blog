import { FC } from "react";

import { PolicyType } from "@/features/policy/types";
import { Box } from "@/libs/chakra";
import { useTranslation } from "@/libs/i18n";
import { RichMarkdownContent } from "@/shared/components/RichMarkdownContent";
import { BasicSeo, BasicSeoProps } from "@/shared/components/Seo";

type PolicyProps = {
  policy: PolicyType;
};

export const Policy: FC<PolicyProps> = ({ policy }) => {
  const { t } = useTranslation();
  const seo: BasicSeoProps = {
    title: t.PAGE.POLICY,
    description: t.DESCRIPTION.POLICY,
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

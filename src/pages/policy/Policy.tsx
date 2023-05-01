import { FC } from "react";

import { PolicyType } from "@/features/policy/types";
import { useTranslation } from "@/libs/i18n";
import { Box } from "@/libs/mantine/layout";
import { BasicSeo, BasicSeoProps, RichMarkdownContent } from "@/shared/components";

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

import { NextSeo, NextSeoProps } from "next-seo";
import { FC } from "react";

import { Policy } from "@/features/policy/type/policy";
import { useTranslation } from "@/libs/i18n";

type Props = {
  policy: Policy;
};

export const PolicyPage: FC<Props> = ({ policy }) => {
  const { t } = useTranslation();
  const seo = {
    title: t.PAGE.POLICY,
    description: "プライバシーポリシー",
  } as NextSeoProps;
  console.log({ policy });
  return (
    <>
      <NextSeo {...seo} />
      {policy.content}
    </>
  );
};

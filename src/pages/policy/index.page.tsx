import { PolicyType } from "@/features/policy/types";
import { getMarkdownFileByFilename } from "@/libs/markdown/api";
import markdownToHtml from "@/libs/markdown/markdownToHtml";
import { BaseLayout } from "@/shared/components/BaseLayout";

import { Policy } from "./Policy";
import { PolicyLayout } from "./PolicyLayout";

import type { NextPageWithLayout } from "@/pages/_app.page";
import type { ReactElement } from "react";

type PolicyPageProps = {
  policy: PolicyType;
};

const PolicyPage: NextPageWithLayout<PolicyPageProps> = ({ policy }) => {
  return <Policy policy={policy} />;
};

PolicyPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <BaseLayout>
      <PolicyLayout>{page}</PolicyLayout>
    </BaseLayout>
  );
};

export const getStaticProps = async () => {
  const policy = getMarkdownFileByFilename("policy", ["slug", "content"], "src/features/policy");
  const content = await markdownToHtml(policy.content);

  return {
    props: {
      policy: {
        ...policy,
        content,
      },
    },
  };
};

export default PolicyPage;

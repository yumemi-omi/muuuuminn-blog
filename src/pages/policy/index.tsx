import { PolicyPage } from "@/_pages/policy/PolicyPage";
import { PolicyPageLayout } from "@/_pages/policy/PolicyPageLayout";
import { Policy } from "@/features/policy/type/policy";
import { getMarkdownFileByFilename } from "@/libs/markdown/api";
import markdownToHtml from "@/libs/markdown/markdownToHtml";
import { BasicLayout } from "@/shared/components/BasicLayout";

import type { NextPageWithLayout } from "@/pages/_app";
import type { ReactElement } from "react";

type Props = {
  policy: Policy;
};

const Home: NextPageWithLayout<Props> = ({ policy }) => {
  return <PolicyPage policy={policy} />;
};

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <BasicLayout>
      <PolicyPageLayout>{page}</PolicyPageLayout>
    </BasicLayout>
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

export default Home;

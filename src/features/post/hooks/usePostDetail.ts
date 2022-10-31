import { useEffect, useState } from "react";

import queryConverter from "@/features/post/graphql/queryConverter";

import { IssueDetailQueryVariables, useIssueDetailQuery } from "../graphql/issueDetail.generated";
import { PostType } from "../type/post";

export const usePostDetail = (args: IssueDetailQueryVariables) => {
  const variables = {
    ...args,
  };
  const { data: issueDetail } = useIssueDetailQuery(variables, {
    // https://tanstack.com/query/v4/docs/guides/dependent-queries
    enabled: !!variables.id,
  });

  const [detail, setDetail] = useState<PostType>({
    id: "",
    category: null,
    tags: [],
    title: "",
    description: "",
    coverImage: "",
    ogImageUrl: "",
    content: "",
    closed: false,
    updatedAt: "",
  });
  useEffect(() => {
    const func = async () => {
      const postDetail = await queryConverter.convertIssueDetailIntoPostDetail(issueDetail);
      setDetail(postDetail);
    };
    func();
  }, [issueDetail]);

  return {
    postDetail: detail,
    getKey: useIssueDetailQuery.getKey,
    fetcher: useIssueDetailQuery.fetcher,
  };
};

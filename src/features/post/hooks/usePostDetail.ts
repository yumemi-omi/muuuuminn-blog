import queryConverter from "@/features/post/grapql/queryConverter";
import { IssueDetailQueryVariables, useIssueDetailQuery } from "@/generated";

export const usePostDetail = (args: IssueDetailQueryVariables) => {
  const variables = {
    ...args,
  };
  const { data: issueDetail } = useIssueDetailQuery(variables);

  const postDetail = queryConverter.convertIssueDetailIntoPostDetail(issueDetail);

  return { postDetail };
};

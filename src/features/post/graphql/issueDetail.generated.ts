
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { fetcher } from "@/libs/fetcher";

import * as Types from "../../../generated/types";
export type IssueDetailQueryVariables = Types.Exact<{
  id: Types.Scalars["ID"];
}>;

export type IssueDetailQuery = {
  node?:
    | {
        id: string;
        title: string;
        body: string;
        bodyHTML: any;
        updatedAt: any;
        closed: boolean;
        labels?: {
          nodes?: Array<{ color: string; id: string; name: string } | null> | null;
        } | null;
        projectItems: {
          totalCount: number;
          nodes?: Array<{
            fieldValueByName?: { id: string; name?: string | null } | {} | null;
          } | null> | null;
        };
        comments: { nodes?: Array<{ body: string } | null> | null };
      }
    | {}
    | null;
};

export const IssueDetailDocument = `
    query IssueDetail($id: ID!) {
  node(id: $id) {
    ... on Issue {
      id
      title
      body
      bodyHTML
      labels(first: 5) {
        nodes {
          color
          id
          name
        }
      }
      updatedAt
      closed
      projectItems(first: 1) {
        totalCount
        nodes {
          fieldValueByName(name: "Status") {
            ... on ProjectV2ItemFieldSingleSelectValue {
              id
              name
            }
          }
        }
      }
      comments(first: 1) {
        nodes {
          body
        }
      }
    }
  }
}
    `;
export const useIssueDetailQuery = <TData = IssueDetailQuery, TError = unknown>(
  variables: IssueDetailQueryVariables,
  options?: UseQueryOptions<IssueDetailQuery, TError, TData>,
) =>
  useQuery<IssueDetailQuery, TError, TData>(
    ["IssueDetail", variables],
    fetcher<IssueDetailQuery, IssueDetailQueryVariables>(IssueDetailDocument, variables),
    options,
  );

useIssueDetailQuery.getKey = (variables: IssueDetailQueryVariables) => ["IssueDetail", variables];
useIssueDetailQuery.fetcher = (
  variables: IssueDetailQueryVariables,
  options?: RequestInit["headers"],
) => fetcher<IssueDetailQuery, IssueDetailQueryVariables>(IssueDetailDocument, variables, options);

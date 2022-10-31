
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { fetcher } from "@/libs/fetcher";

import * as Types from "../../../generated/types";
export type LifeProjectIssuesQueryVariables = Types.Exact<{
  first?: Types.InputMaybe<Types.Scalars["Int"]>;
  last?: Types.InputMaybe<Types.Scalars["Int"]>;
  before?: Types.InputMaybe<Types.Scalars["String"]>;
  after?: Types.InputMaybe<Types.Scalars["String"]>;
}>;

export type LifeProjectIssuesQuery = {
  node?:
    | {
        id: string;
        items: {
          totalCount: number;
          pageInfo: {
            endCursor?: string | null;
            hasNextPage: boolean;
            startCursor?: string | null;
            hasPreviousPage: boolean;
          };
          nodes?: Array<{
            id: string;
            updatedAt: any;
            type: Types.ProjectV2ItemType;
            content?:
              | {
                  id: string;
                  body: string;
                  bodyHTML: any;
                  closed: boolean;
                  updatedAt: any;
                  title: string;
                  labels?: {
                    nodes?: Array<{ color: string; id: string; name: string } | null> | null;
                  } | null;
                  comments: { nodes?: Array<{ body: string } | null> | null };
                }
              | {}
              | null;
            fieldValueByName?: { id: string; name?: string | null } | {} | null;
          } | null> | null;
        };
      }
    | {}
    | null;
};

export type LifeProjectIssuesPageInfoQueryVariables = Types.Exact<{
  first: Types.Scalars["Int"];
  last?: Types.InputMaybe<Types.Scalars["Int"]>;
  before?: Types.InputMaybe<Types.Scalars["String"]>;
  after?: Types.InputMaybe<Types.Scalars["String"]>;
}>;

export type LifeProjectIssuesPageInfoQuery = {
  node?:
    | {
        id: string;
        items: {
          totalCount: number;
          pageInfo: {
            endCursor?: string | null;
            hasNextPage: boolean;
            startCursor?: string | null;
            hasPreviousPage: boolean;
          };
          nodes?: Array<{ content?: { id: string } | {} | null } | null> | null;
        };
      }
    | {}
    | null;
};

export const LifeProjectIssuesDocument = `
    query LifeProjectIssues($first: Int, $last: Int, $before: String, $after: String) {
  node(id: "PVT_kwHOAkr4os4AHb3E") {
    ... on ProjectV2 {
      id
      items(
        first: $first
        last: $last
        before: $before
        after: $after
        orderBy: {direction: DESC, field: POSITION}
      ) {
        totalCount
        pageInfo {
          endCursor
          hasNextPage
          startCursor
          hasPreviousPage
        }
        nodes {
          id
          updatedAt
          content {
            ... on Issue {
              id
              body
              bodyHTML
              closed
              updatedAt
              title
              labels(first: 10) {
                nodes {
                  color
                  id
                  name
                }
              }
              comments(first: 1) {
                nodes {
                  body
                }
              }
            }
          }
          fieldValueByName(name: "Status") {
            ... on ProjectV2ItemFieldSingleSelectValue {
              id
              name
            }
          }
          type
        }
      }
    }
  }
}
    `;
export const useLifeProjectIssuesQuery = <TData = LifeProjectIssuesQuery, TError = unknown>(
  variables?: LifeProjectIssuesQueryVariables,
  options?: UseQueryOptions<LifeProjectIssuesQuery, TError, TData>,
) =>
  useQuery<LifeProjectIssuesQuery, TError, TData>(
    variables === undefined ? ["LifeProjectIssues"] : ["LifeProjectIssues", variables],
    fetcher<LifeProjectIssuesQuery, LifeProjectIssuesQueryVariables>(
      LifeProjectIssuesDocument,
      variables,
    ),
    options,
  );

useLifeProjectIssuesQuery.getKey = (variables?: LifeProjectIssuesQueryVariables) =>
  variables === undefined ? ["LifeProjectIssues"] : ["LifeProjectIssues", variables];
useLifeProjectIssuesQuery.fetcher = (
  variables?: LifeProjectIssuesQueryVariables,
  options?: RequestInit["headers"],
) =>
  fetcher<LifeProjectIssuesQuery, LifeProjectIssuesQueryVariables>(
    LifeProjectIssuesDocument,
    variables,
    options,
  );
export const LifeProjectIssuesPageInfoDocument = `
    query LifeProjectIssuesPageInfo($first: Int!, $last: Int, $before: String, $after: String) {
  node(id: "PVT_kwHOAkr4os4AHb3E") {
    ... on ProjectV2 {
      id
      items(first: $first, last: $last, before: $before, after: $after) {
        totalCount
        pageInfo {
          endCursor
          hasNextPage
          startCursor
          hasPreviousPage
        }
        nodes {
          content {
            ... on Issue {
              id
            }
          }
        }
      }
    }
  }
}
    `;
export const useLifeProjectIssuesPageInfoQuery = <
  TData = LifeProjectIssuesPageInfoQuery,
  TError = unknown,
>(
  variables: LifeProjectIssuesPageInfoQueryVariables,
  options?: UseQueryOptions<LifeProjectIssuesPageInfoQuery, TError, TData>,
) =>
  useQuery<LifeProjectIssuesPageInfoQuery, TError, TData>(
    ["LifeProjectIssuesPageInfo", variables],
    fetcher<LifeProjectIssuesPageInfoQuery, LifeProjectIssuesPageInfoQueryVariables>(
      LifeProjectIssuesPageInfoDocument,
      variables,
    ),
    options,
  );

useLifeProjectIssuesPageInfoQuery.getKey = (variables: LifeProjectIssuesPageInfoQueryVariables) => [
  "LifeProjectIssuesPageInfo",
  variables,
];
useLifeProjectIssuesPageInfoQuery.fetcher = (
  variables: LifeProjectIssuesPageInfoQueryVariables,
  options?: RequestInit["headers"],
) =>
  fetcher<LifeProjectIssuesPageInfoQuery, LifeProjectIssuesPageInfoQueryVariables>(
    LifeProjectIssuesPageInfoDocument,
    variables,
    options,
  );

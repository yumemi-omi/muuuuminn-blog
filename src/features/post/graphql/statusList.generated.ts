
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { fetcher } from "@/libs/fetcher";

import * as Types from "../../../generated/types";
export type LifeProjectStatusListQueryVariables = Types.Exact<{ [key: string]: never }>;

export type LifeProjectStatusListQuery = {
  node?:
    | {
        id: string;
        field?: { id: string; options: Array<{ id: string; name: string }> } | {} | null;
      }
    | {}
    | null;
};

export const LifeProjectStatusListDocument = `
    query LifeProjectStatusList {
  node(id: "PVT_kwHOAkr4os4AHb3E") {
    ... on ProjectV2 {
      id
      field(name: "Status") {
        ... on ProjectV2SingleSelectField {
          id
          options {
            id
            name
          }
        }
      }
    }
  }
}
    `;
export const useLifeProjectStatusListQuery = <TData = LifeProjectStatusListQuery, TError = unknown>(
  variables?: LifeProjectStatusListQueryVariables,
  options?: UseQueryOptions<LifeProjectStatusListQuery, TError, TData>,
) =>
  useQuery<LifeProjectStatusListQuery, TError, TData>(
    variables === undefined ? ["LifeProjectStatusList"] : ["LifeProjectStatusList", variables],
    fetcher<LifeProjectStatusListQuery, LifeProjectStatusListQueryVariables>(
      LifeProjectStatusListDocument,
      variables,
    ),
    options,
  );

useLifeProjectStatusListQuery.getKey = (variables?: LifeProjectStatusListQueryVariables) =>
  variables === undefined ? ["LifeProjectStatusList"] : ["LifeProjectStatusList", variables];
useLifeProjectStatusListQuery.fetcher = (
  variables?: LifeProjectStatusListQueryVariables,
  options?: RequestInit["headers"],
) =>
  fetcher<LifeProjectStatusListQuery, LifeProjectStatusListQueryVariables>(
    LifeProjectStatusListDocument,
    variables,
    options,
  );

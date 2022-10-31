
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { fetcher } from "@/libs/fetcher";

import * as Types from "../../../generated/types";
export type LifeRepositoryLabelsQueryVariables = Types.Exact<{ [key: string]: never }>;

export type LifeRepositoryLabelsQuery = {
  node?:
    | {
        id: string;
        name: string;
        labels?: {
          nodes?: Array<{
            color: string;
            id: string;
            name: string;
            updatedAt?: any | null;
          } | null> | null;
        } | null;
      }
    | {}
    | null;
};

export const LifeRepositoryLabelsDocument = `
    query LifeRepositoryLabels {
  node(id: "R_kgDOIKnT4g") {
    ... on Repository {
      id
      name
      labels(first: 50) {
        nodes {
          color
          id
          name
          updatedAt
        }
      }
    }
  }
}
    `;
export const useLifeRepositoryLabelsQuery = <TData = LifeRepositoryLabelsQuery, TError = unknown>(
  variables?: LifeRepositoryLabelsQueryVariables,
  options?: UseQueryOptions<LifeRepositoryLabelsQuery, TError, TData>,
) =>
  useQuery<LifeRepositoryLabelsQuery, TError, TData>(
    variables === undefined ? ["LifeRepositoryLabels"] : ["LifeRepositoryLabels", variables],
    fetcher<LifeRepositoryLabelsQuery, LifeRepositoryLabelsQueryVariables>(
      LifeRepositoryLabelsDocument,
      variables,
    ),
    options,
  );

useLifeRepositoryLabelsQuery.getKey = (variables?: LifeRepositoryLabelsQueryVariables) =>
  variables === undefined ? ["LifeRepositoryLabels"] : ["LifeRepositoryLabels", variables];
useLifeRepositoryLabelsQuery.fetcher = (
  variables?: LifeRepositoryLabelsQueryVariables,
  options?: RequestInit["headers"],
) =>
  fetcher<LifeRepositoryLabelsQuery, LifeRepositoryLabelsQueryVariables>(
    LifeRepositoryLabelsDocument,
    variables,
    options,
  );

import matter from "gray-matter";

import {
  LifeProjectIssuesQuery,
  LifeRepositoryLabelsQuery,
  LifeProjectStatusListQuery,
  IssueDetailQuery,
} from "@/generated";

import { CategoryType, PostPageInfo, PostType, TagType } from "../type/post";

const MARKDOWN_FIELDS = [
  "title",
  "date",
  "slug",
  "content",
  "ogImageUrl",
  "coverImage",
  "description",
] as const;
type FieldsType = typeof MARKDOWN_FIELDS[number];

const formatPost = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: { [key: string]: any },
  content: string,
  fields: FieldsType[] = [],
) => {
  type Items = {
    [key in FieldsType]: string;
  };

  const items: Items = {
    content: "",
    title: "",
    slug: "",
    date: "",
    ogImageUrl: "",
    coverImage: "",
    description: "",
  };

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === "content") {
      items[field] = content;
    }

    if (typeof data[field] !== "undefined") {
      items[field] = data[field];
    }
  });

  return items;
};

const convertIssueBodyIntoPostBody = (issueBody: string, fields: FieldsType[]) => {
  const { data, content } = matter(issueBody);
  return formatPost(data, content, fields);
};

const convertIssuesIntoPosts = (
  lifeProjectIssuesQuery: LifeProjectIssuesQuery | undefined,
): PostType[] => {
  if (lifeProjectIssuesQuery && lifeProjectIssuesQuery.node) {
    const node = lifeProjectIssuesQuery.node;
    if ("id" in node && node.items && node.items.nodes && node.items.nodes.length !== 0) {
      const posts = node.items.nodes
        .map((node) => {
          if (node && node.content && "id" in node.content) {
            const frontMatter =
              node.content.comments && node.content.comments.nodes && node.content.comments.nodes[0]
                ? node.content.comments.nodes[0].body
                : "";
            const { coverImage, description, ogImageUrl } = convertIssueBodyIntoPostBody(
              frontMatter,
              ["coverImage", "ogImageUrl", "description"],
            );
            const contentObj = {
              id: node.content.id,
              title: node.content.title,
              description,
              coverImage,
              ogImageUrl,
              content: node.content.bodyHTML,
              closed: node.content.closed,
            };

            const category =
              node.fieldValueByName && "id" in node.fieldValueByName
                ? {
                    id: node.fieldValueByName.id,
                    name: node.fieldValueByName.name ?? "",
                  }
                : null;

            const tags =
              node.content.labels && node.content.labels.nodes
                ? node.content.labels.nodes.map((label) =>
                    label
                      ? {
                          ...label,
                        }
                      : {
                          id: "",
                          name: "",
                          color: "",
                        },
                  )
                : [];

            return {
              category,
              tags,
              ...contentObj,
              updatedAt: node.updatedAt as string,
            };
          } else {
            return {
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
            };
          }
        })
        .filter((v) => v);
      return posts;
    }
  }
  return [];
};

const convertIssueDetailIntoPostDetail = (
  issueDetailQuery: IssueDetailQuery | undefined,
): PostType => {
  if (issueDetailQuery && issueDetailQuery.node && "id" in issueDetailQuery.node) {
    const node = issueDetailQuery.node;

    const frontMatter =
      node.comments && node.comments.nodes && node.comments.nodes[0]
        ? node.comments.nodes[0].body
        : "";

    const { coverImage, description, ogImageUrl } = convertIssueBodyIntoPostBody(frontMatter, [
      "coverImage",
      "ogImageUrl",
      "description",
    ]);
    const contentObj = {
      id: node.id,
      title: node.title,
      description,
      coverImage,
      ogImageUrl,
      content: node.bodyHTML,
      closed: node.closed,
    };

    const category =
      node.projectItems.nodes &&
      node.projectItems.nodes.length !== 0 &&
      node.projectItems.nodes[0] &&
      node.projectItems.nodes[0].fieldValueByName &&
      "id" in node.projectItems.nodes[0].fieldValueByName
        ? {
            id: node.projectItems.nodes[0].fieldValueByName.id ?? "",
            name: node.projectItems.nodes[0].fieldValueByName.name ?? "",
          }
        : null;

    const tags =
      node.labels && node.labels.nodes
        ? node.labels.nodes.map((label) =>
            label
              ? {
                  ...label,
                }
              : {
                  id: "",
                  name: "",
                  color: "",
                },
          )
        : [];

    return {
      category,
      tags,
      ...contentObj,
      updatedAt: node.updatedAt,
    };
  }
  return {
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
  };
};

const convertIssuesIntoPostPageInfo = (
  lifeProjectIssuesQuery: LifeProjectIssuesQuery | undefined,
): PostPageInfo => {
  if (lifeProjectIssuesQuery && lifeProjectIssuesQuery.node) {
    const node = lifeProjectIssuesQuery.node;
    if ("id" in node && node.items && node.items.nodes) {
      return {
        ...node.items.pageInfo,
        totalCount: node.items.totalCount,
      };
    }
  }
  return {
    totalCount: 0,
    endCursor: null,
    hasNextPage: false,
    startCursor: null,
    hasPreviousPage: false,
  };
};

const convertLabelsIntoTags = (
  lifeRepositoryLabelsQuery: LifeRepositoryLabelsQuery | undefined,
): TagType[] => {
  if (lifeRepositoryLabelsQuery && lifeRepositoryLabelsQuery.node) {
    const node = lifeRepositoryLabelsQuery.node;
    if ("id" in node && node.labels && node.labels.nodes) {
      return node.labels.nodes.map((node) =>
        node
          ? {
              ...node,
            }
          : {
              id: "",
              name: "",
              color: "",
              updatedAt: "",
            },
      );
    }
  }
  return [];
};

const convertStatusIntoCategories = (
  lifeProjectStatusListQuery: LifeProjectStatusListQuery | undefined,
): CategoryType[] => {
  if (lifeProjectStatusListQuery && lifeProjectStatusListQuery.node) {
    const node = lifeProjectStatusListQuery.node;
    if (node && "id" in node && node.field && "id" in node.field) {
      return node.field.options;
    }
  }
  return [];
};

const queryConverter = {
  convertIssuesIntoPosts,
  convertIssuesIntoPostPageInfo,
  convertIssueDetailIntoPostDetail,
  convertLabelsIntoTags,
  convertStatusIntoCategories,
};

export default queryConverter;

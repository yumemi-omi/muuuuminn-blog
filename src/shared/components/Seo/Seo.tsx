import { NextSeo, NextSeoProps } from "next-seo";
import { OpenGraphArticle, OpenGraphMedia } from "next-seo/lib/types";
import { FC } from "react";

export type BasicSeoProps = {
  path: string;
  ogImage?: OpenGraphMedia;
  noTitleTemplate?: boolean;
  noindexAndFollow?: boolean;
} & NextSeoProps;

export const BasicSeo: FC<BasicSeoProps> = (props) => {
  const {
    path,
    title,
    description,
    ogImage = {
      alt: `${title}のサムネイル`,
      url: "/images/logo/logo.png",
      type: "image/png",
    },
    noindexAndFollow,
  } = props;

  const APP_ROOT_URL = process.env.NEXT_PUBLIC_APP_ROOT_URL;
  const pageUrl = APP_ROOT_URL + path;

  return (
    <NextSeo
      title={title}
      titleTemplate={"%s | muuuuminn blog"}
      defaultTitle="muuuuminn blog"
      canonical={pageUrl}
      description={description}
      nofollow={noindexAndFollow}
      noindex={noindexAndFollow}
      openGraph={{
        type: "website",
        url: pageUrl,
        title,
        description,
        images: [ogImage],
      }}
      twitter={{
        cardType: "summary_large_image",
        site: "@4ho_v",
      }}
    />
  );
};

export type ArticleSeoProps = {
  path: string;
  ogImage?: OpenGraphMedia;
  noTitleTemplate?: boolean;
  noindexAndFollow?: boolean;
  articleOgp?: OpenGraphArticle;
} & NextSeoProps;

export const ArticleSeo: FC<ArticleSeoProps> = (props) => {
  const {
    path,
    title,
    description,
    ogImage = {
      alt: `${title}のサムネイル`,
      url: "/images/logo/logo.png",
      type: "image/png",
    },
    noindexAndFollow,
    articleOgp,
  } = props;

  const APP_ROOT_URL = process.env.NEXT_PUBLIC_APP_ROOT_URL;
  const pageUrl = APP_ROOT_URL + path;

  return (
    <NextSeo
      title={title}
      titleTemplate={"%s | muuuuminn blog"}
      defaultTitle="muuuuminn blog"
      canonical={pageUrl}
      description={description}
      nofollow={noindexAndFollow}
      noindex={noindexAndFollow}
      openGraph={{
        type: "article",
        title,
        description,
        url: pageUrl,
        article: {
          ...articleOgp,
          authors: ["https://twitter.com/4ho_v"],
        },
        images: [ogImage],
      }}
      twitter={{
        cardType: "summary_large_image",
        site: "@4ho_v",
      }}
    />
  );
};

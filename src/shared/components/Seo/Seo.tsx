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
      url: "https://s3.us-west-2.amazonaws.com/secure.notion-static.com/eb64b45d-2be0-4182-a9f3-578269fce660/logo_transparent_no_title.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20221203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221203T121900Z&X-Amz-Expires=86400&X-Amz-Signature=c200273be0b8bbc69cb82dbd0212dd7acfcef40d42edc19897b661872bc8e834&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22logo_transparent_no_title.png%22&x-id=GetObject",
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
      facebook={{
        appId: "475650504470227",
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
      url: "https://s3.us-west-2.amazonaws.com/secure.notion-static.com/eb64b45d-2be0-4182-a9f3-578269fce660/logo_transparent_no_title.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20221203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221203T121900Z&X-Amz-Expires=86400&X-Amz-Signature=c200273be0b8bbc69cb82dbd0212dd7acfcef40d42edc19897b661872bc8e834&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22logo_transparent_no_title.png%22&x-id=GetObject",
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
      facebook={{
        appId: "475650504470227",
      }}
    />
  );
};

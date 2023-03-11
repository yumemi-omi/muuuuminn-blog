import { ArticleJsonLd as _ArticleJsonLd } from "next-seo";
import { FC } from "react";

export type ArticleJsonLdProps = {
  url: string;
  title: string;
  description: string;
  images: string[];
  datePublished: string;
  dateModified: string;
};

export const ArticleJsonLd: FC<ArticleJsonLdProps> = (props) => {
  const {
    url,
    title,
    description,
    images = [
      "https://user-images.githubusercontent.com/38467746/206959970-b3ef349e-e1fc-4646-973f-a7862e1f5d09.png",
    ],
    datePublished,
    dateModified,
  } = props;

  const APP_ROOT_URL = process.env.NEXT_PUBLIC_APP_ROOT_URL;
  const pageUrl = APP_ROOT_URL + url;

  return (
    <_ArticleJsonLd
      url={pageUrl}
      title={title}
      images={images}
      datePublished={datePublished}
      dateModified={dateModified}
      authorName={[
        {
          name: "muuuuminn",
          url: "https://twitter.com/4ho_v",
        },
      ]}
      publisherName="muuuuminn"
      publisherLogo="https://user-images.githubusercontent.com/38467746/206959970-b3ef349e-e1fc-4646-973f-a7862e1f5d09.png"
      description={description}
      isAccessibleForFree={true}
    />
  );
};
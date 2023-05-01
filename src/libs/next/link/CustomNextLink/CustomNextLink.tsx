import { UrlObject } from "url";

import NextLink, { LinkProps as OriginNextLinkProps } from "next/link";
import { FC, ReactNode } from "react";

import { Box, BoxProps } from "@/libs/mantine/layout";

export type CustomNextLinkProps = OriginNextLinkProps;

const isExternalLink = (href: string | UrlObject): boolean => {
  if (typeof href !== "string") return false;
  return href.startsWith("http");
};

export const CustomNextLink: FC<OriginNextLinkProps & BoxProps & { children: ReactNode }> = (
  props,
) => {
  const { children, href, ...rest } = props;
  return (
    <Box
      component={NextLink}
      href={href}
      rel={isExternalLink(href) ? "nofollow noreferrer" : undefined}
      {...rest}
    >
      {children}
    </Box>
  );
};

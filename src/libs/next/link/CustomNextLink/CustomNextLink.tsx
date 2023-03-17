import { UrlObject } from "url";

import {
  Link as OriginChakraLink,
  LinkProps as OriginChakraLinkProps,
  LinkOverlay as OriginLinkOverlay,
  LinkOverlayProps as OriginLinkOverlayProps,
} from "@chakra-ui/react";
import NextLink, { LinkProps as OriginNextLinkProps } from "next/link";
import { FC, ReactNode } from "react";

export type CustomNextLinkProps = OriginChakraLinkProps & OriginNextLinkProps;

const isExternalLink = (href: string | UrlObject): boolean => {
  if (typeof href !== "string") return false;
  return href.startsWith("http");
};

// TODO: リンクをわかりやすくリンクとして示す
export const CustomNextLink: FC<
  CustomNextLinkProps & {
    linkType?: "withChakraLink" | "plainNextLink" | "withOverlay";
  }
> = ({
  children,
  href,
  as,
  replace,
  scroll,
  shallow,
  prefetch,
  locale,
  passHref = true,
  linkType,
  ...rest
}) => {
  switch (linkType) {
    case "withChakraLink":
      return (
        <WithChakraLink
          as={as}
          href={href}
          locale={locale}
          passHref={passHref}
          prefetch={prefetch}
          replace={replace}
          scroll={scroll}
          shallow={shallow}
          {...rest}
        >
          {children}
        </WithChakraLink>
      );
    case "plainNextLink":
      return (
        <_NextLink
          as={as}
          href={href}
          locale={locale}
          passHref={passHref}
          prefetch={prefetch}
          replace={replace}
          scroll={scroll}
          shallow={shallow}
          {...rest}
        >
          {children}
        </_NextLink>
      );
    case "withOverlay":
      return (
        <WithOverlay
          as={as}
          href={href}
          locale={locale}
          passHref={passHref}
          prefetch={prefetch}
          replace={replace}
          scroll={scroll}
          shallow={shallow}
          {...rest}
        >
          {children}
        </WithOverlay>
      );
    default:
      return (
        <WithChakraLink
          as={as}
          href={href}
          locale={locale}
          passHref={passHref}
          prefetch={prefetch}
          replace={replace}
          scroll={scroll}
          shallow={shallow}
          {...rest}
        >
          {children}
        </WithChakraLink>
      );
  }
};

const _NextLink: FC<OriginNextLinkProps & { children: ReactNode }> = (props) => {
  const { children, href, ...rest } = props;
  return (
    <NextLink href={href} rel={isExternalLink(href) ? "nofollow noreferrer" : undefined} {...rest}>
      {children}
    </NextLink>
  );
};

const WithChakraLink: FC<CustomNextLinkProps> = ({
  children,
  href,
  as,
  replace,
  scroll,
  shallow,
  prefetch,
  locale,
  passHref = true,
  ...rest
}) => {
  return (
    <_NextLink
      as={as}
      href={href}
      locale={locale}
      passHref={passHref}
      prefetch={prefetch}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
    >
      <OriginChakraLink {...rest} rel={isExternalLink(href) ? "nofollow noreferrer" : undefined}>
        {children}
      </OriginChakraLink>
    </_NextLink>
  );
};

type LinkOverlayProps = OriginLinkOverlayProps & OriginNextLinkProps;

const WithOverlay: FC<LinkOverlayProps> = ({
  children,
  href,
  as,
  replace,
  scroll,
  shallow,
  prefetch,
  locale,
  passHref = true,
  ...rest
}) => {
  return (
    <_NextLink
      as={as}
      href={href}
      locale={locale}
      passHref={passHref}
      prefetch={prefetch}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
    >
      <OriginLinkOverlay {...rest}>{children}</OriginLinkOverlay>
    </_NextLink>
  );
};

import { UrlObject } from "url";

import {
  Link as OriginChakraLink,
  LinkProps as OriginChakraLinkProps,
  LinkOverlay as OriginLinkOverlay,
  LinkOverlayProps as OriginLinkOverlayProps,
} from "@chakra-ui/react";
import NextLink, { LinkProps as OriginNextLinkProps } from "next/link";
import { FC, ReactNode } from "react";

type CustomNextLinkProps = OriginChakraLinkProps & OriginNextLinkProps;

const isExternalLink = (href: string | UrlObject): boolean => {
  if (typeof href !== "string") return false;
  return href.startsWith("http");
};

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
          passHref={passHref}
          href={href}
          as={as}
          replace={replace}
          scroll={scroll}
          shallow={shallow}
          prefetch={prefetch}
          locale={locale}
          {...rest}
        >
          {children}
        </WithChakraLink>
      );
    case "plainNextLink":
      return (
        <_NextLink
          passHref={passHref}
          href={href}
          as={as}
          replace={replace}
          scroll={scroll}
          shallow={shallow}
          prefetch={prefetch}
          locale={locale}
        >
          {children}
        </_NextLink>
      );
    case "withOverlay":
      return (
        <WithOverlay
          passHref={passHref}
          href={href}
          as={as}
          replace={replace}
          scroll={scroll}
          shallow={shallow}
          prefetch={prefetch}
          locale={locale}
        >
          {children}
        </WithOverlay>
      );
    default:
      return (
        <WithChakraLink
          passHref={passHref}
          href={href}
          as={as}
          replace={replace}
          scroll={scroll}
          shallow={shallow}
          prefetch={prefetch}
          locale={locale}
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
    <NextLink
      href={href}
      rel={isExternalLink(href) ? "nofollow noreferrer" : undefined}
      {...rest}
      style={{
        textDecoration: "none",
      }}
    >
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
      passHref={passHref}
      href={href}
      as={as}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      prefetch={prefetch}
      locale={locale}
    >
      <OriginChakraLink
        {...rest}
        style={{
          textDecoration: "none",
        }}
        rel={isExternalLink(href) ? "nofollow noreferrer" : undefined}
      >
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
      passHref={passHref}
      href={href}
      as={as}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      prefetch={prefetch}
      locale={locale}
    >
      <OriginLinkOverlay {...rest}>{children}</OriginLinkOverlay>
    </_NextLink>
  );
};

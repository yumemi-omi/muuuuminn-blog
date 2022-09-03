import { Link as ChakraLink, LinkProps as ChakraLinkProps } from "@chakra-ui/react";
import NextLink, { LinkProps } from "next/link";
import { FC } from "react";

type ChakraNextLinkProps = ChakraLinkProps & LinkProps;

const isExternalLink = (href: string): boolean => {
  if (typeof href !== "string") return false;
  return href.startsWith("http");
};

export const ChakraNextLink: FC<ChakraNextLinkProps> = (props) => {
  const {
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
  } = props;
  return (
    <NextLink
      passHref={passHref}
      href={href}
      as={as}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      prefetch={prefetch}
      locale={locale}
    >
      <ChakraLink {...rest} rel={isExternalLink(href) ? "nofollow noreferrer" : undefined}>
        {children}
      </ChakraLink>
    </NextLink>
  );
};

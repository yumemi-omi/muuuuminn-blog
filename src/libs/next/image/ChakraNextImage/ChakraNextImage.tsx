import { chakra } from "@chakra-ui/react";
import NextImage, { ImageProps, ImageLoaderProps } from "next/image";
import { memo } from "react";

import { Box, BoxProps } from "@/libs/chakra/components/Box";

const ChakraNextUnwrappedImage = chakra(NextImage, {
  shouldForwardProp: (prop) =>
    [
      "width",
      "height",
      "src",
      "alt",
      "layout",
      "quality",
      "placeholder",
      "blurDataURL",
      "loader ",
    ].includes(prop),
});

const myLoader = (resolverProps: ImageLoaderProps): string => {
  return `${resolverProps.src}?w=${resolverProps.width}&q=${resolverProps.quality || 70}`;
};

const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str: string) =>
  typeof window === "undefined" ? Buffer.from(str).toString("base64") : window.btoa(str);

type ChakraNextImageProps = {
  enableBlur?: boolean;
} & ImageProps &
  BoxProps;
const _ChakraNextImage = (props: ChakraNextImageProps) => {
  const { src, alt = "", width, quality, height, layout, objectFit, enableBlur, ...rest } = props;
  return (
    <Box pos="relative" {...rest}>
      {src ? (
        <ChakraNextUnwrappedImage
          alt={alt}
          blurDataURL={
            enableBlur ? `data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}` : undefined
          }
          h="auto"
          height={height}
          layout={layout}
          loader={myLoader}
          objectFit={objectFit}
          placeholder={enableBlur ? "blur" : undefined}
          quality={quality}
          src={src}
          transition="all 0.01s"
          w="auto"
          width={width}
        />
      ) : (
        <Box bgColor={"currentcolor"} height={height} width={width} />
      )}
    </Box>
  );
};

export const ChakraNextImage = memo(_ChakraNextImage);

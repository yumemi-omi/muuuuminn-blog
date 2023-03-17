import { AspectRatioProps, AspectRatio } from "@chakra-ui/react";
import { FC, memo } from "react";

import { ChakraNextImage } from "@/libs/next";

interface PostThumbnailProps extends AspectRatioProps {
  src: string;
  imageQuality?: number;
  sizeSet?: {
    width: string;
    height: string;
  };
  enableBlur?: boolean;
  alt: string;
  objectFit?: "cover" | "contain";
}

const _PostThumbnail: FC<PostThumbnailProps> = ({
  src,
  imageQuality,
  sizeSet = { width: "100px", height: "100px" },
  enableBlur,
  alt = "",
  objectFit = "contain",
  ...rest
}) => {
  return (
    <AspectRatio borderRadius={"xl"} ratio={1 / 1} {...sizeSet} {...rest}>
      <ChakraNextImage
        borderRadius={"xl"}
        quality={imageQuality}
        src={src}
        {...sizeSet}
        alt={alt}
        enableBlur={enableBlur}
        objectFit={objectFit}
      />
    </AspectRatio>
  );
};

export const PostThumbnail = memo(_PostThumbnail);

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
    <AspectRatio ratio={1 / 1} borderRadius={"xl"} {...sizeSet} {...rest}>
      <ChakraNextImage
        borderRadius={"xl"}
        src={src}
        quality={imageQuality}
        {...sizeSet}
        enableBlur={enableBlur}
        alt={alt}
        objectFit={objectFit}
      />
    </AspectRatio>
  );
};

export const PostThumbnail = memo(_PostThumbnail);

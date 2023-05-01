import { AspectRatio, AspectRatioProps } from "@mantine/core";
import { FC, memo } from "react";

import { ChakraNextImage } from "@/libs/next";

interface PostThumbnailProps extends AspectRatioProps {
  src: string;
  imageQuality?: number;
  sizeSet?: {
    width: number;
    height: number;
  };
  enableBlur?: boolean;
  alt: string;
  // objectFit?: "cover" | "contain";
}

const _PostThumbnail: FC<PostThumbnailProps> = ({
  src,
  imageQuality,
  sizeSet = { width: 100, height: 100 },
  enableBlur,
  alt = "",
  ...rest
}) => {
  return (
    <AspectRatio
      {...rest}
      h={sizeSet.height}
      ratio={1 / 1}
      sx={{
        borderRadius: "10px",
      }}
      w={sizeSet.width}
    >
      <ChakraNextImage
        // borderRadius={"xl"}
        alt={alt}
        enableBlur={enableBlur}
        quality={imageQuality}
        src={src}
        style={{
          borderRadius: "10px",
        }}
        {...sizeSet}
      />
    </AspectRatio>
  );
};

export const PostThumbnail = memo(_PostThumbnail);

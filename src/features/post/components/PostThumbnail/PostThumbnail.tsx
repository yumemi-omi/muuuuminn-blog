import { AspectRatio, AspectRatioProps } from "@mantine/core";
import { FC, memo } from "react";

import { NextImage } from "@/libs/next";

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
  ratio = 1 / 1,
  ...rest
}) => {
  return (
    <AspectRatio
      h={sizeSet.height}
      ratio={ratio}
      sx={{
        borderRadius: "10px",
      }}
      w={sizeSet.width}
      {...rest}
    >
      <NextImage
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

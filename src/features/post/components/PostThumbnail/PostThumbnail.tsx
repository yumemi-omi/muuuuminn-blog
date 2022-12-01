import { AspectRatioProps, AspectRatio } from "@chakra-ui/react";
import { FC, memo } from "react";

import { ChakraNextImage } from "@/libs/next";

interface PostThumbnailProps extends AspectRatioProps {
  src: string;
  imageQuality?: string | number;
  sizeSet?: {
    width: string;
    height: string;
  };
  enableBlur?: boolean;
}

const _PostThumbnail: FC<PostThumbnailProps> = ({
  src,
  imageQuality,
  sizeSet = { width: "100px", height: "100px" },
  enableBlur,
  ...rest
}) => {
  return (
    <AspectRatio ratio={1 / 1} {...sizeSet} {...rest}>
      <ChakraNextImage
        borderRadius={"xl"}
        src={src}
        quality={imageQuality}
        {...sizeSet}
        enableBlur={enableBlur}
      />
    </AspectRatio>
  );
};

export const PostThumbnail = memo(_PostThumbnail);

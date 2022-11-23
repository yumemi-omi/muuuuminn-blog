import { AspectRatioProps, AspectRatio } from "@chakra-ui/react";
import { FC, memo } from "react";

import { PostType } from "@/features/post/type/post";
import { ChakraNextImage } from "@/libs/next";

interface PostThumbnailProps extends AspectRatioProps {
  post: PostType;
  imageQuality?: string | number;
  sizeSet?: {
    width: string;
    height: string;
  };
}

const _PostThumbnail: FC<PostThumbnailProps> = ({
  post,
  imageQuality,
  sizeSet = { width: "100px", height: "100px" },
  ...rest
}) => {
  return (
    <AspectRatio ratio={1 / 1} {...sizeSet} {...rest}>
      <ChakraNextImage
        borderRadius={"xl"}
        src={post.coverImage}
        quality={imageQuality}
        {...sizeSet}
      />
    </AspectRatio>
  );
};

export const PostThumbnail = memo(_PostThumbnail);

import { AspectRatioProps, AspectRatio } from "@chakra-ui/react";
import { FC } from "react";

import { PostType } from "@/features/post/type/post";
import { ChakraNextImage } from "@/libs/next";

interface PostThumbnailProps extends AspectRatioProps {
  post: PostType;
}

export const PostThumbnail: FC<PostThumbnailProps> = ({ post, ...rest }) => {
  return (
    <AspectRatio ratio={1 / 1} w={"100px"} {...rest}>
      <ChakraNextImage borderRadius={"xl"} layout={"fill"} src={post.coverImage} />
    </AspectRatio>
  );
};

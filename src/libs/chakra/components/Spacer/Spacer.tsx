import { Spacer as OriginSpacer, SpacerProps as OriginSpacerProps } from "@chakra-ui/react";
import { FC } from "react";

type SpacerProps = OriginSpacerProps;

export const Spacer: FC<SpacerProps> = (props) => {
  return <OriginSpacer {...props} />;
};

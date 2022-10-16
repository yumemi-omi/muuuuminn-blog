import { FC } from "react";

type ContentProps = { html: string };

export const Content: FC<ContentProps> = (props) => {
  const { html } = props;
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: html,
      }}
    />
  );
};

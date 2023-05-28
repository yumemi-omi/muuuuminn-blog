import type { FC } from "react";

type RichMarkdownContentProps = { html: string };

export const RichMarkdownContent: FC<RichMarkdownContentProps> = (props) => {
  const { html } = props;
  return (
    <div
      className="znc"
      dangerouslySetInnerHTML={{
        __html: html,
      }}
    />
  );
};

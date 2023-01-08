import { useRouter } from "next/router";
import { useEffect } from "react";

import { Box } from "@/libs/chakra";

export const AdSense: React.FC = () => {
  const { asPath } = useRouter();
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.log({ AdSenseCmpError: err });
    }
  }, [asPath]);

  if (asPath === "/policy") {
    return null;
  }

  return (
    <Box key={asPath} width={"full"}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-adtest={process.env.NODE_ENV === "production" ? "off" : "on"}
        data-ad-client="ca-pub-9104412012929052"
        data-ad-slot="2566562789"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </Box>
  );
};

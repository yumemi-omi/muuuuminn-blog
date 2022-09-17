import { formatDistance, format } from "date-fns";
import { ja } from "date-fns/locale";
import { FC } from "react";

import { Text, TextProps } from "@/libs/chakra";

// TODO: i18n対応
const getRelativeDate = (date: string) => {
  const time = formatDistance(new Date(), Date.parse(date), {
    locale: ja,
  });

  if (time.indexOf("未満") !== -1) {
    return "たった今";
  } else if (time.indexOf("か月") !== -1 || time.indexOf("年") !== -1) {
    return format(Date.parse(date), "yyyy年M月d日", {
      locale: ja,
    });
  } else {
    return time + "前";
  }
};

type PostDateProps = {
  date: string;
} & TextProps;

export const PostDate: FC<PostDateProps> = ({ date, ...rest }) => {
  const relativeDate = getRelativeDate(date);
  return <Text {...rest}>{relativeDate}</Text>;
};

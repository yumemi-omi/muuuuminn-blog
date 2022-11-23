import { formatDistance, format } from "date-fns";
import { ja } from "date-fns/locale";
import { FC, memo } from "react";

import { Text, TextProps } from "@/libs/chakra";
import { useTranslation, Locales, LocalesType } from "@/libs/i18n";

const DATE_FORMAT = "yyyy/M/d";

const getRelativeDate = (date: string, t: Locales, locale: LocalesType) => {
  const isInvalidDate = Number.isNaN(new Date(date).getTime());

  if (isInvalidDate) {
    return "";
  }

  const options = locale === "en" ? {} : { locale: ja };

  const now = new Date();
  const parsedDate = Date.parse(date);
  const time = formatDistance(now, parsedDate);

  if (time.indexOf("less than") !== -1) {
    return t.SUFFIX.DATE_TIME.JUST_NOW;
  } else if (time.indexOf("month") !== -1 || time.indexOf("year") !== -1) {
    return format(parsedDate, DATE_FORMAT, options);
  } else {
    return `${formatDistance(now, parsedDate, options)}${t.SUFFIX.DATE_TIME.AGO}`;
  }
};

type PostDateProps = {
  date: string;
} & TextProps;

// TODO: 日付も表示させることを考えてみる
const _PostDate: FC<PostDateProps> = ({ date, ...rest }) => {
  const { t, locale } = useTranslation();
  const relativeDate = getRelativeDate(date, t, locale as LocalesType);
  return <Text {...rest}>{relativeDate}</Text>;
};

export const PostDate = memo(_PostDate);

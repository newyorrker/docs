import { DateTime } from "luxon";

export const monthName = (monthNumber: number) => {
  const months = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря"
  ];

  return months[monthNumber - 1] ? months[monthNumber - 1] : "";
};

export const formatDate = (date: DateTime, addYear = false) => {
  return (
    `${date.toFormat("dd")} ${monthName(date.month)}` +
    (addYear ? ` ${date.year}` : "")
  );
};

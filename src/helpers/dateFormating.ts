import { DateTime, LocaleOptions } from "luxon"

const options: LocaleOptions & Intl.DateTimeFormatOptions = { locale: 'ru', month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" };

export const formatDate = (date: DateTime) => {
    return date.toLocaleString(options).replace(",", "");
}

export const formatDateWithComa = (date: DateTime) => {
    return date.toLocaleString(options);
}
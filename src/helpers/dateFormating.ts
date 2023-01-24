import { DateTime } from "luxon"

export const formatDate = (date: DateTime) => {
    return date.toLocaleString({ locale: 'ru', month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" }).replace(",", "");
}
import { DateTime } from 'luxon';

const formatDate = (date: string) => {
  return DateTime.fromISO(date)
    .setLocale('ru')
    .toFormat('dd MMMM yyyy');
};

const formatDateCard = (date: string) => {
  return DateTime.fromISO(date)
    .setLocale('ru')
    .toFormat('dd MMMM yyyy, hh:mm');
};

export { formatDate, formatDateCard };

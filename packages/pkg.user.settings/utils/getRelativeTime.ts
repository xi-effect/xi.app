import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import 'dayjs/locale/ru';

dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.locale('ru');

export const getRelativeTime = (dateString: string): string => {
  const date = dayjs.utc(dateString).local();
  return dayjs().to(date);
};

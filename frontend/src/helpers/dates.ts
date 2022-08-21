import dayjs from 'dayjs';

export const isToday = date => {
  const yesterday = new Date();
  return yesterday.toLocaleDateString() === date.toLocaleDateString();
};

export const date = (date: string | Date) => {
  return dayjs(date).format('DD/MM/YYYY');
};

export const yearsDiff = (date: string | Date) => {
  const now = dayjs();
  return now.diff(date, 'year');
};

type MaybeDate = string | Date | null | undefined;

export function lifeDates(birth: MaybeDate, death: MaybeDate) {
  const a: string[] = [];
  if (birth) {
    a.push(date(birth));
  }

  if (death) {
    a.push(date(death));
  }

  let str = a.join(' - ');

  if (birth) {
    str = `${str} (${yearsDiff(birth)})`;
  }

  return str;
}

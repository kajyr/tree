import dayjs from 'dayjs';

type Maybe<T> = T | null | undefined;
type MaybeDate = Maybe<string | Date>;

export const isToday = date => {
  const yesterday = new Date();
  return yesterday.toLocaleDateString() === date.toLocaleDateString();
};

export const date = (date: string | Date) => {
  return dayjs(date).format('DD/MM/YYYY');
};

export const yearsDiff = (date: string | Date, until: MaybeDate) => {
  return (until ? dayjs(until) : dayjs()).diff(date, 'year');
};

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
    str = `${str} (${yearsDiff(birth, death)})`;
  }

  return str;
}

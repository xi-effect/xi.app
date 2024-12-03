const parseDate = (input: string | Date): Date | null => {
  if (input instanceof Date) {
    return Number.isNaN(input.getTime()) ? null : input;
  }
  const [day, month, year] = input.split('.').map(Number);
  const parsedDate = new Date(year, month - 1, day);
  return Number.isNaN(parsedDate.getTime()) ? null : parsedDate;
};

/**
 * Проверяет, принадлежат ли две даты разным дням.
 *
 * @param date1 - Первая дата, строка формата "dd.mm.yyyy" или объект `Date`.
 * @param date2 - Вторая дата, строка формата "dd.mm.yyyy" или объект `Date`.
 * @returns `true`, если даты принадлежат разным дням; `false`,
 * если хотя бы одна из дат некорректна или дни совпадают.
 */
export const areDatesDifferent = (date1: string | Date, date2: string | Date): boolean => {
  const parsedDate1 = parseDate(date1);
  const parsedDate2 = parseDate(date2);

  if (!parsedDate1 || !parsedDate2) {
    return false;
  }

  return (
    parsedDate1.getDate() !== parsedDate2.getDate() ||
    parsedDate1.getMonth() !== parsedDate2.getMonth() ||
    parsedDate1.getFullYear() !== parsedDate2.getFullYear()
  );
};

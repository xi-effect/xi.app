const parseDate = (input: string | Date): Date | null => {
  // Попробуем распарсить ISO 8601 формат
  const isoDate = new Date(input);
  if (!Number.isNaN(isoDate.getTime())) {
    return isoDate;
  }

  if (input instanceof Date) {
    return Number.isNaN(input.getTime()) ? null : input;
  }

  if (!/^\d{2}\.\d{2}\.\d{4}( \d{2}:\d{2}(:\d{2})?)?$/.test(input)) {
    throw new Error('Invalid date format. Expected "dd.mm.yyyy".');
  }

  const [datePart] = input.split(' ');
  const [day, month, year] = datePart.split('.').map(Number);

  if (Number.isNaN(day) || Number.isNaN(month) || Number.isNaN(year)) {
    return null;
  }

  return new Date(year, month - 1, day);
};

/**
 * Форматирует дату из строки формата "dd.mm.yyyy" или объекта `Date` в строку вида "d месяц".
 *
 * @param dateInput - Дата в формате строки "dd.mm.yyyy" или объект `Date`.
 * @returns Строка с форматированной датой или `null`, если дата некорректна.
 * @throws {Error} Если строка имеет некорректный формат.
 */
export const formatDate = (dateInput: string | Date): string | null => {
  const date = parseDate(dateInput);

  if (!date) {
    return null;
  }

  return date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
  });
};

export const formatTimeFromISO = (isoString: string): string => {
  const date = new Date(isoString);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

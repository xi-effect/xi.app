export const sortValues = {
  CLOSING_DATE: 'closingDate',
  OPENING_DATE: 'openingDate',
  CREATION_DATE: 'creationDate',
  UNVERIFIED_COUNT: 'unverifiedCount',
} as const;

export const statuses = {
  ALL: 'all',
  ACTIVE: 'active',
  CLOSED: 'closed',
} as const;

// Текст хинта настройки ответа
export const hint = `Режимы проверки:
Точно — ответ студента полностью совпадает с ответом преподавателя
Содержит — ответ студента частично или полностью соответсвует ответу преподавателя
Пример: Правильный ответ — Павел Петрович Бажов; Возможные варианты — Бажов, П.П. Бажов, Павел Бажов и другие
Математика — введеный ответ проверяется на математическое равенство заданному ответу преподавателя
Пример: Ответы «7,62», «7.62», «07,62», «7,625» будут соответсвовать правильному «7,62»
`;

// Варианты настройки правильного ответа
export const answerModes = {
  exact: 'Точно',
  contains: 'Содержит',
  math: 'Математика',
};

// Модели оценивания
export const gradingModels = {
  fivePoint: '5-бальная',
  twelvePoint: '12-бальная',
  hundredPoint: '100-бальная',
  letter: 'Буквенная',
  custom: 'Произвольная',
  noGrade: 'Без оценки',
};

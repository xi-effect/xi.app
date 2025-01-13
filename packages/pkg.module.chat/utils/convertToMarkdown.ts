import { slateToMarkdown } from '@xipkg/inputsmart';

export const convertToMarkdown = (content: string) => {
  let parsedContent;

  try {
    // Попытка распарсить строку
    parsedContent = JSON.parse(content);

    // Иногда может понадобиться распарсить ещё раз
    if (typeof parsedContent !== 'object') {
      parsedContent = JSON.parse(parsedContent);
    }
  } catch (e) {
    console.log('error', e);
    // Если парсинг не удался, возвращаем исходную строку
    return content;
  }

  // Проверяем, является ли результат парсинга массивом объектов
  if (Array.isArray(parsedContent) && parsedContent.every((el) => typeof el === 'object')) {
    return slateToMarkdown(parsedContent);
  }

  // Если это не массив объектов, возвращаем строку как есть
  return content;
};

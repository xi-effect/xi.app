import { FileT } from './common';
import { CommunityInSidebar } from './community';

export type UserT = {
  id: number | null; // ID пользователя, уникален
  username: string; // Имя пользователя, может быть неуникальным
  handle: string; // Уникальное имя пользователя, отображается в интерфейсе как основное
  avatar: FileT | null; // Аватарка пользователя
  communities: CommunityInSidebar[]; // Массив Сообществ
};

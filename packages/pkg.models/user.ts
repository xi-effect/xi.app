export type UserT = {
  id: number | null; // ID пользователя, уникален
  email: string; //
  username: string; // Уникальный индификатор пользователя, отображается в интерфейсе как основное
  displayName: string; // Имя пользователя, может быть неуникальным
  theme: string; // Тема
  // communities: CommunityInSidebar[]; // Массив Сообществ
  onboardingStage:
    | 'created'
    | 'community-choice'
    | 'community-create'
    | 'community-invite'
    | 'completed'
    | null; // Статус прохождения welcome страниц (то, что после регистрации)
};

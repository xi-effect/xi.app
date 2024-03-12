export type ProfileT = {
  email: string;
  confirmed: boolean | null; // Подтверждён ли email
  code: string | null;
  name: string;
  surname: string;
  patronymic: string;
  birthday: Date | null; // "2011-12-19T15:28:46.493Z" date.toISOString();
  theme: 'system' | 'dark' | 'light';
};

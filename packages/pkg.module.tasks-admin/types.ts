import { sortValues, statuses } from './consts';

export type TaskCardT = {
  id: number;
  name: string;
  type: 'task' | 'test';
  creationDate: Date;
  closingDate: Date;
  openingDate: Date;
  status: StatusesT;
};

export type TaskCardActionsT = {
  onDelete: (id: number) => void;
};

export type SortValuesT = (typeof sortValues)[keyof typeof sortValues];
export type StatusesT = (typeof statuses)[keyof typeof statuses];

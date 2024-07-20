export type TaskCardT = {
  id: number;
  name: string;
  type: 'task' | 'test';
  creationDate: Date;
  closingDate: Date;
  openingDate: Date;
  status: (typeof statuses)[keyof typeof statuses];
};

export const statuses = {
  ALL: 'all',
  ACTIVE: 'active',
  CLOSED: 'closed',
} as const;

export type TaskCardActionsT = {
  onDelete: (id: number) => void;
};

export const sortValues = {
  CLOSING_DATE: 'closingDate',
  OPENING_DATE: 'openingDate',
  CREATION_DATE: 'creationDate',
  UNVERIFIED_COUNT: 'unverifiedCount',
} as const;

export type SortValuesT = (typeof sortValues)[keyof typeof sortValues];

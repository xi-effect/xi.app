import { statuses, selectStatuses, grades } from './consts';

export type TaskT = {
  id: number;
  name: string;
  creationDate: Date;
  closingDate: Date;
  author: string;
  status: StatusT;
  grade?: GradeT;
};

export type StatusT = (typeof statuses)[keyof typeof statuses];

export type SelectStatusT = (typeof selectStatuses)[keyof typeof selectStatuses];

export type GradeT = (typeof grades)[keyof typeof grades];

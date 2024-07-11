export const statuses = {
  APPOINTED: 'appointed',
  OVERDUE: 'overdue',
  CHECKING: 'checking',
  ASSESSED: 'assessed',
} as const;

export const grades = {
  A: 5,
  B: 4,
  C: 3,
  D: 2,
  E: 1,
} as const;

export const selectStatuses = {
  ALL: 'all',
  ...statuses,
} as const;

export type TaskType = 'simple' | 'long' | 'choose';

export type Task = {
  id: number;
  type: TaskType;
};

export type Answer = {
  answerType: string;
  answer: string;
  isCaseSensitive: boolean;
};

export type SimpleAnswerData = {
  question: string;
  answers: Answer[];
};

export type SimpleAnswerRef = {
  getData: () => Promise<SimpleAnswerData>;
};

export type AllTasksData = {
  taskId: number;
  question: string;
  answers: Answer[];
};

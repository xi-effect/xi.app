export type Files = {
  fileId: string;
}[];

export type Links = {
  url: string;
}[];

export type MessageT = {
  id: string;
  content: string; // есть в MessageInput и MessageContent
  files?: Files;
  links?: Links;
  pinned: boolean;
  senderUserId: number;
  createdAt?: string;
  updatedAt?: string;
};

type FilesSnake = {
  fileId: string;
}[];

export type MessageSnakeCaseT = {
  id: string;
  content: string; // есть в MessageInput и MessageContent
  files?: FilesSnake;
  links?: Links;
  pinned: boolean;
  sender_user_id: number;
  created_at?: string;
  updated_at?: string;
};
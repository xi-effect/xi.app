import { UserT } from './user';

export type ResponseDataRegT = {
  communities: RegCommunityT[];
  a: string;
  user: UserT;
};

export type RegCommunityT = {
  name: string;
  description?: string;
  id: number;
};

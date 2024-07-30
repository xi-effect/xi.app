export type CategoryT = {
  uid: string;
  id: number | null | 'empty';
  name: string | null;
  description: string | null;
};

export type ChannelT = {
  uid: string;
  id: number;
  categoryId: number | 'empty';
  kind: string;
  name: string;
  disabled?: boolean;
};

export type UpdateChannelReqT = {
  community_id: number;
  channel_id: number;
  data: {
    name: string;
    description: string;
  };
};

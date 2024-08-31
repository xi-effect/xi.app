export type ItemT = {
  name: string;
};

export type ItemPropsT = {
  index: number;
  item: ItemT;
};

export type RetrieveAnyCommunityT = {
  community: {
    id: number;
    name: string;
    description: null;
  };
  participant: {
    is_owner: boolean;
  };
};

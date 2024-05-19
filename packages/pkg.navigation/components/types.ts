export type CategoryT = {
    name: string,
    description: string,
    id: string
};

export type ChannelT = {
    id: string,
    categoryId: string,
    kind: string,
    name: string,
    disabled?: boolean;
};

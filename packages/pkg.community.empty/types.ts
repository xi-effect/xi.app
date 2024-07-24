export type JoinResponseT = {
  community: {
    description: null;
    id: number;
    name: string;
  };
  participant: {
    is_owner: boolean;
  };
};

export type RequestBodyAvatar = {};

export type ResponseBodyAvatar = {
  formData: FormData;
};

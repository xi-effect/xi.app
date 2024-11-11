import React from 'react';
import useSWR from 'swr';
import { get } from 'pkg.utils';

type ParticipantNamePropsT = {
  id: string | undefined;
  username: string | undefined;
  children?: React.ReactNode;
};

type UserT = {
  display_name: string;
};

const fetcher = async (url: string) => {
  const { data } = await get<UserT>({
    service: 'auth',
    path: url,
    config: {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  });

  return data;
};

export const ParticipantName = ({ id, username, children }: ParticipantNamePropsT) => {
  const { data, isLoading } = useSWR<UserT>(`/api/users/by-id/${id}/profile/`, () =>
    fetcher(`/api/users/by-id/${id}/profile/`),
  );

  if (isLoading || !id) {
    return <span className="bg-gray-10 h-[12px] w-full min-w-[64px] animate-pulse rounded-[4px]" />;
  }

  return (
    <span className="text-[12px] leading-[16px] text-gray-100">
      {children}
      {data?.display_name ?? username}
    </span>
  );
};

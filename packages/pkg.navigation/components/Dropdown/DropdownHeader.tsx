/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import { useParams } from 'next/navigation';
import { ChevronSmallTop } from '@xipkg/icons';
import { AvatarPreview } from '../AvatarPreview';

type DropdownHeaderPropsT = {
  setIsOpen: any;
  inDropdown?: boolean;
  name: string | null;
  id: number | null;
};

export const DropdownHeader = ({
  setIsOpen,
  inDropdown = false,
  name,
  id,
}: DropdownHeaderPropsT) => {
  const params = useParams<{ 'community-id': string }>();
  const isNotCommunityId = typeof params['community-id'] !== 'string';

  return (
    <div
      id="community-profile"
      onClick={() => {
        if (id) setIsOpen((prev: boolean) => !prev);
      }}
      className={`flex h-12 px-2.5 py-2 md:w-[302px] ${!name || isNotCommunityId ? 'cursor-not-allowed' : 'cursor-pointer'} ${
        inDropdown ? '' : 'mt-0 sm:mt-8'
      } hover:bg-gray-5 items-center rounded-xl transition-colors ease-in`}
    >
      {!id || isNotCommunityId ? (
        <div className="bg-gray-10 size-[32px] animate-pulse rounded-[16px]" />
      ) : (
        <AvatarPreview communityId={id} />
      )}
      {!name || isNotCommunityId ? (
        <div className="bg-gray-10 ml-2 h-4 w-[156px] animate-pulse self-center rounded-[2px] text-[16px] font-semibold" />
      ) : (
        <div className="ml-2 self-center truncate text-[16px] font-semibold">{name}</div>
      )}
      <div className="ml-auto flex h-4 w-4 flex-col items-center justify-center">
        <ChevronSmallTop
          size="s"
          className={`transition-transform ease-in ${inDropdown ? '' : 'rotate-180'}`}
        />
      </div>
    </div>
  );
};

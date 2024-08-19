import { Announce, Plus } from '@xipkg/icons';
import { Button } from '@xipkg/button';
import { useParams, useRouter } from 'next/navigation';
import { useMainSt } from 'pkg.stores';
import { useGetUrlWithParams } from 'pkg.utils.client';

const NoContent = () => {
  const isOwner = useMainSt((state) => state.communityMeta.isOwner);

  const getUrlWithParams = useGetUrlWithParams();
  const router = useRouter();
  const params = useParams<{ 'community-id': string; 'channel-id': string }>();

  const handleRouteChange = () =>
    router.push(
      getUrlWithParams(
        `/communities/${params['community-id']}/channels/${params['channel-id']}/posts/add-post`,
      ),
    );

  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <div className="bg-brand-0 flex h-24 w-24 items-center justify-center rounded-full p-4 sm:h-32 sm:w-32">
        <Announce className="fill-brand-80 h-12 w-12 sm:h-20 sm:w-20" />
      </div>
      <h2 className="mt-4 text-[28px] font-semibold leading-[36px] sm:text-4xl sm:leading-[44px]">
        Объявлений пока нет
      </h2>
      {isOwner && (
        <Button size="l" className="mt-8 w-[168px] pl-3 pr-6" onClick={handleRouteChange}>
          <Plus size="l" className="fill-gray-0 mr-[16px]" />
          Создать
        </Button>
      )}
    </div>
  );
};

export default NoContent;

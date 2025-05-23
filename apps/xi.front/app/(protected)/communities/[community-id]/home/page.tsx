'use client';

import { Button } from '@xipkg/button';
import Image from 'next/image';
import Link from 'next/link';
import { useMainSt } from 'pkg.stores';
import { Avatar, AvatarFallback, AvatarImage } from '@xipkg/avatar';
import { ScrollArea } from '@xipkg/scrollarea';

type AvatarPreviewPropsT = {
  communityId: number;
};

const AvatarPreview = ({ communityId }: AvatarPreviewPropsT) => (
  <Avatar size="l">
    <AvatarImage
      src={`https://api.xieffect.ru/files/communities/${communityId}/avatar.webp`}
      imageProps={{
        src: `https://api.xieffect.ru/files/communities/${communityId}/avatar.webp`,
        alt: 'community user',
      }}
      alt="community avatar"
    />
    <AvatarFallback size="l" />
  </Avatar>
);

const Header = () => {
  const communityName = useMainSt((state) => state.communityMeta.name);
  const id = useMainSt((state) => state.communityMeta.id);
  const isOwner = useMainSt((state) => state.communityMeta.isOwner);

  return (
    <header className=" max-xs:pb-4 pb-8 w-full max-w-[1570px]">
      <div className="font-semibold text-[32px] max-xs:text-2xl leading-10 xl:text-[40px] xl:leading-[48px] flex gap-3 flex-wrap text-gray-100">
        <h2 className="mr-3">Добро пожаловать в сообщество</h2>
        <div className="flex items-center">
          {!id ? (
            <div className="bg-gray-10 size-[48px] animate-pulse rounded-[24px]" />
          ) : (
            <AvatarPreview communityId={id} />
          )}
          {!communityName ? (
            <div className="ml-2 xl:ml-4 animate-pulse bg-gray-10 h-[32px] w-[156px] rounded-[8px]" />
          ) : (
            <p className="ml-2 xl:ml-4 supports-[overflow-wrap:anywhere]:[overflow-wrap:anywhere] supports-[not(overflow-wrap:anywhere)]:[word-break:normal]">
              {communityName}
            </p>
          )}
        </div>
      </div>
      {isOwner === null ? (
        <p className="mt-4 h-[32px] w-[256px] rounded-[8px] font-normal max-xs:mt-2 max-xs:text-sm animate-pulse bg-gray-10 text-gray-80 text-[16px] leading-[22px] xl:text-2xl" />
      ) : (
        <p className="mt-4 font-normal max-xs:mt-2 max-xs:text-sm text-gray-80 text-[16px] leading-[22px] xl:text-2xl">
          Ваша роль: {isOwner ? 'администратор' : 'ученик'}
        </p>
      )}
    </header>
  );
};

const InfoCardList = () => (
  <ul className="grid py-8 max-xs:py-4 gap-12 max-w-[1570px] xl:grid-cols-3">
    <li className="overflow-hidden">
      <div className="flex items-end max-xl:justify-center justify-end w-full min-w-[470px] bg-gray-5 h-60 rounded-2xl">
        <Image
          className="h-auto"
          src="/assets/community-home-page/left-menu-screenshot.svg"
          width={422}
          height={0}
          sizes="100vw"
          alt="Изображение 'Меню слева' не загрузилось"
        />
      </div>
      <h3 className="font-semibold text-2xl max-xs:text-xl mt-4">Меню слева</h3>
      <p className="font-normal text-base max-xs:text-sm max-xs:mt-1 mt-2 text-gray-100">
        С помощью меню слева вы можете перемещаться по каналам внутри сообщества
      </p>
    </li>
    <li className="overflow-hidden">
      <div className="w-full xl:min-w-[470px] bg-gray-5 h-60 rounded-2xl flex items-center justify-center">
        <Image
          className="h-auto"
          src="/assets/community-home-page/roles-screenshot.svg"
          width={236}
          height={92}
          sizes="100vw"
          alt="Изображение 'Роли' не загрузилось"
        />
      </div>
      <h3 className="font-semibold text-2xl max-xs:text-xl mt-4">Роли</h3>
      <p className="font-normal text-base max-xs:text-sm max-xs:mt-1 mt-2 text-gray-100">
        В рамках сообщества могут взаимодействовать только студенты и преподаватели
      </p>
    </li>
    <li>
      <div className="flex bg-gray-5 justify-center h-60 rounded-2xl">
        <Image
          className="w-[342px] h-[calc(100%-48px)] mt-12"
          src="/assets/community-home-page/change-community-screenshot.svg"
          width={0}
          height={0}
          sizes="100vw"
          alt="Изображение 'Смена сообщества' не загрузилось"
        />
      </div>
      <h3 className="font-semibold text-2xl max-xs:text-xl mt-4">Смена сообщества</h3>
      <p className="font-normal text-base max-xs:text-sm max-xs:mt-1 mt-2 text-gray-100">
        Для перехода в другое сообщество выберите его из выпадающего списка в меню слева
      </p>
    </li>
  </ul>
);

const SupportBox = () => (
  <section className="py-8 max-xs:py-4 w-full max-w-[1570px]">
    <div className="bg-gray-5 p-8 rounded-2xl w-full">
      <div className="flex gap-1">
        <h3 className="font-semibold text-[32px] max-xs:text-2xl leading-10 xl:text-[40px] xl:leading-[48px]">
          Мы всегда рядом
        </h3>
        <span className="bg-[url('/assets/community-home-page/support-box-heart.svg')] bg-no-repeat bg-center w-[15px] max-xs:w-[12px] xl:w-[18px] mb-2 bg-contain" />
      </div>
      <p className="text-sm max-xs:text-xs xl:text-xl text-gray-80 font-normal mt-2 max-w-[800px]">
        Наша команда всегда на связи и готова ответить на любые вопросы. А ещё мы рады обратной
        связи, вашим идеям и предложениям.
      </p>
      <div className="flex gap-8 mt-6 max-[600px]:flex-col max-[600px]:gap-2 ">
        <Button className="text-sm h-8 xl:h-12 xl:text-base font-medium" asChild>
          <Link href="https://t.me/+SCYx_bvsSolmMmZi">
            Написать в телеграм
            <span className="bg-[url('/assets/community-home-page/tg-filled-icon.svg')] bg-no-repeat bg-center bg-contain ml-[6px] xl:ml-2 w-4 h-4 xl:w-6 xl:h-6" />
          </Link>
        </Button>
        <Button
          variant="secondary"
          className="text-sm h-8 xl:h-12 xl:text-base border-[1px] xl:border-2 font-medium"
          asChild
        >
          <Link href="https://support.xieffect.ru/">
            Посмотреть руководства
            <span className="bg-[url('/assets/community-home-page/manual-icon.svg')] bg-no-repeat bg-center bg-contain ml-[6px] xl:ml-2 w-4 h-4 xl:w-6 xl:h-6" />
          </Link>
        </Button>
      </div>
    </div>
  </section>
);

export default function CommunityHomePage() {
  return (
    <ScrollArea>
      <div className="flex flex-col h-[calc(100dvh-80px)] md:h-screen p-8 max-xs:p-4">
        <Header />
        <InfoCardList />
        <SupportBox />
      </div>
    </ScrollArea>
  );
}

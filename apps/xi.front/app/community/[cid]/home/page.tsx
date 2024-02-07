'use client';

import { Button } from '@xipkg/button';
import { Telegram, TaskFile } from '@xipkg/icons';

import Image from 'next/image';
import Link from 'next/link';

function Header() {
  const role = 'администратор';

  return (
    <header className="pb-8 w-[100%] max-w-[1570px]">
      <div className="flex font-semibold text-[40px] leading-[48px]">
        <h2>Добро пожаловать в сообщество</h2>
        <div className="flex ml-6">
          <Image src="/assets/avatarrep.svg" alt="Аватар пользователя" width={48} height={48} />
          <p className="ml-4">Иванова А. Г.</p>
        </div>
      </div>
      <p className="mt-4 font-normal text-[#404040] text-2xl">
        Ваша роль: {role || `[РОЛЬ ПОЛЬЗОВАТЕЛЯ]`}
      </p>
    </header>
  );
}

function InfoCardList() {
  return (
    <ul className="grid grid-cols-3 py-8 gap-12 max-w-[1570px]">
      <li>
        <div className="w-full bg-gray-5 overflow-hidden h-60 rounded-2xl">
          <Image
            className="min-w-[470px] h-auto"
            src={'/assets/community-home-page/left-menu-screenshot.png'}
            width={0}
            height={0}
            sizes="100vw"
            alt={`Изображение 'Меню слева' не загрузилось`}
          />
        </div>
        <h3 className="font-semibold text-2xl mt-4">Меню слева</h3>
        <p className="font-normal text-base mt-2 text-[#101010]">
          С помощью меню слева вы можете перемещаться по каналам внутри сообщества
        </p>
      </li>
      <li>
        <div className="w-full bg-gray-5 overflow-hidden h-60 rounded-2xl">
          <Image
            className="min-w-[470px] h-auto"
            src={'/assets/community-home-page/roles-screenshot.png'}
            width={0}
            height={0}
            sizes="100vw"
            alt={`Изображение 'Роли' не загрузилось`}
          />
        </div>
        <h3 className="font-semibold text-2xl mt-4">Роли</h3>
        <p className="font-normal text-base mt-2 text-[#101010]">
          В рамках сообщества могут взаимодейтсвовать только студенты и преподаватели
        </p>
      </li>
      <li>
        <div className="flex bg-gray-5 justify-center h-60 rounded-2xl">
          <Image
            className="w-[342px] h-[calc(100%-48px)] mt-12"
            src={'/assets/community-home-page/change-community-screenshot.png'}
            width={0}
            height={0}
            sizes="100vw"
            alt={`Изображение 'Смена сообщества' не загрузилось`}
          />
        </div>
        <h3 className="font-semibold text-2xl mt-4">Смена сообщества</h3>
        <p className="font-normal text-base mt-2 text-[#101010]">
          Для перехода в другое сообщество выберите его из выпадающего списка в меню слева
        </p>
      </li>
    </ul>
  );
}

function SupportBox() {
  return (
    <div className="bg-[#F7F7F7] p-8 rounded-2xl my-8 w-[100%] max-w-[1570px]">
      <div className="flex gap-1">
        <h3 className="font-semibold text-[40px] leading-[48px]">Мы всегда рядом</h3>
        <span className="bg-[url('/assets/community-home-page/support-box-heart.svg')] bg-no-repeat bg-center w-[18px] mb-2" />
      </div>
      <p className="text-xl text-[#404040] font-normal mt-2 max-w-[800px]">
        Наша команда всегда на связи и готова ответить на любые вопросы. А ещё мы рады обратной
        связи, вашим идеям и предложениям.
      </p>
      <div className="flex gap-8 mt-6">
        <Button className="text-base font-medium">
          Написать в телеграм <Telegram className="fill-white ml-2" width={24} height={24} />
        </Button>
        <Button variant={'secondary'} className="text-base font-medium">
          Посмотреть руководства <TaskFile className="ml-2" width={24} height={24} />
        </Button>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="flex justify-between mt-auto items-center w-[100%] max-w-[1570px]">
      <div className="flex gap-2">
        <Image src={'/assets/brand/navigationlogo.svg'} alt="Логотип" width={67.25} height={8} />
        <p className="text-xs font-normal text-[#282828]">с 2020 года</p>
      </div>
      <ul className="flex gap-8">
        <li>
          <Link href={'#'} className="text-xs font-normal text-[#282828]">
            Поддержка
          </Link>
        </li>
        <li>
          <Link href={'#'} className="text-xs font-normal text-[#282828]">
            Политика конфиденциальности
          </Link>
        </li>
        <li>
          <Link href={'#'} className="text-xs font-normal text-[#282828]">
            Пользовательское соглашение
          </Link>
        </li>
      </ul>
    </footer>
  );
}

export default function CommunityHomePage() {
  return (
    <div className="flex flex-col h-full items-center">
      <Header />
      <InfoCardList />
      <SupportBox />
      <Footer />
    </div>
  );
}

'use client';

import { Button } from '@xipkg/button';
import { Telegram, TaskFile } from '@xipkg/icons';

import Image from 'next/image';
import Link from 'next/link';

function Header() {
  const role = 'администратор';
  return (
    <>
      <div className="flex font-semibold text-4xl">
        <h2>Добро пожаловать в сообщество</h2>
        <div className="flex ml-6">
          <Image src="/assets/avatarrep.svg" alt="Аватар пользователя" width={48} height={48} />
          <p className="ml-4">Иванова А. Г.</p>
        </div>
      </div>
      <p className="mt-4 font-normal text-[#404040] text-2xl">
        Ваша роль: {role || `[РОЛЬ ПОЛЬЗОВАТЕЛЯ]`}
      </p>
    </>
  );
}

function InfoCard({ title, text, imgSrc }) {
  return (
    <li>
      <Image
        style={{}}
        src={imgSrc}
        alt={`Изображение '${title}' не загрузилось`}
        width={470}
        height={240}
      />
      <h3 className="font-semibold text-2xl mt-4">{title}</h3>
      <p className="font-normal text-base mt-2 text-[#101010]">{text}</p>
    </li>
  );
}

function SupportBox() {
  return (
    <div className="bg-[#F7F7F7] p-8 rounded-2xl my-8">
      <h3 className="font-semibold text-4xl">Мы всегда рядом</h3>
      <p className="text-xl text-[#404040] font-normal mt-2">
        Наша команда всегда на связи и готова ответить на любые вопросы. А ещё мы рады обратной
        связи, вашим идеям и предложениям.
      </p>
      <div className="flex gap-8 mt-6">
        <Button>
          Написать в телеграм <Telegram className="fill-white ml-2" />
        </Button>
        <Button variant={'secondary'}>
          Посмотреть руководства <TaskFile className="ml-2" />
        </Button>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="flex justify-between mt-auto items-center">
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
    <div className="flex flex-col h-full">
      <Header />
      <ul className="flex py-8 gap-12">
        <InfoCard
          title={'Меню слева'}
          text={'С помощью меню слева вы можете перемещаться по каналам внутри сообщества'}
          imgSrc={'/assets/community-home-page/left-menu-screenshot.png'}
        />
        <InfoCard
          title={'Роли'}
          text={'В рамках сообщества могут взаимодейтсвовать только студенты и преподаватели'}
          imgSrc={'/assets/community-home-page/roles-screenshot.png'}
        />
        <InfoCard
          title={'Смена сообщества'}
          text={'Для перехода в другое сообщество выберите его из выпадающего списка в меню слева'}
          imgSrc={'/assets/community-home-page/change-community-screenshot.png'}
        />
      </ul>
      <SupportBox />
      <Footer />
    </div>
  );
}

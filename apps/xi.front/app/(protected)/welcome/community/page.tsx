'use client';

import { Button } from '@xipkg/button';
import { Group, Mail, Plus } from '@xipkg/icons';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useGetUrlWithParams } from 'pkg.utils.client';
import { del, put } from 'pkg.utils/fetch';
import React, { useLayoutEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { useMainSt } from 'pkg.stores';
import { Logo } from 'pkg.logo';

type RequestBody = {};

type ResponseBody = {
  detail: string;
};

export default function WelcomeCommunity() {
  const updateUser = useMainSt((state) => state.updateUser);

  const router = useRouter();
  const searchParams = useSearchParams();
  const getUrlWithParams = useGetUrlWithParams();

  const [activeButton, setActiveButton] = useState({
    tab: 0,
    height: 86,
    top: 0,
  });

  const handleNext = async () => {
    if (activeButton.tab === 0) {
      const { status } = await put<RequestBody, ResponseBody>({
        service: 'auth',
        path: '/api/onboarding/stages/community-create/',
        body: {},
        config: {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      });

      if (status === 204) {
        updateUser({ onboardingStage: 'community-create' });
        router.push(getUrlWithParams(getUrlWithParams('/welcome/community-create')));
      } else {
        toast('Ошибка сервера');
      }
    }

    if (activeButton.tab === 1) {
      const { status } = await put<RequestBody, ResponseBody>({
        service: 'auth',
        path: '/api/onboarding/stages/community-invite/',
        body: {},
        config: {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      });

      if (status === 204) {
        updateUser({ onboardingStage: 'community-invite' });
        router.push(getUrlWithParams('/welcome/community-invite'));
      } else {
        toast('Ошибка сервера');
      }
    }

    if (activeButton.tab === 2) {
      const { status } = await put<RequestBody, ResponseBody>({
        service: 'auth',
        path: '/api/onboarding/stages/community-invite/',
        body: {},
        config: {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      });

      if (status === 204) {
        updateUser({ onboardingStage: 'community-invite' });
        if (searchParams.has('iid') && searchParams.has('community')) {
          router.push(
            getUrlWithParams(
              `/welcome/community-invite?iid=${searchParams.get('iid')}&community=${searchParams.get('community')}`,
            ),
          );
        } else {
          router.push(getUrlWithParams('/welcome/community-invite'));
        }
      } else {
        toast('Ошибка сервера');
      }
    }
  };

  const handleBack = async () => {
    const { status } = await del({
      service: 'auth',
      path: '/api/onboarding/stages/community-choice/',
      config: {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    });

    if (status === 204) {
      updateUser({ onboardingStage: 'created' });
      if (searchParams.has('iid') && searchParams.has('community')) {
        router.push(
          getUrlWithParams(
            `/welcome/user-info?iid=${searchParams.get('iid')}&community=${searchParams.get('community')}`,
          ),
        );
      } else {
        router.push(getUrlWithParams('/welcome/user-info'));
      }
    } else {
      toast('Ошибка сервера');
    }
  };

  const firstButton = useRef<HTMLButtonElement>(null);
  const secondButton = useRef<HTMLButtonElement>(null);
  const thirdButton = useRef<HTMLButtonElement>(null);

  useLayoutEffect(() => {
    if (firstButton === null || firstButton.current === null) return;

    if (searchParams.has('iid') && searchParams.has('community')) {
      const topForLastButton =
        firstButton.current?.clientHeight && secondButton.current?.clientHeight
          ? Number(firstButton.current?.clientHeight) + Number(secondButton.current?.clientHeight)
          : 0;
      setActiveButton({
        tab: 2,
        height: thirdButton.current?.clientHeight || 0,
        top: topForLastButton || 0,
      });
    } else {
      const { height } = firstButton.current.getBoundingClientRect();
      setActiveButton({
        tab: 0,
        height,
        top: 0,
      });
    }
  }, []);

  const onButtonClick = (index: number) => {
    if (index === 0) {
      return setActiveButton({
        tab: 0,
        height: firstButton.current?.clientHeight || 0,
        top: 0,
      });
    }

    if (index === 1) {
      return setActiveButton({
        tab: 1,
        height: secondButton.current?.clientHeight || 0,
        top: firstButton.current?.clientHeight || 0,
      });
    }

    const topForLastButton =
      firstButton.current?.clientHeight && secondButton.current?.clientHeight
        ? Number(firstButton.current?.clientHeight) + Number(secondButton.current?.clientHeight)
        : 0;
    if (index === 2) {
      setActiveButton({
        tab: 2,
        height: thirdButton.current?.clientHeight || 0,
        top: topForLastButton || 0,
      });
    }

    return null;
  };

  return (
    <div className="flex flex-row justify-center content-center w-screen h-[100dvh] xs:h-screen">
      <div className="h-full w-full p-8 flex justify-center content-center">
        <div className="flex flex-col h-full xs:p-8 w-full max-w-[536px]">
          <div className="h-22">
            <Logo height={24} width={202} logoVariant="navigation" logoSize="default" />
          </div>
          <div className="mt-16 flex flex-row justify-between w-full items-start gap-4">
            <div className="bg-brand-80 w-1/4 h-1.5 rounded" />
            <div className="bg-brand-80 w-1/4 h-1.5 rounded" />
            <div className="bg-gray-10 w-1/4 h-1.5 rounded" />
            <div className="bg-gray-10 w-1/4 h-1.5 rounded" />
          </div>
          <div id="title" className="mt-8 text-2xl font-semibold leading-[32px] text-gray-100">
            Сообщество
          </div>
          <div className="leading-[22px] text-gray-100 mt-8">
            Сообщества — основная часть нашего приложения. Вся ваша работа будет связана с ними.
            В дальнейшем вы сможете создать ещё неограниченное число сообществ, а пока выберите,
            что хотите сделать
          </div>
          <div className="relative mt-6 border border-gray-30 bg-gray-0 flex flex-col w-full items-start rounded-2xl">
            <div
              style={{ height: activeButton.height, top: activeButton.top }}
              className="absolute border-solid border-brand-100 bg-brand-0 flex flex-row justify-start ml-0 p-4 gap-2 w-full items-start border rounded-2xl transition-all ease-in duration-300"
            />
            <button
              type="button"
              ref={firstButton}
              onClick={() => onButtonClick(0)}
              className="bg-transparent flex flex-row justify-start ml-0 p-4 gap-2 w-full items-start"
            >
              <Plus
                className={`z-10 mt-0.5 ${activeButton.tab === 0 ? 'fill-brand-100' : 'fill-gray-80'}`}
              />
              <div className="flex flex-col gap-1 text-start">
                <span
                  className={`z-10 text-xl font-medium leading-[28px] ${
                    activeButton.tab === 0 ? 'text-brand-100' : 'text-gray-80'
                  }`}
                >
                  Создать
                </span>
                <span
                  className={`z-10 leading-[22px] ${activeButton.tab === 0 ? 'text-brand-100' : 'text-gray-80'}`}
                >
                  Новое сообщество под ваши задачи
                </span>
              </div>
            </button>
            <button
              type="button"
              ref={secondButton}
              onClick={() => onButtonClick(1)}
              className="bg-transparent flex flex-row justify-start ml-0 p-4 gap-2 w-full items-start"
            >
              <Mail
                className={`z-10 mt-0.5 ${activeButton.tab === 1 ? 'fill-brand-100' : 'fill-gray-80'}`}
              />
              <div className="flex flex-col gap-1 text-start">
                <span
                  className={`z-10 text-xl font-medium leading-[28px] ${
                    activeButton.tab === 1 ? 'text-brand-100' : 'text-gray-80'
                  }`}
                >
                  Присоединиться
                </span>
                <span
                  className={`z-10 leading-[22px] ${activeButton.tab === 1 ? 'text-brand-100' : 'text-gray-80'}`}
                >
                  Если есть ссылка-приглашение
                </span>
              </div>
            </button>
            {searchParams.has('iid') && searchParams.has('community') && (
              <button
                type="button"
                ref={thirdButton}
                onClick={() => onButtonClick(2)}
                className="bg-transparent flex flex-row justify-start ml-0 p-4 gap-2 w-full items-start"
              >
                <Group
                  className={`z-10 mt-0.5 ${activeButton.tab === 2 ? 'fill-brand-100' : 'fill-gray-80'}`}
                />
                <div className="flex flex-col gap-1 text-start">
                  <span
                    className={`z-10 text-xl font-medium leading-[28px] ${
                      activeButton.tab === 2 ? 'text-brand-100' : 'text-gray-80'
                    }`}
                  >
                    Присоедениться к сообществу «{searchParams.get('community')}»
                  </span>
                </div>
              </button>
            )}
          </div>
          <div className="pt-4 mt-auto flex flex-row gap-6">
            <Button onClick={handleBack} variant="ghost" className="w-[98px]">
              Назад
            </Button>
            <Button onClick={handleNext} className="w-full">
              Продолжить
            </Button>
          </div>
        </div>
      </div>
      <div className="hidden md:flex w-full m-w-[856px] bg-gray-5">
        <div className="pt-16 pl-16 h-full w-full relative">
          <div className="absolute h-[calc(100vh-64px)] w-full">
            <Image
              style={{
                objectFit: 'cover',
                objectPosition: 'left',
              }}
              alt="interface example"
              src="/assets/welcome/community.png"
              fill
            />
          </div>
        </div>
      </div>
    </div>
  );
}

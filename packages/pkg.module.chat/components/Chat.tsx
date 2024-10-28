import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import { Button } from '@xipkg/button';
/* import { time } from 'console'; */
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@xipkg/dropdown';
import { Edit, Emotions, Link, MenuDots, Pin, Share, Trash } from '@xipkg/icons';

import { useLoadItems } from '../utils';

// type Message = {
//   name: string;
//   time: string;
//   message: string;
// };

type MessageItemT = {
  id: string;
  name: string;
  time: string;
  message: string;
};

const mocksMessages: MessageItemT[] = [
  {
    id: '1',
    name: 'Анна Иванова',
    time: '22.03.2024 09:15',
    message: 'Привет, ребята! Сегодня занятий не будет, я заболела.',
  },
  {
    id: '2',
    name: 'Денис Спиридонов',
    time: '22.03.2024 09:30',
    message: 'Ой, как жаль! Выздоравливайте скорее!',
  },
  {
    id: '3',
    name: 'Анна Иванова',
    time: '22.03.2024 10:05',
    message: 'Спасибо, Денис!',
  },
  {
    id: '4',
    name: 'Денис Спиридонов',
    time: '22.03.2024 10:30',
    message: 'Если что, можем помочь с уроками онлайн.',
  },
  {
    id: '5',
    name: 'Анна Иванова',
    time: '22.03.2024 11:00',
    message: 'Это было бы здорово, давайте завтра.',
  },
  {
    id: '6',
    name: 'Денис Спиридонов',
    time: '22.03.2024 11:15',
    message: 'Договорились! Выздоравливайте!',
  },
  {
    id: '7',
    name: 'Анна Иванова',
    time: '22.03.2024 12:00',
    message: 'Спасибо за поддержку, до завтра!',
  },
  {
    id: '8',
    name: 'Денис Спиридонов',
    time: '22.03.2024 12:30',
    message: 'Не за что, до завтра!',
  },
  {
    id: '9',
    name: 'Анна Иванова',
    time: '23.03.2024 09:00',
    message: 'Всем доброе утро! Я готова к уроку.',
  },
  {
    id: '10',
    name: 'Денис Спиридонов',
    time: '23.03.2024 09:05',
    message: 'Доброе утро! Начинаем через 5 минут.',
  },
];

export const Chat = () => {
  const { loading, items, hasNextPage, error, loadMore } = useLoadItems();

  const [infiniteRef, { rootRef }] = useInfiniteScroll({
    loading,
    hasNextPage,
    onLoadMore: loadMore,
    disabled: Boolean(error),
    rootMargin: '400px 0px 0px 0px',
  });

  const scrollableRootRef = useRef<React.ElementRef<'div'> | null>(null);
  const lastScrollDistanceToBottomRef = useRef<number>();

  const reversedItems = useMemo(() => [...items].reverse(), [items]);

  // We keep the scroll position when new items are added etc.
  useLayoutEffect(() => {
    const scrollableRoot = scrollableRootRef.current;
    const lastScrollDistanceToBottom = lastScrollDistanceToBottomRef.current ?? 0;
    if (scrollableRoot) {
      scrollableRoot.scrollTop = scrollableRoot.scrollHeight - lastScrollDistanceToBottom;
    }
  }, [reversedItems, rootRef]);

  const rootRefSetter = React.useCallback(
    (node: HTMLDivElement) => {
      rootRef(node);
      scrollableRootRef.current = node;
    },
    [rootRef],
  );

  const handleRootScroll = React.useCallback(() => {
    const rootNode = scrollableRootRef.current;
    if (rootNode) {
      const scrollDistanceToBottom = rootNode.scrollHeight - rootNode.scrollTop;
      lastScrollDistanceToBottomRef.current = scrollDistanceToBottom;
    }
  }, []);

  const formatDate = (dateString: string) => {
    const [datePart] = dateString.split(' ');
    const [day, month, year] = datePart.split('.');
    const date = new Date(Number(year), Number(month) - 1, Number(day));

    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
    });
  };

  const [hovered, setHovered] = useState<string | null>(null);
  const [lockedHovered, setLockedHovered] = useState<string | null>(null);
  const menuRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const currentHovered = lockedHovered || hovered;
      if (
        currentHovered &&
        menuRefs.current[currentHovered] &&
        !menuRefs.current[currentHovered]!.contains(event.target as Node)
      ) {
        setLockedHovered(null);
        setHovered(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [lockedHovered, hovered]);

  return (
    <div
      ref={rootRefSetter}
      onScroll={handleRootScroll}
      className="h-[calc(100vh-144px)] overflow-y-auto p-4"
    >
      <ul className="block p-2">
        {hasNextPage && (
          <div className="flex w-full p-2" ref={infiniteRef}>
            <div className="mr-2 h-12 w-12 rounded-full bg-[#e1e3e4]" />
            <div className="flex-1">
              <div className="flex items-center">
                <div className="mr-2 h-6 w-36 rounded-lg bg-[#e1e3e4]" />
                <div className="h-5 w-24 rounded-lg bg-[#e1e3e4] text-[14px] font-normal leading-[20px]" />
              </div>
              <div className="mt-1 h-6 w-full rounded-lg bg-[#e1e3e4]" />
            </div>
          </div>
        )}
        {mocksMessages.length === 0 ? (
          <div className="flex min-h-screen items-center justify-center">
            <span className="text-gray-500">Тут пока пусто</span>
          </div>
        ) : (
          mocksMessages.map(
            (item: MessageItemT) =>
              item != null && (
                <div key={item.id}>
                  <div className="hover: flex w-full justify-center p-2 opacity-0">
                    <span className="rounded-lg bg-[#F7F7F7] px-2 py-1 text-[#585858]">
                      {formatDate(item.time)}
                    </span>
                  </div>

                  <div
                    className={`group relative ${hovered === item.id || lockedHovered === item.id ? 'bg-[#F7F7F7]' : 'hover:bg-[#F7F7F7]'} `}
                    onMouseEnter={() => setHovered(item.id)}
                    onMouseLeave={() => {
                      if (lockedHovered !== item.id) {
                        setHovered(null);
                      }
                    }}
                  >
                    <div className="flex w-full p-2 transition-colors">
                      <img className="mr-2 h-12 w-12 rounded-full" src="" alt="User Avatar" />
                      <div className="flex-1">
                        <div className="flex items-center">
                          <span className="mr-2 font-semibold">{item.name}</span>
                          <span className="text-[14px] font-normal leading-[20px] text-[#9f9f9f]">
                            {item.time}
                          </span>
                        </div>
                        <p className="relative mt-1 w-[600] text-gray-800">{item.message}</p>
                      </div>
                    </div>

                    <div
                      ref={(el: HTMLDivElement | null) => {
                        menuRefs.current[item.id] = el;
                      }}
                      className={`pointer-events-none absolute right-1 top-5 ${hovered === item.id ? 'pointer-events-auto opacity-100' : 'opacity-0'}`}
                    >
                      <div className="relative flex">
                        <Button
                          variant="ghost"
                          type="button"
                          className="m-0 h-6 w-6 p-0"
                          onClick={() => setHovered(item.id)}
                        >
                          <Emotions />
                        </Button>
                        <Button
                          variant="ghost"
                          type="button"
                          className="m-0 h-6 w-6 p-0"
                          onClick={() => setHovered(item.id)}
                        >
                          <Share />
                        </Button>
                        <Button
                          variant="ghost"
                          type="button"
                          className="m-0 h-6 w-6 p-0"
                          onClick={() => setHovered(item.id)}
                        >
                          <Edit />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger className="cursor-pointer" asChild>
                            <Button
                              variant="ghost"
                              type="button"
                              className="m-0 h-6 w-6 p-0"
                              onClick={() => {
                                setLockedHovered(item.id);
                                setHovered(item.id);
                              }}
                            >
                              <MenuDots />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Pin className="mr-2 h-5 w-5" />
                              <span className="text-[14px]">Закрепить сообщение</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Link className="mr-2 h-5 w-5" />
                              <span className="text-[14px]">Видео</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Trash className="mr-2 h-5 w-5" />
                              <span className="text-[14px]">Удалить</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                </div>
              ),
          )
        )}
      </ul>
    </div>
  );
};

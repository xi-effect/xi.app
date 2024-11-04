import React from 'react';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import { Button } from '@xipkg/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@xipkg/dropdown';
import { Edit, Emotions, Link, MenuDots, Pin, Share, Trash } from '@xipkg/icons';
import { Avatar, AvatarFallback, AvatarImage } from '@xipkg/avatar';
import { useLoadItems } from '../utils';

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

  const scrollableRootRef = React.useRef<React.ElementRef<'div'> | null>(null);
  const lastScrollDistanceToBottomRef = React.useRef<number>();

  const reversedItems = React.useMemo(() => [...items].reverse(), [items]);

  // We keep the scroll position when new items are added etc.
  React.useLayoutEffect(() => {
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

    const dateFormat = date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
    });

    return dateFormat;
  };

  const shouldShowDate = (index: number, messages: MessageItemT[]) => {
    const dateFiltering =
      index === 0 || formatDate(messages[index].time) !== formatDate(messages[index - 1].time);
    return dateFiltering;
  };

  const [hovered, setHovered] = React.useState<string | null>(null);
  const [lockedHovered, setLockedHovered] = React.useState<string | null>(null);
  const menuRefs = React.useRef<{ [key: string]: HTMLDivElement | null }>({});

  React.useEffect(() => {
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
            <div className="bg-gray-10 mr-2 h-12 w-12 rounded-full" />
            <div className="flex-1">
              <div className="flex items-center">
                <div className="bg-gray-10 mr-2 h-6 w-36 rounded-lg" />
                <div className="text-s-base bg-gray-10 h-5 w-24 rounded-lg" />
              </div>
              <div className="bg-gray-10 mt-1 h-6 w-full rounded-lg" />
            </div>
          </div>
        )}
        {mocksMessages.length === 0 ? (
          <div className="flex min-h-screen items-center justify-center">
            <span className="text-gray-60">Тут пока пусто</span>
          </div>
        ) : (
          mocksMessages.map(
            (item: MessageItemT, index: number) =>
              item !== null && (
                <div key={item.id}>
                  {shouldShowDate(index, mocksMessages) && (
                    <div className="flex w-full justify-center p-2">
                      <span className="bg-gray-5 text-gray-70 rounded-lg px-2 py-1">
                        {formatDate(item.time)}
                      </span>
                    </div>
                  )}

                  <div
                    className={`group relative rounded-md ${hovered === item.id || lockedHovered === item.id ? 'bg-gray-5' : 'hover:bg-gray-5'} `}
                    onMouseEnter={() => setHovered(item.id)}
                    onMouseLeave={() => {
                      if (lockedHovered !== item.id) {
                        setHovered(null);
                      }
                    }}
                  >
                    <div className="flex w-full p-2 transition-colors">
                      <Avatar size="l" className="mr-2">
                        <AvatarImage
                          src="https://auth.xieffect.ru/api/users/3/avatar.webp"
                          imageProps={{
                            src: 'https://auth.xieffect.ru/api/users/3/avatar.webp',
                            alt: 'User Avatar',
                          }}
                          alt="User Avatar"
                        />
                        <AvatarFallback size="l">{item.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center">
                          <span className="mr-2 font-semibold">{item.name}</span>
                          <span className="text-s-base text-gray-40 font-normal">{item.time}</span>
                        </div>
                        <p className="relative mt-1 w-[600] text-gray-100">{item.message}</p>
                      </div>
                    </div>

                    <div
                      ref={(el: HTMLDivElement | null) => {
                        menuRefs.current[item.id] = el;
                      }}
                      className={`pointer-events-none absolute right-1 top-2 ${hovered === item.id ? 'pointer-events-auto group-hover:opacity-100' : 'opacity-0'}`}
                    >
                      <div className="border-gray-10 bg-gray-0 relative flex items-center justify-center gap-1 rounded border p-1">
                        <Button
                          variant="ghost"
                          type="button"
                          className="m-0 h-6 w-6 rounded p-1"
                          onClick={() => setHovered(item.id)}
                        >
                          <Emotions />
                        </Button>
                        <Button
                          variant="ghost"
                          type="button"
                          className="m-0 h-6 w-6 rounded p-1"
                          onClick={() => setHovered(item.id)}
                        >
                          <Share />
                        </Button>
                        <Button
                          variant="ghost"
                          type="button"
                          className="m-0 h-6 w-6 rounded p-1"
                          onClick={() => setHovered(item.id)}
                        >
                          <Edit />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger className="cursor-pointer" asChild>
                            <Button
                              variant="ghost"
                              type="button"
                              className={`m-0 h-6 w-6 rounded p-1 ${
                                lockedHovered === item.id ? 'bg-gray-10' : 'hover:bg-gray-10'
                              }`}
                              onClick={() => {
                                if (lockedHovered === item.id) {
                                  setLockedHovered(null);
                                  setHovered(null);
                                } else {
                                  setLockedHovered(item.id);
                                  setHovered(item.id);
                                }
                              }}
                            >
                              <MenuDots />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="mt-1">
                            <DropdownMenuItem className="hover:bg-gray-5 active:bg-gray-5 focus:bg-gray-5">
                              <Pin className="mr-2 h-4 w-4" />
                              <span className="text-xs">Закрепить сообщение</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="hover:bg-gray-5 active:bg-gray-5 focus:bg-gray-5">
                              <Link className="mr-2 h-4 w-4" />
                              <span className="text-xs">Видео</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="hover:bg-gray-5 active:bg-gray-5 focus:bg-gray-5">
                              <Trash className="fill-red-60 mr-2 h-4 w-4" />
                              <span className="text-red-60 text-xs">Удалить</span>
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

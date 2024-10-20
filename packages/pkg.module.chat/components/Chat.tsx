import React from 'react';
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

const mocksMessages = [
  {
    name: 'Анна Иванова',
    time: '21.03.2024 15:25',
    message: 'Привет, ребята! Сегодня занятий не будет, я заболела.',
  },
  {
    name: 'Денис Спиридонов',
    time: '21.03.2024 15:58',
    message: 'Ой, как жаль! Выздоравливайте скорее!',
  },
  {
    name: 'Анна Иванова',
    time: '21.03.2024 15:25',
    message: 'Привет, ребята! Сегодня занятий не будет, я заболела.',
  },
  {
    name: 'Денис Спиридонов',
    time: '21.03.2024 15:58',
    message: 'Ой, как жаль! Выздоравливайте скорее!',
  },
  {
    name: 'Анна Иванова',
    time: '21.03.2024 15:25',
    message: 'Привет, ребята! Сегодня занятий не будет, я заболела.',
  },
  {
    name: 'Денис Спиридонов',
    time: '21.03.2024 15:58',
    message: 'Ой, как жаль! Выздоравливайте скорее!',
  },
  {
    name: 'Анна Иванова',
    time: '21.03.2024 15:25',
    message: 'Привет, ребята! Сегодня занятий не будет, я заболела.',
  },
  {
    name: 'Денис Спиридонов',
    time: '21.03.2024 15:58',
    message: 'Ой, как жаль! Выздоравливайте скорее!',
  },
  {
    name: 'Анна Иванова',
    time: '21.03.2024 15:25',
    message: 'Привет, ребята! Сегодня занятий не будет, я заболела.',
  },
  {
    name: 'Денис Спиридонов',
    time: '21.03.2024 15:58',
    message: 'Ой, как жаль! Выздоравливайте скорее!',
  },
  {
    name: 'Анна Иванова',
    time: '21.03.2024 15:25',
    message: 'Привет, ребята! Сегодня занятий не будет, я заболела.',
  },
  {
    name: 'Денис Спиридонов',
    time: '21.03.2024 15:58',
    message: 'Ой, как жаль! Выздоравливайте скорее!',
  },
  {
    name: 'Анна Иванова',
    time: '21.03.2024 15:25',
    message: 'Привет, ребята! Сегодня занятий не будет, я заболела.',
  },
  {
    name: 'Денис Спиридонов',
    time: '21.03.2024 15:58',
    message: 'Ой, как жаль! Выздоравливайте скорее!',
  },
  {
    name: 'Анна Иванова',
    time: '21.03.2024 15:25',
    message: 'Привет, ребята! Сегодня занятий не будет, я заболела.',
  },
  {
    name: 'Денис Спиридонов',
    time: '21.03.2024 15:58',
    message: 'Ой, как жаль! Выздоравливайте скорее!',
  },
  {
    name: 'Анна Иванова',
    time: '21.03.2024 15:25',
    message: 'Привет, ребята! Сегодня занятий не будет, я заболела.',
  },
  {
    name: 'Денис Спиридонов',
    time: '21.03.2024 15:58',
    message: 'Ой, как жаль! Выздоравливайте скорее!',
  },
  {
    name: 'Анна Иванова',
    time: '21.03.2024 15:25',
    message: 'Привет, ребята! Сегодня занятий не будет, я заболела.',
  },
  {
    name: 'Денис Спиридонов',
    time: '21.03.2024 15:58',
    message: 'Ой, как жаль! Выздоравливайте скорее!',
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

    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
    });
  };

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
            (item, index) =>
              item != null && (
                <div key={index} className="">
                  <div className="flex w-full justify-center p-2">
                    <span className="rounded-lg bg-[#F7F7F7] px-2 py-1 text-[#585858]">
                      {formatDate(item.time)}
                    </span>
                  </div>
                  <div className="group relative">
                    <div className="flex w-full p-2 transition-colors hover:bg-[#F7F7F7]">
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

                    <div className="pointer-events-none absolute right-1 top-5 opacity-0 group-hover:pointer-events-auto group-hover:opacity-100">
                      <div className="relative flex">
                        <Button
                          variant="ghost"
                          type="button"
                          className="m-0 h-6 w-6 p-0"
                          onClick={() => console.log('Emotions')}
                        >
                          <Emotions />
                        </Button>
                        <Button
                          variant="ghost"
                          type="button"
                          className="m-0 h-6 w-6 p-0"
                          onClick={() => console.log('Share')}
                        >
                          <Share />
                        </Button>
                        <Button
                          variant="ghost"
                          type="button"
                          className="m-0 h-6 w-6 p-0"
                          onClick={() => console.log('Edit')}
                        >
                          <Edit />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger className="cursor-pointer" asChild>
                            <Button
                              variant="ghost"
                              type="button"
                              className="m-0 h-6 w-6 p-0"
                              onClick={() => console.log('pinned')}
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

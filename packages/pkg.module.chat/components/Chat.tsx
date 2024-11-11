import React from 'react';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import { ZeroMessage } from './ZeroMessage';
import { useLoadItems } from '../utils';
import { ChatMessage } from './ChatMessage';
import { SkeletMessage } from './SkeletMessage';

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
        {hasNextPage && <SkeletMessage refProp={infiniteRef} />}
        {mocksMessages.length === 0 ? (
          <ZeroMessage />
        ) : (
          mocksMessages.map(
            (item: MessageItemT, index: number) =>
              item !== null && (
                <ChatMessage item={item} index={index} mocksMessages={mocksMessages} />
              ),
          )
        )}
      </ul>
    </div>
  );
};

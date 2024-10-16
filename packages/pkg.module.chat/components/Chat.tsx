import React from 'react';
import useInfiniteScroll from 'react-infinite-scroll-hook';
// import ChatMessage from './ChatMessage';
import { useLoadItems } from '../utils';

// type Message = {
//   name: string;
//   time: string;
//   message: string;
// };

// const mocksMessages = [
//   {
//     name: 'Анна Иванова',
//     time: '21.03.2024 15:25',
//     message: 'Привет, ребята! Сегодня занятий не будет, я заболела.',
//   },
//   {
//     name: 'Денис Спиридонов',
//     time: '21.03.2024 15:58',
//     message: 'Ой, как жаль! Выздоравливайте скорее!',
//   },
//   {
//     name: 'Анна Иванова',
//     time: '21.03.2024 15:25',
//     message: 'Привет, ребята! Сегодня занятий не будет, я заболела.',
//   },
//   {
//     name: 'Денис Спиридонов',
//     time: '21.03.2024 15:58',
//     message: 'Ой, как жаль! Выздоравливайте скорее!',
//   },
//   {
//     name: 'Анна Иванова',
//     time: '21.03.2024 15:25',
//     message: 'Привет, ребята! Сегодня занятий не будет, я заболела.',
//   },
//   {
//     name: 'Денис Спиридонов',
//     time: '21.03.2024 15:58',
//     message: 'Ой, как жаль! Выздоравливайте скорее!',
//   },
//   {
//     name: 'Анна Иванова',
//     time: '21.03.2024 15:25',
//     message: 'Привет, ребята! Сегодня занятий не будет, я заболела.',
//   },
//   {
//     name: 'Денис Спиридонов',
//     time: '21.03.2024 15:58',
//     message: 'Ой, как жаль! Выздоравливайте скорее!',
//   },
//   {
//     name: 'Анна Иванова',
//     time: '21.03.2024 15:25',
//     message: 'Привет, ребята! Сегодня занятий не будет, я заболела.',
//   },
//   {
//     name: 'Денис Спиридонов',
//     time: '21.03.2024 15:58',
//     message: 'Ой, как жаль! Выздоравливайте скорее!',
//   },
//   {
//     name: 'Анна Иванова',
//     time: '21.03.2024 15:25',
//     message: 'Привет, ребята! Сегодня занятий не будет, я заболела.',
//   },
//   {
//     name: 'Денис Спиридонов',
//     time: '21.03.2024 15:58',
//     message: 'Ой, как жаль! Выздоравливайте скорее!',
//   },
//   {
//     name: 'Анна Иванова',
//     time: '21.03.2024 15:25',
//     message: 'Привет, ребята! Сегодня занятий не будет, я заболела.',
//   },
//   {
//     name: 'Денис Спиридонов',
//     time: '21.03.2024 15:58',
//     message: 'Ой, как жаль! Выздоравливайте скорее!',
//   },
//   {
//     name: 'Анна Иванова',
//     time: '21.03.2024 15:25',
//     message: 'Привет, ребята! Сегодня занятий не будет, я заболела.',
//   },
//   {
//     name: 'Денис Спиридонов',
//     time: '21.03.2024 15:58',
//     message: 'Ой, как жаль! Выздоравливайте скорее!',
//   },
//   {
//     name: 'Анна Иванова',
//     time: '21.03.2024 15:25',
//     message: 'Привет, ребята! Сегодня занятий не будет, я заболела.',
//   },
//   {
//     name: 'Денис Спиридонов',
//     time: '21.03.2024 15:58',
//     message: 'Ой, как жаль! Выздоравливайте скорее!',
//   },
//   {
//     name: 'Анна Иванова',
//     time: '21.03.2024 15:25',
//     message: 'Привет, ребята! Сегодня занятий не будет, я заболела.',
//   },
//   {
//     name: 'Денис Спиридонов',
//     time: '21.03.2024 15:58',
//     message: 'Ой, как жаль! Выздоравливайте скорее!',
//   },
// ];

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

  return (
    <div
      ref={rootRefSetter}
      onScroll={handleRootScroll}
      className="h-[calc(100vh-144px)] overflow-y-auto p-4"
    >
      <ul className="block p-2">
        {hasNextPage && (
          <li className="m-1 border bg-slate-200 p-2" ref={infiniteRef}>
            Loading
          </li>
        )}
        {reversedItems.map((item) => (
          <li className="m-1 border bg-slate-200 p-2" key={item.key}>
            {item.value}
          </li>
        ))}
      </ul>
    </div>
  );
};

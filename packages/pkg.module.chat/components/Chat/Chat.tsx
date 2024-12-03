import React from 'react';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import { useMainSt } from 'pkg.stores';
import { ChatMessage } from './ChatMessage';
import { SkeletMessages } from '../Skelets';
import { useChatStore } from '../../stores/chatStore';
import { MessageSnakeCaseT, MessageT } from '../../models/Message';

export const Chat = () => {
  const socket = useMainSt((state) => state.socket);
  const messages = useChatStore((state) => state.messages);
  // const setMessages = useChatStore((state) => state.setMessages);
  const chatId = useChatStore((state) => state.chatId);

  const [hasNextPage] = React.useState(true);
  const [loading] = React.useState(false);

  const reversedItems = React.useMemo(() => [...(messages ?? [])].reverse(), [messages]);

  const loadMore = () => {
    if (!socket) {
      console.error('Socket is not defined');
      return;
    }

    socket.emit(
      'list-chat-messages',
      {
        chat_id: chatId,
        created_before: reversedItems[0].createdAt,
        limit: 20,
      },
      (
        status: number,
        { latest_messages: latestMessages }: { latest_messages: MessageSnakeCaseT[] },
      ) => {
        console.log('status', status);
        console.log('latestMessages', latestMessages);
      },
    );

    console.log('loadMore');
  };

  const [infiniteRef, { rootRef }] = useInfiniteScroll({
    loading,
    hasNextPage,
    onLoadMore: loadMore,
    rootMargin: '600px 0px 0px 0px',
  });

  const scrollableRootRef = React.useRef<React.ElementRef<'div'> | null>(null);
  const lastScrollDistanceToBottomRef = React.useRef<number>();

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

  if (messages === null) return null;

  return (
    <div
      ref={rootRefSetter}
      onScroll={handleRootScroll}
      className="flex h-[calc(100%-128px)] w-full flex-1 flex-col justify-items-end overflow-y-auto p-2"
    >
      {hasNextPage && (
        <div className="flex grow flex-col justify-end" ref={infiniteRef}>
          <SkeletMessages withoutLayout length={7} />
        </div>
      )}
      {reversedItems.map(
        (item: MessageT, index: number) =>
          item !== null && (
            <ChatMessage
              item={item}
              key={item.id}
              prevItemCreatedAt={index !== 0 ? reversedItems[index - 1].createdAt : null}
            />
          ),
      )}
    </div>
  );
};

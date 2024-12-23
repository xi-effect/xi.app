import React from 'react';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import { useMainSt } from 'pkg.stores';
import { convertSnakeToCamelCase } from '@xipkg/utils';
import { ChatMessage } from './ChatMessage';
import { SkeletMessages } from '../Skelets';
import { useChatStore } from '../../stores/chatStore';
import { MessageSnakeCaseT, MessageT } from '../../models/Message';

export const Chat = () => {
  const socket = useMainSt((state) => state.socket);
  const messages = useChatStore((state) => state.messages);
  const setMessages = useChatStore((state) => state.setMessages);
  const chatId = useChatStore((state) => state.chatId);
  const hasNextPage = useChatStore((state) => state.hasNextPage);
  const setHasNextPage = useChatStore((state) => state.setHasNextPage);

  const [loading] = React.useState(false);

  const loadMore = () => {
    if (!socket) {
      console.error('Socket is not defined');
      return;
    }

    if (!hasNextPage) {
      return;
    }

    if (messages === null) return;

    socket.emit(
      'list-chat-messages',
      {
        chat_id: chatId,
        created_before: messages[0].createdAt,
        limit: 15,
      },
      (status: number, latestMessages: MessageSnakeCaseT[]) => {
        const newMessage = latestMessages
          .map((message) => convertSnakeToCamelCase(message) as MessageT)
          .reverse();
        setMessages([...newMessage, ...(messages ?? [])]);

        if (newMessage.length < 15) {
          console.log('setHasNextPage false');
          setHasNextPage(false);
        }
      },
    );
  };

  const [infiniteRef, { rootRef }] = useInfiniteScroll({
    loading,
    hasNextPage,
    onLoadMore: loadMore,
    rootMargin: '200px 0px 0px 0px',
  });

  const scrollableRootRef = React.useRef<React.ElementRef<'div'> | null>(null);
  const lastScrollDistanceToBottomRef = React.useRef<number>(null);

  // We keep the scroll position when new items are added etc.
  React.useLayoutEffect(() => {
    const scrollableRoot = scrollableRootRef.current;
    const lastScrollDistanceToBottom = lastScrollDistanceToBottomRef.current ?? 0;
    if (scrollableRoot) {
      scrollableRoot.scrollTop = scrollableRoot.scrollHeight - lastScrollDistanceToBottom;
    }
  }, [messages, rootRef]);

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
      className="flex h-[calc(100%-128px)] w-full flex-1 flex-col justify-items-end overflow-y-auto p-2"
    >
      {hasNextPage && (
        <div className="flex grow flex-col justify-end" ref={infiniteRef}>
          <SkeletMessages withoutLayout length={7} />
        </div>
      )}
      {messages &&
        messages.map(
          (item: MessageT, index: number) =>
            item !== null && (
              <ChatMessage
                item={item}
                key={item.id}
                prevItemCreatedAt={index !== 0 ? messages[index - 1].createdAt : null}
                nextId={index !== 0 ? messages[index - 1].senderUserId : null}
              />
            ),
        )}
    </div>
  );
};

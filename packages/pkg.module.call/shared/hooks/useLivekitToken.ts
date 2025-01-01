import useSWRSubscription from 'swr/subscription';
import { useMainSt } from 'pkg.stores';

const subscribeToToken = (
  key: [string, string],
  { next }: { next: (error?: Error | null, data?: string | null) => void },
) => {
  const { socket } = useMainSt.getState();

  if (!socket) {
    next(new Error('Socket is not available'));
    return () => {};
  }

  // Логика подписки на обновления токена
  const handleToken = (status: number, data: string) => {
    console.log('data', status, data);

    if (status === 200) {
      next(null, data);
    }
  };

  // Запрос на получение токена
  socket.emit(
    'generate-livekit-token',
    {
      community_id: key[0],
      channel_id: key[1],
    },
    handleToken,
  );

  // Очистка при анмаунте
  return () => {
    socket.off('generate-livekit-token', handleToken);
  };
};

export const useLivekitToken = (communityId: string, channelId: string) => {
  const { data: token, error } = useSWRSubscription([communityId, channelId], subscribeToToken);

  return { token, error };
};

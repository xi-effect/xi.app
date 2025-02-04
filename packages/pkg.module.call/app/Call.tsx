import { Room } from 'livekit-client';
import { useParams } from 'next/navigation';
import { ActiveRoom } from '../widgets/Room/ActiveRoom';
import { PreJoin } from '../widgets/PreJoin';
import { CallProvider } from './provider';
import { useLivekitToken } from '../shared/hooks';
import { useCallStore } from '../stores';

export const Call = () => {
  const room = new Room();

  const isStarted = useCallStore((state) => state.isStarted);

  const params = useParams<{ 'community-id': string; 'channel-id': string }>();
  const { token } = useLivekitToken(params['community-id'], params['channel-id']);

  return (
    <CallProvider>
      <div>
        {isStarted && token ? (
          <div id="videoConferenceContainer" className="bg-gray-5" data-theme="dark">
            <ActiveRoom room={room} token={token} />
          </div>
        ) : (
          <PreJoin />
        )}
      </div>
    </CallProvider>
  );
};

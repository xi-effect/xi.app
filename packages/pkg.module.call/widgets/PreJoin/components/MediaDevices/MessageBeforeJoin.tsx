import { Microphone } from '@xipkg/icons';
import React from 'react';

type MessageBeforeJoinPropsT = {
  typeOfMessage: 'notStarted' | 'needPermission';
};

export const MessageBeforeJoin = ({ typeOfMessage }: MessageBeforeJoinPropsT) => (
  <div>
    {/* {typeOfMessage === 'notStarted' && (
      <div className="bg-gray-5 mb-4 rounded-md p-4 font-sans">
        <h2 className="text-[20px] font-medium">Конференция не началась</h2>
        <p>Дождитесь организатора</p>
      </div>
    )} */}
    {typeOfMessage === 'needPermission' && (
      <div className="bg-orange-0 mb-4 rounded-md p-4 font-sans">
        <div className="flex items-center gap-5">
          <div className="bg-orange-80 fill-gray-0 rounded-full p-2">
            <Microphone className="fill-gray-0" width={16} />
          </div>
          <div>
            <h2 className="text-[20px] font-medium">Нажмите «Разрешить»</h2>
            <p>В любой момент времени камеру и микрофон можно отключить</p>
          </div>
        </div>
      </div>
    )}
  </div>
);

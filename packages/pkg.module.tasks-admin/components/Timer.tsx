import { Clock } from '@xipkg/icons';
import { useEffect, useState } from 'react';

function formatTime(seconds: number) {
  // Вычисляем минуты и секунды из общего количества секунд
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  // Добавляем ведущий ноль, если минуты или секунды меньше 10
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;

  // Возвращаем отформатированное время
  return `${formattedMinutes}:${formattedSeconds}`;
}

type TimerPropsT = {
  durationSecs: number;
  getTitle: (currentDuration: string) => string;
  onTimerEnd: () => void;
};

const Timer = ({ getTitle, onTimerEnd, durationSecs }: TimerPropsT) => {
  const [leftSecs, setSecs] = useState(durationSecs);

  useEffect(() => {
    const t = setInterval(() => {
      if (leftSecs > 0) {
        setSecs((p) => p - 1);
      } else {
        clearInterval(t);
        onTimerEnd();
      }
    }, 1000);
    return () => clearInterval(t);
  });

  return (
    <div className="bg-red-0 flex w-[508px] flex-auto items-center gap-2 rounded-lg p-4 text-red-100 lg:ml-8">
      <Clock className="fill-red-100" />
      <p className="text-xs-base font-normal">{getTitle(formatTime(leftSecs))}</p>
    </div>
  );
};

export default Timer;

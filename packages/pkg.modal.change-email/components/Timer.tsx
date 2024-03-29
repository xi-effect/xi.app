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

interface TimerProps {
  durationSecs: number;
  getTitle: (currentDuration: string) => string;
  onTimerEnd: () => void;
}

const Timer = ({ getTitle, onTimerEnd, durationSecs }: TimerProps) => {
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
    <div className="bg-red-0 flex items-center gap-4 rounded-lg p-4 text-red-100">
      <Clock className="fill-red-100" />
      <p className="font-semibold">{getTitle(formatTime(leftSecs))}</p>
    </div>
  );
};

export default Timer;

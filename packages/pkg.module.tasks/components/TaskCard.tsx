import React from 'react';
import { isTomorrow, isToday, differenceInHours, startOfDay } from 'date-fns';
import { Clock } from '@xipkg/icons';

export enum StatusEnum {
  APPOINTED = 'appointed',
  OVERDUE = 'overdue',
  CHECKING = 'checking',
  ASSESSED = 'assessed',
}

export enum GradeEnum {
  A = 5,
  B = 4,
  C = 3,
  D = 2,
  E = 1,
}

type TaskCardProps = {
  name: string;
  creationDate: Date;
  closingDate: Date;
  author: string;
  status: StatusEnum;
  grade?: number;
};

export default function TaskCard({
  name,
  creationDate,
  closingDate,
  author,
  status,
  grade,
}: TaskCardProps) {
  return (
    <div className="border-1 border-gray-30 hover:bg-gray-5 flex grow overflow-hidden rounded-lg border hover:cursor-pointer">
      {status !== StatusEnum.ASSESSED && status !== StatusEnum.CHECKING && (
        <>
          {isToday(closingDate) && (
            <div className="text-red-80 bg-red-0 flex w-[100px] flex-col items-center justify-center">
              <div>Сегодня</div>
              <div className="text-xl font-medium">
                {closingDate.toLocaleTimeString('ru-RU', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </div>
            </div>
          )}
          {isTomorrow(closingDate) && (
            <div className="text-orange-80 bg-orange-0 flex w-[100px] flex-col items-center justify-center">
              <div>Завтра</div>
              <div className="text-xl font-medium">
                {closingDate.toLocaleTimeString('ru-RU', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </div>
            </div>
          )}
          {(differenceInHours(closingDate, startOfDay(new Date())) >= 48 ||
            status === StatusEnum.OVERDUE) && (
            <div className="flex w-[100px] flex-col items-center justify-center gap-[2px]">
              <div className="text-gray-80 text-xs/[10px]">До</div>
              <div
                className={`flex flex-col items-center ${status === StatusEnum.OVERDUE && 'text-red-80'}`}
              >
                <div className="text-xl font-medium">
                  {closingDate.toLocaleTimeString('ru-RU', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
                <div className="text-sm font-medium">
                  {closingDate.toLocaleDateString('ru-RU', {
                    day: '2-digit',
                    month: '2-digit',
                  })}
                </div>
              </div>
            </div>
          )}
        </>
      )}
      {status === StatusEnum.ASSESSED && (
        <div className="flex w-[100px] flex-col items-center justify-center">
          <div
            className={`text-4xl font-semibold
              ${grade === GradeEnum.A && 'text-green-80'}
              ${grade === GradeEnum.B && 'text-yellow-60'}
              ${grade === GradeEnum.C && 'text-orange-80'}
              ${grade === GradeEnum.D && 'text-red-80'}
              ${grade === GradeEnum.E && 'text-red-80'}
            `}
          >
            {grade}
          </div>
        </div>
      )}
      {status === StatusEnum.CHECKING && (
        <div className="flex w-[100px] flex-col items-center justify-center">
          <Clock className="fill-brand-80 h-[40px] w-[40px]" />
        </div>
      )}
      <div className="flex flex-col gap-2 p-4">
        <div className="flex flex-col items-start gap-2">
          <div
            className={`flex-grow-1 rounded px-2 py-1 text-xs font-medium 
            ${status === StatusEnum.APPOINTED && 'bg-orange-0 text-orange-80'}
            ${status === StatusEnum.OVERDUE && 'bg-red-0 text-red-80 '}
            ${status === StatusEnum.CHECKING && 'bg-brand-0 text-brand-80'}
            ${status === StatusEnum.ASSESSED && 'bg-green-0 text-green-80'}
            `}
          >
            {status === StatusEnum.APPOINTED && 'Назначено'}
            {status === StatusEnum.OVERDUE && 'Просрочено'}
            {status === StatusEnum.CHECKING && 'На проверке'}
            {status === StatusEnum.ASSESSED && 'Оценено'}
          </div>
          <div className="text-xl font-semibold">{name}</div>
        </div>
        <div className="flex-cl flex flex-col items-start gap-2">
          <div className="flex">
            <div className="text-gray-80 text-xs">Создано: &nbsp; </div>
            <div className="text-xs">
              {creationDate.toLocaleDateString('ru-RU', { month: 'long', day: 'numeric' })}
            </div>
          </div>
          <div className="flex">
            <div className="text-gray-80 text-xs">Автор: &nbsp; </div>
            <div className="text-xs">{author}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

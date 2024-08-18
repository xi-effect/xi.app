import React from 'react';
import { isTomorrow, isToday, differenceInHours, startOfDay } from 'date-fns';
import { Clock } from '@xipkg/icons';
import { statuses } from '../../consts';
import { StatusT, GradeT } from '../../types';

const gradeTextStyle: { [key in GradeT]: string } = {
  5: 'text-green-80',
  4: 'text-yellow-60',
  3: 'text-orange-80',
  2: 'text-red-80',
  1: 'text-red-80',
};

const statusText: { [key in StatusT]: string } = {
  appointed: 'Назначено',
  overdue: 'Просрочено',
  checking: 'На проверке',
  assessed: 'Оценено',
};

const statusTextStyle: { [key in StatusT]: string } = {
  appointed: 'bg-orange-0 text-orange-80',
  overdue: 'bg-red-0 text-red-80',
  checking: 'bg-brand-0 text-brand-80',
  assessed: 'bg-green-0 text-green-80',
};

type TaskCardPropsT = {
  name: string;
  creationDate: Date;
  closingDate: Date;
  author: string;
  status: StatusT;
  grade?: GradeT;
};

const TaskCard = ({ name, creationDate, closingDate, author, status, grade }: TaskCardPropsT) => (
  <div className="border-gray-30 hover:bg-gray-5 flex grow overflow-hidden rounded-lg border hover:cursor-pointer">
    {status !== statuses.ASSESSED && status !== statuses.CHECKING && (
      <>
        {isToday(closingDate) && (
          <div className="text-red-80 bg-red-0 flex w-[100px] flex-col items-center justify-center">
            <span>Сегодня</span>
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
            <span>Завтра</span>
            <div className="text-xl font-medium">
              {closingDate.toLocaleTimeString('ru-RU', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </div>
          </div>
        )}
        {(differenceInHours(closingDate, startOfDay(new Date())) >= 48 ||
          status === statuses.OVERDUE) && (
          <div className="flex w-[100px] flex-col items-center justify-center gap-0.5">
            <div className="text-gray-80 text-xs/[10px]">До</div>
            <div
              className={`flex flex-col items-center ${status === statuses.OVERDUE && 'text-red-80'}`}
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
    {status === statuses.ASSESSED && (
      <div className="flex w-[100px] flex-col items-center justify-center">
        <span className={`text-4xl font-semibold ${grade && gradeTextStyle[grade]} `}>{grade}</span>
      </div>
    )}
    {status === statuses.CHECKING && (
      <div className="flex w-[100px] flex-col items-center justify-center">
        <Clock className="fill-brand-80 h-[40px] w-[40px]" />
      </div>
    )}
    <div className="flex flex-col gap-2 p-4">
      <div className="flex flex-col items-start gap-2">
        <span
          className={`flex-grow-1 rounded px-2 py-1 text-xs font-medium ${statusTextStyle[status]} `}
        >
          {statusText[status]}
        </span>
        <span className="text-xl font-semibold">{name}</span>
      </div>
      <div className="flex-cl flex flex-col items-start gap-2">
        <div className="flex">
          <span className="text-gray-80 text-xs">Создано: &nbsp; </span>
          <span className="text-xs">
            {creationDate.toLocaleDateString('ru-RU', { month: 'long', day: 'numeric' })}
          </span>
        </div>
        <div className="flex">
          <span className="text-gray-80 text-xs">Автор: &nbsp; </span>
          <span className="text-xs">{author}</span>
        </div>
      </div>
    </div>
  </div>
);

export default TaskCard;

import { useState } from 'react';
import { endOfTomorrow, endOfToday } from 'date-fns';
import Header from './components/Header';
import TaskCard from './components/TaskCard';
import { grades, statuses, selectStatuses } from './consts';
import { SelectStatusT, TaskT } from './types';

const tasksMock: TaskT[] = [
  {
    id: 1,
    name: 'Расчёт цикла ПХМ',
    creationDate: new Date('December 17, 1995 03:24:00'),
    closingDate: new Date('December 18, 1995 03:24:00'),
    author: 'Констанин Константинопольский',
    status: statuses.OVERDUE,
  },
  {
    id: 2,
    name: 'Задание на сегодня',
    creationDate: new Date(),
    closingDate: endOfToday(),
    author: 'Констанин Константинопольский',
    status: statuses.APPOINTED,
  },
  {
    id: 3,
    name: 'Задание на завтра',
    creationDate: new Date(),
    closingDate: endOfTomorrow(),
    author: 'Констанин Константинопольский',
    status: statuses.APPOINTED,
  },
  {
    id: 4,
    name: 'Задание на послезавтра',
    creationDate: new Date(),
    closingDate: new Date(endOfTomorrow().getTime() + 1),
    author: 'Констанин Константинопольский',
    status: statuses.APPOINTED,
  },
  {
    id: 5,
    name: 'Задание на проверке',
    creationDate: new Date(),
    closingDate: new Date(new Date().getTime() + 2.016e8),
    author: 'Констанин Константинопольский',
    status: statuses.CHECKING,
  },
  {
    id: 6,
    name: 'Задание принято',
    creationDate: new Date(),
    closingDate: new Date(new Date().getTime() + 2.016e8),
    author: 'Констанин Константинопольский',
    status: statuses.ASSESSED,
    grade: grades.A,
  },
  {
    id: 7,
    name: 'Задание принято',
    creationDate: new Date(),
    closingDate: new Date(new Date().getTime() + 2.016e8),
    author: 'Констанин Константинопольский',
    status: statuses.ASSESSED,
    grade: grades.E,
  },
];

export const Tasks = () => {
  const [filteredTasks, setFilteredTasks] = useState(tasksMock);
  const [selectStatus, setSelectStatus] = useState<SelectStatusT>(selectStatuses.ALL);

  const handleSelect = (status: SelectStatusT) => {
      setSelectStatus(status);
      if (status === selectStatuses.ALL) {
        setFilteredTasks(tasksMock);
      } else {
        setFilteredTasks(tasksMock.filter((task) => task.status === status));
      }
    };

  return (
    <>
      <Header onSelect={handleSelect} selectValue={selectStatus} />
      <div className="grid gap-4 [@media(min-width:1250px)]:grid-cols-2 [@media(min-width:1680px)]:grid-cols-3">
        {filteredTasks.map((task) => (
          <TaskCard
            name={task.name}
            creationDate={task.creationDate}
            closingDate={task.closingDate}
            author={task.author}
            status={task.status}
            grade={task.grade}
            key={task.id}
          />
        ))}
      </div>
    </>
  );
};

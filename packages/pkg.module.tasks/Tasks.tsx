import { useCallback, useState } from 'react';
import { endOfTomorrow, endOfToday } from 'date-fns';
import Header, { SelectEnum } from './components/Header';
import TaskCard, { StatusEnum, GradeEnum } from './components/TaskCard';

export function Tasks() {
  // Temporary tasks list
  const tasksMock = [
    {
      id: 1,
      name: 'Расчёт цикла ПХМ',
      creationDate: new Date('December 17, 1995 03:24:00'),
      closingDate: new Date('December 18, 1995 03:24:00'),
      author: 'Констанин Константинопольский',
      status: StatusEnum.OVERDUE,
    },
    {
      id: 2,
      name: 'Задание на сегодня',
      creationDate: new Date(),
      closingDate: endOfToday(),
      author: 'Констанин Константинопольский',
      status: StatusEnum.APPOINTED,
    },
    {
      id: 3,
      name: 'Задание на завтра',
      creationDate: new Date(),
      closingDate: endOfTomorrow(),
      author: 'Констанин Константинопольский',
      status: StatusEnum.APPOINTED,
    },
    {
      id: 4,
      name: 'Задание на послезавтра',
      creationDate: new Date(),
      closingDate: new Date(endOfTomorrow().getTime() + 1),
      author: 'Констанин Константинопольский',
      status: StatusEnum.APPOINTED,
    },
    {
      id: 5,
      name: 'Задание на проверке',
      creationDate: new Date(),
      closingDate: new Date(new Date().getTime() + 2.016e8),
      author: 'Констанин Константинопольский',
      status: StatusEnum.CHECKING,
    },
    {
      id: 6,
      name: 'Задание принято',
      creationDate: new Date(),
      closingDate: new Date(new Date().getTime() + 2.016e8),
      author: 'Констанин Константинопольский',
      status: StatusEnum.ASSESSED,
      grade: GradeEnum.A,
    },
    {
      id: 7,
      name: 'Задание принято',
      creationDate: new Date(),
      closingDate: new Date(new Date().getTime() + 2.016e8),
      author: 'Констанин Константинопольский',
      status: StatusEnum.ASSESSED,
      grade: GradeEnum.E,
    },
  ];

  const [filteredTasks, setFilteredTasks] = useState(tasksMock);
  const [select, setSelect] = useState(SelectEnum.ALL);

  const handleSelect = useCallback(
    (status: SelectEnum) => {
      setSelect(status);
      if (status === SelectEnum.ALL) {
        setFilteredTasks(tasksMock);
      } else {
        // @ts-expect-error
        setFilteredTasks(tasksMock.filter((task) => task.status === status));
      }
    },
    [filteredTasks],
  );

  return (
    <>
      <Header onSelect={handleSelect} selectValue={select} />
      <div className="grid gap-4 px-8 [@media(min-width:1250px)]:grid-cols-2 [@media(min-width:1680px)]:grid-cols-3">
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
}

import { useState } from 'react';
import Header from './components/Header';
import { TaskCard } from './components/TaskCard';
import { DeleteTaskModal } from './components/DeleteTaskModal';
import { EmptyTasksList } from './components/EmptyTasksList';
import { sortValues, SortValuesT, statuses, TaskCardT } from './types';
import { tasksMock } from './mockTasks';

export const TasksAdmin = () => {
  const [filteredTasks, setFilteredTasks] = useState(tasksMock);
  const [selectStatus, setSelectStatus] = useState(statuses.ALL);
  const [sortValue, setSortValue] = useState<SortValuesT>(sortValues.CREATION_DATE);
  const [deleteCandidate, setDeleteCandidate] = useState<number | undefined>();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleSelect = (status: any) => {
    setSelectStatus(status);
    if (status === statuses.ALL) {
      setFilteredTasks(tasksMock);
    } else {
      setFilteredTasks(tasksMock.filter((task) => task.status === status));
    }
  };

  const handleOpenDeleteModal = (id: number) => {
    setDeleteCandidate(id);
    setIsDeleteModalOpen(true);
  };

  function sortTasksByDate(tasks: TaskCardT[], dateKey: keyof TaskCardT): TaskCardT[] {
    return tasks.sort((a, b) => {
      const dateA = new Date(a[dateKey]);
      const dateB = new Date(b[dateKey]);
      return dateB.getTime() - dateA.getTime();
    });
  }

  const handleSortTasks = (a: SortValuesT) => {
    setSortValue(a);
    switch (a) {
      case sortValues.CREATION_DATE:
        setFilteredTasks(sortTasksByDate(tasksMock, a));
        break;
      case sortValues.CLOSING_DATE:
        setFilteredTasks(sortTasksByDate(tasksMock, a));
        break;
      case sortValues.OPENING_DATE:
        setFilteredTasks(sortTasksByDate(tasksMock, a));
        break;
      case sortValues.UNVERIFIED_COUNT:
        console.log(4, a);
        break;
      default:
        setFilteredTasks(sortTasksByDate(tasksMock, a));
        break;
    }
  };

  const handleDeleteTask = (id: number | undefined) => {
    if (!id) {
      return;
    }
    setFilteredTasks(filteredTasks.filter((task) => task.id !== id));
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="flex h-[100dvh] flex-col">
      <Header
        onSelect={handleSelect}
        selectValue={selectStatus}
        onSort={handleSortTasks}
        sortValue={sortValue}
      />
      {}
      <div className="flex h-full flex-col gap-4 overflow-auto px-8 pb-4">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <TaskCard
              name={task.name}
              openingDate={task.openingDate}
              creationDate={task.creationDate}
              closingDate={task.closingDate}
              id={task.id}
              key={task.id}
              type={task.type}
              status={task.status}
              onDelete={handleOpenDeleteModal}
            />
          ))
        ) : (
          <EmptyTasksList />
        )}
      </div>
      <DeleteTaskModal
        isOpen={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        onConfirm={() => handleDeleteTask(deleteCandidate)}
      />
    </div>
  );
};

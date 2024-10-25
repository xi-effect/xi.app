import { useState, useRef } from 'react';

import HeaderCreateTask from './components/HeaderCreateTask';
import { FormBlock } from './components/Form';
import { SimpleAnswer } from './tasks/SimpleAnswer';
import { FooterCreateTask } from './components/FooterCreateTask';
import { Task, TaskType, SimpleAnswerRef, SimpleAnswerData, AllTasksData } from './typesTask';

import { toast } from 'sonner';

export const TasksCreate = () => {
  const [timer, setTimer] = useState(true);
  const [tasks, setTasks] = useState<Task[]>([{ id: 1, type: 'simple' }]);

  const taskRefs = useRef<Record<number, SimpleAnswerRef>>({});

  const addTask = (taskType: TaskType) => {
    const newId = tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;
    setTasks([...tasks, { id: newId, type: taskType }]);
  };

  const moveTaskUp = (index: number) => {
    if (index === 0) return;
    const newTasks = [...tasks];
    [newTasks[index - 1], newTasks[index]] = [newTasks[index], newTasks[index - 1]];
    setTasks(newTasks);
  };

  const moveTaskDown = (index: number) => {
    if (index === tasks.length - 1) return;
    const newTasks = [...tasks];
    [newTasks[index], newTasks[index + 1]] = [newTasks[index + 1], newTasks[index]];
    setTasks(newTasks);
  };

  const moveTaskToStart = (index: number) => {
    if (index === 0) return;
    const newTasks = [...tasks];
    const [task] = newTasks.splice(index, 1);
    newTasks.unshift(task);
    setTasks(newTasks);
  };

  const moveTaskToEnd = (index: number) => {
    if (index === tasks.length - 1) return;
    const newTasks = [...tasks];
    const [task] = newTasks.splice(index, 1);
    newTasks.push(task);
    setTasks(newTasks);
  };

  const deleteTask = (id: number) => {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
    delete taskRefs.current[id];
  };

  // Метод будет передаваться в FormBlock для отправки данных
  // Проверить работу можно в закоментированной кнопке внизу
  const handleSubmitAll = async () => {
    try {
      const results: AllTasksData[] = [];

      for (const task of tasks) {
        const taskRef = taskRefs.current[task.id];
        if (taskRef && taskRef.getData) {
          const data: SimpleAnswerData = await taskRef.getData();
          results.push({ taskId: task.id, ...data });
        }
      }

      toast.success('Задания сохранены');
      console.log('Данные заданий:', results);
    } catch (error) {
      toast.error('Ошибка при отправке заданий.');
      console.error(error);
    }
  };

  return (
    <div className="flex h-full flex-col md:h-[100dvh] lg:p-0">
      <HeaderCreateTask {...{ timer, setTimer }} />

      <div className="flex flex-col justify-between px-4 lg:flex-row lg:px-8">
        <div className="h-full w-full lg:w-[966px] lg:flex-auto">
          {tasks.map((task, index) => (
            <div key={task.id} className="mt-8 first:mt-0">
              {task.type === 'simple' && (
                <SimpleAnswer
                  ref={(el) => {
                    if (el) {
                      taskRefs.current[task.id] = el;
                    } else {
                      delete taskRefs.current[task.id];
                    }
                  }}
                  index={index}
                  moveTaskUp={() => moveTaskUp(index)}
                  moveTaskDown={() => moveTaskDown(index)}
                  moveTaskToStart={() => moveTaskToStart(index)}
                  moveTaskToEnd={() => moveTaskToEnd(index)}
                  deleteTask={() => deleteTask(task.id)}
                  isFirst={index === 0}
                  isLast={index === tasks.length - 1}
                />
              )}

              {/* Прочие варианты заданий
              {task.type === 'long' && <LongAnswer />}
              {task.type === 'choose' && <ChooseAnswer />} 
              */}
            </div>
          ))}

          <FooterCreateTask onAddTask={addTask} />
        </div>
        <div className="mt-8 w-full lg:ml-8 lg:mt-0 lg:w-[508px] lg:flex-auto">
          <FormBlock {...{ timer }} />

          {/* Для теста примера отправки данных из форм */}
          {/* <Button onClick={handleSubmitAll}>Отправить все задания</Button> */}
        </div>
      </div>
    </div>
  );
};

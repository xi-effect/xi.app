import { useState, useRef } from 'react';

import HeaderCreateTask from './components/HeaderCreateTask';
import { FooterCreateTask } from './components/FooterCreateTask';
import { FormBlock } from './components/Form';

import { SimpleAnswer } from './tasks/SimpleAnswer';

import { SimpleAnswerRef } from './typesTask';
import { useTaskSt } from './store/tasksStore';

export const TasksCreate = () => {
  const [timer, setTimer] = useState(true);
  const { tasks, addTask } = useTaskSt();

  const taskRefs = useRef<Record<number, SimpleAnswerRef>>({}); // Для отправки значений форм разом

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
                  taskId={task.id}
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

          {/* Для теста отправки данных c форм */}
          {/* <Button onClick={handleSubmitAll}>Отправить все задания</Button> */}
        </div>
      </div>
    </div>
  );
};

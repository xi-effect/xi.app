// store/useTaskStore.ts
import { create } from 'zustand';
import { Task, TaskType } from '../typesTask';

interface TaskStore {
  tasks: Task[];
  addTask: (taskType: TaskType) => void;
  moveTaskUp: (id: number) => void;
  moveTaskDown: (id: number) => void;
  moveTaskToStart: (id: number) => void;
  moveTaskToEnd: (id: number) => void;
  deleteTask: (id: number) => void;
  setTasks: (tasks: Task[]) => void;
}

export const useTaskSt = create<TaskStore>((set, get) => ({
  tasks: [{ id: 1, type: 'simple' }],

  addTask: (taskType: TaskType) => {
    const { tasks } = get();
    const newId = tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;
    set({ tasks: [...tasks, { id: newId, type: taskType }] });
  },

  moveTaskUp: (id: number) => {
    const { tasks } = get();
    const index = tasks.findIndex((task) => task.id === id);
    if (index > 0) {
      const newTasks = [...tasks];
      [newTasks[index - 1], newTasks[index]] = [newTasks[index], newTasks[index - 1]];
      set({ tasks: newTasks });
    }
  },

  moveTaskDown: (id: number) => {
    const { tasks } = get();
    const index = tasks.findIndex((task) => task.id === id);
    if (index < tasks.length - 1 && index !== -1) {
      const newTasks = [...tasks];
      [newTasks[index], newTasks[index + 1]] = [newTasks[index + 1], newTasks[index]];
      set({ tasks: newTasks });
    }
  },

  moveTaskToStart: (id: number) => {
    const { tasks } = get();
    const index = tasks.findIndex((task) => task.id === id);
    if (index > 0) {
      const newTasks = [...tasks];
      const [task] = newTasks.splice(index, 1);
      newTasks.unshift(task);
      set({ tasks: newTasks });
    }
  },

  moveTaskToEnd: (id: number) => {
    const { tasks } = get();
    const index = tasks.findIndex((task) => task.id === id);
    if (index !== -1 && index < tasks.length - 1) {
      const newTasks = [...tasks];
      const [task] = newTasks.splice(index, 1);
      newTasks.push(task);
      set({ tasks: newTasks });
    }
  },

  deleteTask: (id: number) => {
    const { tasks } = get();
    set({ tasks: tasks.filter((task) => task.id !== id) });
  },

  setTasks: (tasks: Task[]) => set({ tasks }),
}));

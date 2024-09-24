import { StateCreator } from 'zustand';
import { io } from 'socket.io-client';
import { UseFormSetError } from 'react-hook-form';
import { postSignin, postSignout, postSignup, putEmail } from 'pkg.api';
import { Common, useMainSt } from '../main';

type Data = { email: string; password: string };

export type Auth = {
  // TODO: Типизация SocketIO больная, не на пару минут
  socket: any;
  isLogin: boolean | null;
  initSocket: () => void;
  setIsLogin: (value: boolean) => void;
  onSignIn: ({
    email,
    password,
  }: Data & {
    setError: UseFormSetError<{ email: string; password: string }>;
  }) => Promise<200 | 400>;
  onSignUp: ({
    email,
    password,
    username,
  }: Data & {
    setError: UseFormSetError<{ email: string; password: string; username: string }>;
    username: string;
  }) => Promise<200 | 400>;
  onEmailChange: ({
    email,
    password,
  }: Data & {
    setError: UseFormSetError<{ email: string; password: string }>;
  }) => Promise<200 | 400>;
  onSignOut: () => Promise<200 | 400>;
};

export const createAuthSt: StateCreator<Common, [], [], Auth> = (set) => ({
  socket: null,
  isLogin: null,
  initSocket: () => {
    if (useMainSt.getState().socket === null) {
      const socketInstance = io('https://api.xieffect.ru/', {
        withCredentials: true,
        transports: ['websocket'],
        reconnectionAttempts: 100,
        reconnectionDelay: 2000,
        reconnectionDelayMax: 50000,
      });

      set({ socket: socketInstance });
    }
  },
  setIsLogin: (value: boolean) => set(() => ({ isLogin: value })),
  onSignIn: async ({ email, password, setError }) => {
    const { data, status } = await postSignin({ email, password });

    if (status === 200 && data) {
      useMainSt.getState().initSocket();

      set((state) => ({
        isLogin: true,
        user: {
          ...state.user,
          onboardingStage: data.onboarding_stage,
          username: data.username,
          id: data.id,
          displayName: data.display_name,
          theme: data.theme,
          email: data.email,
        },
      }));
      return 200;
    }

    if (data?.detail === 'User not found') {
      setError('email', { type: 'manual', message: 'Не удалось найти аккаунт' });
    } else if (data?.detail === 'Wrong password') {
      setError('password', { type: 'manual', message: 'Неправильный пароль' });
    }

    return 400;
  },
  onSignUp: async ({ username, email, password, setError }) => {
    const { data, status } = await postSignup({ username, email, password });

    if (status === 200 && data) {
      useMainSt.getState().initSocket();

      set((state) => ({
        isLogin: true,
        user: {
          ...state.user,
          onboardingStage: data.onboarding_stage,
          username: data.username,
          id: data.id,
          displayName: data.display_name,
          theme: data.theme,
          email: data.email,
        },
      }));
      return 200;
    }

    if (data?.detail === 'Username already in use') {
      setError('username', { type: 'manual', message: 'Такое имя пользователя уже занято' });
    } else if (data?.detail === 'Email already in use') {
      setError('email', { type: 'manual', message: 'Аккаунт с такой почтой уже зарегистрирован' });
    }

    return 400;
  },
  onSignOut: async () => {
    const { data, status } = await postSignout();

    if (data && status === 204) {
      const { socket, updateChannels, updateCategories } = useMainSt.getState();
      if (socket) socket.disconnect();

      updateChannels([]);
      updateCategories([]);

      set(() => ({
        isLogin: false,
        user: {
          onboardingStage: null,
          username: '',
          id: null,
          displayName: '',
          theme: '',
          email: '',
          lastPasswordChange: '',
        },
      }));

      return 200;
    }

    return 400;
  },
  onEmailChange: async ({ email, password, setError }) => {
    const { data, status } = await putEmail({ email, password });

    if (status === 200 && data) {
      set((state) => ({
        user: {
          ...state.user,
          email: data.email,
        },
      }));
      return 200;
    }
    if (data?.detail === 'Wrong password') {
      setError('password', { type: 'manual', message: 'Неправильный пароль' });
    }

    return 400;
  },
});

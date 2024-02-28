import { StateCreator } from 'zustand';
import { get } from 'pkg.utils';
import { useMainSt } from 'store/main';
import { UserSettings } from './settings';
import { UserT } from 'store/models/user';
import { redirect } from 'next/navigation';
import { setTimeout } from 'timers';
import { toast } from 'sonner';

type DataUserMethodAnswer = {
  [key: string]: unknown;
};

export type UserProfile = {
  user: UserT;
  updateUser: (value: { [key: string]: unknown }) => void;
  getUser: () => void;
};

type ResponseBody = {
  onboarding_stage: UserT["onboardingStage"];
}

export const createUserProfileSt: StateCreator<UserProfile & UserSettings, [], [], UserProfile> = (
  set,
) => ({
  user: {
    id: null, // ID пользователя, уникален
    username: '', // Имя пользователя, может быть неуникальным
    handle: '', // Уникальное имя пользователя, отображается в интерфейсе как основное
    avatar: null, // Аватарка пользователя
    communities: [], // Массив Сообществ
    onboardingStage: null,
  },
  updateUser: ({ key: value }: { [key: string]: unknown }) =>
    set((state) => ({ user: { ...state.user, key: value } })),
  getUser: async () => {
    const { data, status } = await get<ResponseBody>({
      service: 'auth',
      path: '/api/users/current/home/',
      config: {
        headers: {
          'X-Testing': process.env.NEXT_PUBLIC_ENABLE_X_TESTING
            ? process.env.NEXT_PUBLIC_ENABLE_X_TESTING
            : 'false',
        },
      },
    });
    console.log("data", data);
    set((state) => ({ user: { ...state.user, onboardingStage: data["onboarding_stage"] } }));

    if (status === 401) {
      useMainSt.getState().setIsLogin(false)
    } else {
      useMainSt.getState().setIsLogin(true)
    }
  },
});

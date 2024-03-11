import { StateCreator } from 'zustand';
import { get } from 'pkg.utils';
import { useMainSt } from 'pkg.stores';
import { UserSettings } from './settings';
import { UserT } from 'pkg.models';

const welcomePagesPathsDict = {
  created: '/welcome/user-info',
  'community-choice': '/welcome/community',
  'community-create': '/welcome/community-create',
  'community-invite': '/welcome/community-invite',
};

type DataUserMethodAnswer = {
  [key: string]: unknown;
};

export type UserProfile = {
  user: UserT;
  updateUser: (value: { [key: string]: unknown }) => void;
  getUser: () => { redir?: string, isLogin?: boolean };
};

type ResponseBody = {
  id: UserT["id"];
  username: UserT["username"];
  display_name: UserT["displayName"];
  onboarding_stage: UserT["onboardingStage"];
  theme: UserT["theme"];
}

export const createUserProfileSt: StateCreator<UserProfile & UserSettings, [], [], UserProfile> = (
  set,
) => ({
  user: {
    id: null, // ID пользователя, уникален
    email: '',
    username: '', // Имя пользователя, может быть неуникальным
    displayName: '', // Уникальное имя пользователя, отображается в интерфейсе как основное
    onboardingStage: null,
    theme: '',
  },
  updateUser: ({ key: value }: { [key: string]: unknown }) =>
    set((state) => ({ user: { ...state.user, key: value } })),
  getUser: async () => {
    const { data, status } = await get<ResponseBody>({
      service: 'auth',
      path: '/api/users/current/home/',
      config: {
        headers: {
          'Content-Type': 'application/json',
          'X-Testing': process.env.NEXT_PUBLIC_ENABLE_X_TESTING
            ? process.env.NEXT_PUBLIC_ENABLE_X_TESTING
            : 'false',
        },
      },
    });
    console.log("data", data);
    set((state) => ({ user: { ...state.user, onboardingStage: data["onboarding_stage"], username: data.username, id: data.id, displayName: data["display_name"], theme: data.theme } }));

    if (status === 401) {
      useMainSt.getState().setIsLogin(false)
    } else {
      // if (data["onboarding_stage"] && data["onboarding_stage"] !== "completed") return { redir: welcomePagesPathsDict[data["onboarding_stage"]], isLogin: true };
      useMainSt.getState().setIsLogin(true);
    }
  },
});

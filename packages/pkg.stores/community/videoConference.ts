import { StateCreator } from 'zustand';
import { post } from 'pkg.utils';
import { UserSettings } from '../user/settings';
import { UserProfile } from '../user/profile';

export type VideoConference = {
  token: string | null;
  getToken: (id: string) => void;
};

type RequestBody = {
  room_name: string;
};

type ResponseBody = {
  token: string;
};

export const createVideoConferenceSt: StateCreator<
  UserProfile & UserSettings & VideoConference,
  [],
  [],
  VideoConference
> = (set) => ({
  token: null,
  getToken: async (id: string) => {
    const { data } = await post<RequestBody, ResponseBody>({
      service: 'live',
      path: '/api/tokens/',
      body: {
        room_name: id,
      },
    });
    console.log('fetchData', data);
    set(() => ({ token: data?.token ?? '' }));
  },
});

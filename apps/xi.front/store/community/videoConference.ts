import { StateCreator } from 'zustand';
import { fetchData } from 'pkg.utils';
import { UserSettings } from 'store/user/userSettings';
import { UserProfile } from 'store/user/userProfile';

type DataUserMethodAnswer = {
  [key: string]: unknown;
};

export type VideoConference = {
  token: string | null;
  getToken: (id: string) => void;
};

export const createVideoConferenceSt: StateCreator<
  UserProfile & UserSettings & VideoConference,
  [],
  [],
  VideoConference
> = (set) => ({
  token: null,
  getToken: async (id: string) => {
    console.log("id", id);
    const data = await fetchData({
      service: 'live',
      pathname: '/api/tokens/',
      method: 'POST',
      data: {
        room_name: id,
      },
    });
    console.log('fetchData', data);
    set(() => ({ token: data.token }));
  },
});

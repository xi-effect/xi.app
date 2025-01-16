/* eslint-disable @typescript-eslint/no-explicit-any */

export type ConnectT = {
  setConnect: (arg: boolean) => void;
  connect: boolean;
};

export type IsConnectT = {
  isConnected: boolean;
  setIsConnected: (arg: boolean) => void;
};

export type SettingsRoomT = {
  token: string;
  room: any;
  connectInfo: ConnectT;
  isConnectInfo: IsConnectT;
};

export type LocalUserChoiceT = {
  audioEnabled: boolean;
  videoEnabled: boolean;
};

export interface ISettingsRoom {
    token: string,
    room: any,
    connectInfo: IConnect,
    isConnectInfo: IisConnect
}


export interface IisConnect {
    isConnected: boolean,
    setIsConnected: (arg: boolean) => void
}

export interface IConnect {
    setConnect: (arg: boolean) => void,
    connect: boolean,
}
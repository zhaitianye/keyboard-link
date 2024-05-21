export interface Ireturn {
    success: boolean;
    msg: null | string;
    data: null | any;
}
export default class WebSocketBase {
    private ws;
    private isConnect;
    private url;
    private messageCallbacks;
    constructor({ host, port }: {
        host: string;
        port: number;
    });
    private content;
    send: (params: {
        method: string;
        data: any;
    }) => Ireturn;
    sendReceive: (params: {
        method: string;
        data: any;
    }) => Promise<Ireturn>;
    receive: (data: {
        id?: string;
        callMethod?: string;
        payload?: any;
    }) => void;
    private utilsGenerateId;
    private utilsRemoveLeadingNewlines;
    private utilsRemoveTrailingNewlines;
    utilsPreconditioningSendData: ({ str, isRemoveHeaderNewlinesCharacter, isRemoveTailNewlinesCharacter, }: {
        str: string;
        isRemoveHeaderNewlinesCharacter: boolean;
        isRemoveTailNewlinesCharacter: boolean;
    }) => string;
}

import WebSocketBase from "./base";
import { Ireturn } from "./base";
export default class WebSocketHandler extends WebSocketBase {
    sendActiveInputValue: (value: string) => void;
    testSend: ({ method, data }: {
        method: string;
        data: any;
    }) => void;
    testSendReceive: (data: any) => Promise<Ireturn>;
    handleTest: (data: any) => void;
}

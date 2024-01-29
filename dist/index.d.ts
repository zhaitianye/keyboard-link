export default class KeyboardLink {
    private ws;
    private host;
    private port;
    private nowElement;
    constructor({ host, port }: {
        host: string;
        port: number;
    });
    init: () => Promise<void>;
    private inputChange;
    private focusInChange;
    private focusOutChange;
}

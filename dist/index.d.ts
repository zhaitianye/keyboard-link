export default class KeyboardLink {
    private ws;
    private host;
    private port;
    private nowElement;
    private useTimer;
    private timer;
    private timerCache;
    constructor({ host, port, useTimer, }: {
        host: string;
        port: number;
        useTimer?: boolean;
    });
    init: () => Promise<void>;
    private inputChange;
    private sendTimerValue;
    private handleClearTimer;
    private focusInChange;
    private focusOutChange;
}

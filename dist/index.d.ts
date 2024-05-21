export default class KeyboardLink {
    private ws;
    private host;
    private port;
    private nowElement;
    private useTimer;
    private timer;
    private timerCache;
    private isRemoveHeaderNewlinesCharacter;
    private isRemoveTailNewlinesCharacter;
    constructor({ host, port, useTimer, isRemoveHeaderNewlinesCharacter, isRemoveTailNewlinesCharacter, }: {
        host: string;
        port: number;
        useTimer?: boolean;
        isRemoveHeaderNewlinesCharacter?: boolean;
        isRemoveTailNewlinesCharacter?: boolean;
    });
    init: () => Promise<void>;
    private inputChange;
    private sendTimerValue;
    private handleClearTimer;
    private focusInChange;
    private focusOutChange;
}

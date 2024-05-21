// 引入链接
import WebSocketHandler from "./websocket/index";

// 补充类型
declare const window: Window & {
  onload: any;
};

declare const document: Document & {
  addEventListener: any;
  activeElement: any;
};

export default class KeyboardLink {
  // ws 实例
  private ws: any;
  // ws 实例
  private host: string;
  // ws 实例
  private port: number;
  // 当前dom
  private nowElement: any;

  // 定时器
  // 是否使用定时器
  private useTimer: boolean;
  // 定时器实例
  private timer: any;
  // 使用cache
  private timerCache: any;

  // 是否去除头部换行符
  private isRemoveHeaderNewlinesCharacter: boolean;
  private isRemoveTailNewlinesCharacter: boolean;

  // 构造函数
  public constructor({
    host,
    port,
    useTimer = false,
    isRemoveHeaderNewlinesCharacter = false,
    isRemoveTailNewlinesCharacter = false,
  }: {
    // 链接的服务器地址
    host: string;
    // 链接的服务器端口
    port: number;
    // 可选参数：是否使用定时器，默认false
    useTimer?: boolean;
    // 可选参数：是否去除头部换行符，默认false
    isRemoveHeaderNewlinesCharacter?: boolean;
    // 可选参数：是否去除尾部换行符，默认false
    isRemoveTailNewlinesCharacter?: boolean;
  }) {
    // 传入值检测
    if (!host || !port) {
      throw new Error("host or port is null");
    }
    this.host = host;
    this.port = port;
    this.ws = new WebSocketHandler({
      host: this.host,
      port: this.port,
    });

    // 初始化定时器
    this.useTimer = useTimer;
    this.timer = null;
    this.timerCache = null;

    // 初始化参数
    this.isRemoveHeaderNewlinesCharacter = isRemoveHeaderNewlinesCharacter;
    this.isRemoveTailNewlinesCharacter = isRemoveTailNewlinesCharacter;

    // 初始化
    this.init();
  }

  // 初始化
  public init = async () => {
    // 添加监听活跃dom的变化
    document.addEventListener("focusin", this.focusInChange);
    document.addEventListener("focusout", this.focusOutChange);
  };

  // 输入框值变化
  private inputChange = (event) => {
    // 如果不满足条件
    if (
      !this.ws ||
      !this.nowElement ||
      !(
        this.nowElement instanceof HTMLInputElement ||
        this.nowElement instanceof HTMLTextAreaElement
      )
    ) {
      this.handleClearTimer();
      return;
    }

    // 重复性校验，发送
    if (event.target.value !== this.timerCache) {
      this.timerCache = event.target.value;
      const needToSend = this.ws.utilsPreconditioningSendData({
        str: event.target.value,
        isRemoveHeaderNewlinesCharacter: this.isRemoveHeaderNewlinesCharacter,
        isRemoveTailNewlinesCharacter: this.isRemoveTailNewlinesCharacter,
      });
      this.ws.sendActiveInputValue(needToSend);
      return;
    }
  };

  // 定时器发送值
  private sendTimerValue = () => {
    // 如果不满足条件
    if (
      !this.ws ||
      !this.nowElement ||
      !(
        this.nowElement instanceof HTMLInputElement ||
        this.nowElement instanceof HTMLTextAreaElement
      )
    ) {
      // 清空定时器返回
      this.handleClearTimer();
      return;
    }

    // 重复性校验，发送
    if (this.nowElement.value !== this.timerCache) {
      this.timerCache = this.nowElement.value;
      const needToSend = this.ws.utilsPreconditioningSendData({
        str: this.nowElement.value,
        isRemoveHeaderNewlinesCharacter: this.isRemoveHeaderNewlinesCharacter,
        isRemoveTailNewlinesCharacter: this.isRemoveTailNewlinesCharacter,
      });
      this.ws.sendActiveInputValue(needToSend);
      return;
    }
  };

  // 清理定时器
  private handleClearTimer = () => {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
      this.timerCache = null;
    }
  };

  // 监听移入变化 - 挂载监听
  private focusInChange = async () => {
    const focusedElement = document.activeElement;

    // 如果ws存在，进入即发送值
    if (this.ws) {
      const needToSend = this.ws.utilsPreconditioningSendData({
        str: focusedElement.value,
        isRemoveHeaderNewlinesCharacter: this.isRemoveHeaderNewlinesCharacter,
        isRemoveTailNewlinesCharacter: this.isRemoveTailNewlinesCharacter,
      });
      this.ws.sendActiveInputValue(needToSend);
    }

    // 挂载变动监听
    this.nowElement = focusedElement;
    this.nowElement.addEventListener("input", this.inputChange);

    // 如果有要求启用定时器，挂载定时器、先移除上一个
    if (this.useTimer) {
      this.handleClearTimer();
      this.timer = setInterval(this.sendTimerValue, 200);
    }
  };

  // 监听移出变化 - 移除监听
  private focusOutChange = async () => {
    // 移除定时器
    this.handleClearTimer();

    // 移除其他
    if (this.nowElement) {
      // 移除input事件监听
      this.nowElement.removeEventListener("input", this.inputChange);
    }
  };
}

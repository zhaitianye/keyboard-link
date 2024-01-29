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

  // 构造函数
  public constructor({ host, port }: { host: string; port: number }) {
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
    if (this.ws) {
      this.ws.sendActiveInputValue(event.target.value || "");
    }
  };

  // 监听移入变化 - 挂载监听
  private focusInChange = async () => {
    const focusedElement = document.activeElement;

    // 如果ws存在，进入即发送值
    if (this.ws) {
      this.ws.sendActiveInputValue(focusedElement.value || "");
    }

    this.nowElement = focusedElement;
    this.nowElement.addEventListener("input", this.inputChange);
  };

  // 监听移出变化 - 移除监听
  private focusOutChange = async () => {
    if (this.nowElement) {
      this.nowElement.removeEventListener("input", this.inputChange);
      this.nowElement = null;
    }
  };
}

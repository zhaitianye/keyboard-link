// 通用返回值
export interface Ireturn {
  success: boolean;
  msg: null | string;
  data: null | any;
}

export default class WebSocketBase {
  // ws 实例
  private ws: null | WebSocket;
  // 链接状态
  private isConnect: boolean;
  // 链接地址
  private url: string;
  // 收发消息队列
  private messageCallbacks: Map<string, Function>;

  // 构造函数
  public constructor({ host, port }: { host: string; port: number }) {
    // 初始化
    this.ws = null;
    this.isConnect = false;
    this.url = `${host}:${port}`;
    this.messageCallbacks = new Map();

    // 建立链接
    this.content();
  }

  // 链接以及重连
  private content = () => {
    if (this.isConnect) {
      return;
    }
    this.ws = new WebSocket(this.url);
    this.ws.onopen = () => {
      console.log("keyboard-link is connect");
      this.isConnect = true;
    };

    // 接收数据
    this.ws.onmessage = (data) => {
      this.receive(JSON.parse(data.data));
    };

    this.ws.onerror = () => {
      // 错误之后不做处理
      this.isConnect = false;
    };
    this.ws.onclose = () => {
      this.isConnect = false;
      this.content();
    };
  };

  // 直接发送
  public send = (params: { method: string; data: any }): Ireturn => {
    // 如果当前ws不在线，返回
    if (!this.ws || !this.isConnect) {
      return { success: false, msg: "ws not connect", data: null };
    }

    // 随机id
    const id = this.utilsGenerateId();

    // 数据组装
    const sendData = JSON.stringify({
      id,
      method: params.method,
      data: params.data,
    });

    // 发送
    this.ws.send(sendData);
    return { success: true, msg: null, data: null };
  };

  // 需要接收的发送，双向等待
  public sendReceive = async (params: {
    method: string;
    data: any;
  }): Promise<Ireturn> => {
    // 如果当前ws不在线，返回
    if (!this.ws || !this.isConnect) {
      return { success: false, msg: "ws not connect", data: null };
    }

    // 随机id
    const id = this.utilsGenerateId();

    // 数据组装
    const sendData = JSON.stringify({
      id,
      method: params.method,
      data: params.data,
    });

    // 发送
    this.ws.send(sendData);

    // hash-map 队列等待
    return new Promise((resolve) => {
      this.messageCallbacks[id] = resolve;
    });
  };

  // 接收数据
  public receive = (data: {
    id?: string;
    callMethod?: string;
    payload?: any;
  }) => {
    // 解构
    const { id, callMethod, payload } = data;

    // 如果是id,则返回异步的进程
    if (id && this.messageCallbacks[id]) {
      this.messageCallbacks[id]({ success: true, msg: "OK", data: payload });
      delete this.messageCallbacks[id];
    }

    // 如果没有id，有方法，并且有支持的方法，则是调用方法类型
    if (!id && callMethod && this[callMethod]) {
      this[callMethod](data.payload);
    }
  };

  // ------------------------ 工具部分
  // 生成随机id
  private utilsGenerateId = (): string => {
    const timestamp = Date.now().toString();
    const random = Math.random().toString(36).substring(2);
    const id = `${timestamp}-${random}`;
    return id;
  };
}

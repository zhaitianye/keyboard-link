import WebSocketBase from "./base";
import { Ireturn } from "./base";

export default class WebSocketHandler extends WebSocketBase {
  // 发送活跃值
  public sendActiveInputValue = (value: string) => {
    this.send({
      method: "activeInputValue",
      data: value,
    });
  };

  // ------------------------ ws 客户端调用部分 - 封装的方法
  // 测试自定义方法1
  public testSend = ({ method, data }: { method: string; data: any }) => {
    this.send({
      method,
      data,
    });
  };

  // 测试自定义方法2
  public testSendReceive = async (data: any): Promise<Ireturn> => {
    return await this.sendReceive({
      method: "test",
      data,
    });
  };

  // ------------------------ ws 服务器调用部分 - 封装的方法
  // 测试自定义方法
  public handleTest = (data: any) => {
    console.log("服务端调用测试自定义方法", data);
  };
}

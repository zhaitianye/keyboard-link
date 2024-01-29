## 服务端示例

### 启动服务

下面以 `NodeJs` 作例子。

```js
const ws = require("ws");
const wss = new ws.WebSocketServer({ port: 18790 });
wss.on("connection", function connection(ws) {
  ws.on("error", console.error);

  ws.on("message", function message(data) {
    console.log("received: %s", data);
  });
});
```

#### 数据结构

在客户端进行聚焦，或者输入的时候，会有数据传递进来。

```json
{
  "id": "1706520255510-j34ekty6un",
  "method": "activeInputValue",
  "data": "5"
}
```

说明：

| 参数   | 类型   | 说明                               |
| ------ | ------ | ---------------------------------- |
| id     | String | 表示唯一标识符，用于请求和响应对应 |
| method | String | 方法                               |
| data   | String | 在此方法下代表实时数据             |

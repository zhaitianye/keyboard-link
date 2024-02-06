## 安装

### 通过 npm 下载安装代码

```bash
$ npm i keyboard-link --save
```

### 通过 yarn 下载安装代码

```bash
$ yarn add keyboard-link
```

### 通过 pnpm 下载安装代码

```bash
$ pnpm i keyboard-link
```

## 使用

说明：

| 参数     | 类型     | 说明                                 |
| -------- | -------- | ------------------------------------ |
| host     | String   | ws 链接地址                          |
| port     | Number   | ws 链接端口                          |
| useTimer | Boolean? | 可选，默认值为 false，是否使用定时器 |

### esm

```js
import keyboardLink from "keyboard-link";
new keyboardLink({
  host: "ws:xxx.xxx.xxx.xxx",
  port: 0000,
  useTimer: true,
});
```

### cjs

```js
requirejs(
  ["node_modules/keyboard-link/dist/index.js"],
  function (keyboardLink) {
    new keyboardLink({
      host: "ws:xxx.xxx.xxx.xxx",
      port: 0000,
      useTimer: false,
    });
  }
);
```

### 浏览器直接使用

```html
<script src="node_modules/keyboard-link/dist/index.aio.min.js"></script>
<script>
  new window.keyboardLink({
    host: "ws:xxx.xxx.xxx.xxx",
    port: 0000,
    useTimer: false,
  });
</script>
```

# [keyboard-link](https://github.com/zhaitianye/keyboard-link)

[![version](https://img.shields.io/npm/v/keyboard-link.svg)](https://www.npmjs.com/package/keyboard-link) ![downloads](https://img.shields.io/npm/dm/keyboard-link.svg) ![LICENSE](https://img.shields.io/npm/l/keyboard-link.svg) ![repo-types](https://img.shields.io/npm/types/keyboard-link.svg) ![repo-size](https://img.shields.io/github/repo-size/zhaitianye/keyboard-link) ![minzip](https://img.shields.io/bundlephobia/minzip/keyboard-link)

## 特性

- 简单、两行代码启动
- 支持 ES6+或 TypeScript 编写源码，编译生成生产代码
- 多环境支持（支持浏览器原生，支持 AMD，CMD，支持 Webpack，Rollup，fis 等）

## 安装

通过 npm 下载安装代码

```bash
$ npm i keyboard-link
```

通过 yarn 下载安装代码

```bash
$ yarn add keyboard-link
```

通过 pnpm 下载安装代码

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
new keyboardLink({ host: "ws:xxx.xxx.xxx.xxx", port: 0000 });
```

### cjs

```js
requirejs(
  ["node_modules/keyboard-link/dist/index.js"],
  function (keyboardLink) {
    new keyboardLink({
      host: "ws:xxx.xxx.xxx.xxx",
      port: 0000,
      useTimer: true,
    });
  }
);
```

### 直接使用

```html
<script src="node_modules/keyboard-link/dist/index.aio.min.js"></script>
<script>
  new window.keyboardLink({
    host: "ws:xxx.xxx.xxx.xxx",
    port: 0000,
    useTimer: true,
  });
</script>
```

## API 文档

[API](https://zhaitianye.github.io/keyboard-link/)

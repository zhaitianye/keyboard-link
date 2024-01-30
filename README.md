# [keyboard-link](https://github.com/zhaitianye/keyboard-link)

[![version](https://img.shields.io/npm/v/swtcwallet-jssdk.svg)](https://www.npmjs.com/package/swtcwallet-jssdk) [![downloads](https://img.shields.io/npm/dm/swtcwallet-jssdk.svg)](https://www.npmjs.com/package/swtcwallet-jssdk) [![LICENSE](https://img.shields.io/npm/l/swtcwallet-jssdk.svg)](https://github.com/zhaitianye/swtcwallet-jssdk/blob/master/LICENSE) ![repo-types](https://img.shields.io/npm/types/swtcwallet-jssdk.svg) ![repo-size](https://img.shields.io/github/repo-size/zhaitianye/swtcwallet-jssdk) ![minzip](https://img.shields.io/bundlephobia/minzip/swtcwallet-jssdk)

## 特性

- 简单、两行代码启动
- 支持 ES6+或 TypeScript 编写源码，编译生成生产代码
- 多环境支持（支持浏览器原生，支持 AMD，CMD，支持 Webpack，Rollup，fis 等）

## 目录介绍

```
.
├── demo 使用demo
├── dist 编译产出代码
├── src 源代码目录
```

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
  });
</script>
```

## API 文档

[API](https://zhaitianye.github.io/keyboard-link/)

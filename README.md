# [keyboard-link](https://github.com/zhaitianye/keyboard-link)

[![version](https://img.shields.io/npm/v/keyboard-link.svg)](https://www.npmjs.com/package/keyboard-link) ![downloads](https://img.shields.io/npm/dm/keyboard-link.svg) ![LICENSE](https://img.shields.io/npm/l/keyboard-link.svg) ![repo-types](https://img.shields.io/npm/types/keyboard-link.svg) ![repo-size](https://img.shields.io/github/repo-size/zhaitianye/keyboard-link) ![minzip](https://img.shields.io/bundlephobia/minzip/keyboard-link)

## 用途

在移动端使用，解决全屏状态下，软键盘弹出对输入框遮挡的问题。

使用 websocket 通讯，实时的将活跃输入框的值传递出去。移动端自行展示在键盘上方。

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

| 参数                            | 类型     | 说明                                     |
| ------------------------------- | -------- | ---------------------------------------- |
| host                            | String   | ws 链接地址                              |
| port                            | Number   | ws 链接端口                              |
| useTimer                        | Boolean? | 可选，默认值为 false，是否使用定时器     |
| useTimer                        | Boolean? | 可选，默认值为 false，是否使用定时器     |
| isRemoveHeaderNewlinesCharacter | Boolean? | 可选，默认值为 false，是否移除头部换行符 |
| isRemoveTailNewlinesCharacter   | Boolean? | 可选，默认值为 false，是否移除尾部换行符 |

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

## 兼容性

| 类型                | 是否支持           | 说明                                                                                                                                                                    |
| ------------------- | ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| input type='text'   | :heavy_check_mark: | 支持良好                                                                                                                                                                |
| textarea            | :heavy_check_mark: | 支持良好                                                                                                                                                                |
| input type='number' | :x:                | 由于数字键盘支持输入特殊符号，并且获取实际的值并不是实际可以操作的。而且底层也没有相关的 api 可以获取到。所以建议移除项目中的数字输入框，并使用文本输入框进行自定义校验 |

## API 文档 [:page_facing_up:](https://zhaitianye.github.io/keyboard-link/)

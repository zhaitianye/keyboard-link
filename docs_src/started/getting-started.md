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

### esm

```js
import keyboardLink from "keyborard-link";
new keyboardLink({
  host: "ws:xxx.xxx.xxx.xxx",
  port: 0000,
});
```

### cjs

```js
requirejs(
  ["node_modules/keyborard-link/dist/index.js"],
  function (keyboardLink) {
    new keyboardLink({
      host: "ws:xxx.xxx.xxx.xxx",
      port: 0000,
    });
  }
);
```

### 浏览器直接使用

```html
<script src="node_modules/keyborard-link/dist/index.aio.min.js"></script>
<script>
  new window.keyboardLink({
    host: "ws:xxx.xxx.xxx.xxx",
    port: 0000,
  });
</script>
```

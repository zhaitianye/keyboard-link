module.exports = {
  title: "KEYBOARD LINK", // 名称
  description: "键盘遮挡解决方案，通过ws实时传输数据", // 描述
  head: [
    [
      "link", // 设置 favicon.ico，注意图片放在 public 文件夹下
      { rel: "icon", href: "/logo.jpg" },
    ],
  ],
  // 注意，发布到其他nginx目录的时候，此base值需要改成 "/"
  // base: "/",
  base: "/keyboard-link/",
  dest: "docs",
  themeConfig: {
    nav: [],
    sidebar: [
      ["/", "首页"],
      ["/started/getting-started.md", "客户端"],
      ["/server/server.md", "服务端"],
      ["/update/update.md", "更新说明"],
    ],
  },
};

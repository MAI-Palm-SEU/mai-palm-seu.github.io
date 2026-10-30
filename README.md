# MAI Lab

**Multimodal Autonomous Intelligence**

PALM Lab · Southeast University

MAI Lab 官方网站，展示研究方向、项目、成果、团队和招生信息，支持中英文切换。

[访问官网](https://mai-palm-seu.github.io/) · [维护指南](docs/MAINTENANCE.md)

## 内容更新

- 成员、研究方向、项目和成果：[content.js](content.js)
- 首页动态与页面文案：[tools/build-pages.js](tools/build-pages.js)
- 样式与素材：[style.css](style.css)、[assets/](assets/)

修改后，在仓库根目录运行：

```sh
node tools/check-content.js
node tools/build-pages.js
```

将生成的 HTML 一起提交到 `main`，GitHub Pages 会自动发布。请修改数据或生成脚本，直接编辑 HTML 的内容会在下次生成时被覆盖。

网站使用原生 HTML、CSS 和 JavaScript，无第三方运行时依赖；维护时需要 Node.js。

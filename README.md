# MAI Group 网站

Multimodal Autonomous Intelligence · PALM Lab, Southeast University

这是可直接发布到 GitHub Pages 的静态网站。入口 `index.html` 位于仓库根目录，无需安装依赖或构建。

## 首次发布

1. 在自己的 GitHub 账号或课题组组织中，新建一个 Public 仓库，例如 `mai-group`。免费账号的 GitHub Pages 使用公开仓库。
2. 解压发布包，将包内文件直接放到仓库根目录；应能在仓库首页看到 `index.html`，不要多套一层文件夹。
3. 提交到 `main` 分支。
4. 打开仓库的 **Settings → Pages**。
5. 在 **Build and deployment → Source** 选择 **Deploy from a branch**，选择 **main** 和 **/ (root)**，点击 **Save**。
6. 等待部署完成，以 Pages 设置页面显示的实际地址为准。普通项目仓库的地址通常为 `https://账号或组织名.github.io/仓库名/`。

仓库内容公开，网站也公开访问。无需购买域名；以后可以绑定自有域名。

## 文件

- `index.html`：首页、动态、研究工作和团队预览。
- `research.html`：研究方向，每个方向最多两篇精选论文。
- `publications.html`：论文搜索与筛选。
- `people.html`：教师、博士生和硕士生。
- `join.html`：招生、联系和官方申请链接。
- `project.html`：项目详情模板。
- `content.js`：论文元数据、摘要和作者映射。
- `app.js`：中英文切换、筛选、导航和引用交互。
- `style.css`：字体、颜色和响应式布局。
- `assets/`：本地字体、照片、标识与研究配图。
- `SOURCES.md`：公开资料和素材来源。

静态文案的中英文分别放在 `data-en` 和 `data-zh` 属性中。修改成员时，请同时更新 `people.html`、`index.html` 和 `content.js`。修改文件并提交后，GitHub Pages 会重新部署。

## 发布后检查

检查首页、团队、论文筛选、中英文切换和手机菜单。用实际对外域名，分别在校园网和手机流量下关闭代理测试访问；某个网络能打开，不代表其他网络也一样。自定义域名不会自动改变底层托管网络。

## 官方说明

- 创建站点：https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site
- 发布来源：https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
- 自定义域名：https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site

# MAI Lab 网站

Multimodal Autonomous Intelligence · PALM Lab, Southeast University

这是可直接发布到 GitHub Pages 的静态网站。入口 `index.html` 位于仓库根目录，浏览和发布都无需安装依赖或构建；改内容后用 `node tools/build-pages.js` 重新生成页面（需要 Node.js，无其他依赖）。

## 首次发布

1. 在自己的 GitHub 账号或课题组组织中，新建一个 Public 仓库，例如 `mai-group`。免费账号的 GitHub Pages 使用公开仓库。
2. 解压发布包，将包内文件直接放到仓库根目录；应能在仓库首页看到 `index.html`，不要多套一层文件夹。
3. 提交到 `main` 分支。
4. 打开仓库的 **Settings → Pages**。
5. 在 **Build and deployment → Source** 选择 **Deploy from a branch**，选择 **main** 和 **/ (root)**，点击 **Save**。
6. 等待部署完成，以 Pages 设置页面显示的实际地址为准。普通项目仓库的地址通常为 `https://账号或组织名.github.io/仓库名/`。

仓库内容公开，网站也公开访问。无需购买域名；以后可以绑定自有域名。

## 文件

各页面分工明确，同一内容只在一处完整展开：

- `index.html`：首页。首屏（课题组介绍、三个研究方向）、代表项目（前 3 个）、动态、团队预览、招生入口。
- `research.html`：研究框架。目标、三个相互支撑的方向（感知与理解、语义推理、自主决策）、方法与应用、代表成果进展，以及各方向的代表成果和关联项目。
- `projects.html`：具体研究项目（多模态模型与表征、自主智能体、具身智能、智能推荐），每个项目关联三个研究方向中的一个或多个；下方「探索课题」仍归属这三个方向。
- `project.html?id=…`：项目详情（概述、子方向与论文、成员）。旧的项目链接（如 `?id=agentic-retrieval`）和单篇论文链接（如 `?id=contextfold`）会自动打开所属项目。
- `publications.html`：论文、技术报告和专著，可「按方向」或「按年份」浏览，并可搜索；`?view=year` 直接打开年份视图。
- `people.html`：教师、博士生、硕士生、本科生、科研实习生和已毕业成员；每人显示入组年份、研究兴趣（一行）和链接图标。
- `join.html`：招生、联系和官方申请链接。
- `content.js`：成员、研究方向（topics）、项目（projects）和论文（papers）数据。
- `model.js`：页面生成与浏览器共用的关系推导、作者匹配、类型统计与数据校验。
- `app.js`：中英文切换、论文与项目渲染、导航和引用交互。
- `style.css`：字体、颜色和响应式布局。
- `assets/`：本地字体、照片、标识与研究配图。
- `SOURCES.md`：公开资料和素材来源。
- `tools/build-pages.js`：生成上面 7 个 HTML 页面（页眉页脚、首页动态、团队页与首页团队区、研究方向页、「探索课题」等）。

## 日常更新

页面由 `tools/build-pages.js` 根据 `content.js` 生成。**不要直接改 HTML**：下次生成会覆盖。改完数据或脚本后，在仓库根目录运行：

```
node tools/build-pages.js
```

- **改成员**：只改 `content.js` 的 `members`。`role` 填 `Faculty` / `PhD` / `Master` / `Undergrad` / `Intern` / `Alumni`；`since` 填入组年份（待入学的用 `intake`）；`interests` 写 2–3 个关键词，要能放进卡片的一行（英文约 30 个字符）；照片裁成 4:5 竖图放在 `assets/people/`；`links` 可填 `homepage` / `scholar` / `github` / `orcid` / `profile` / `email`，有哪个填哪个。已毕业成员填 `now`（现任），网站只显示这一行。改完运行上面的命令，团队页和首页团队区会一起更新。
- **加论文**：在 `content.js` 的 `papers` 里按年份插入一条，`topic` 填 `perception` / `reasoning` / `decision`，`group` 填该主题下的小类 id（见 `topics[].groups`）；再把论文 id 加到某个项目的某个子方向（`projects[].themes[].papers`）里。可用 `relatedTopics` 记录交叉方向；`kind` 为 `paper` / `report` / `book`。每条成果只属于一个项目，主方向只计数一次。运行生成命令，确保研究页配图和精选成果同步更新。
- **改项目**：`content.js` 的 `projects` 里每个项目有 `themes`（子方向：名称、一句话、论文 id）和 `members`（参与成员的 id）。没有成果的课题会显示「研究进行中」，并可通过 `topics` 标明归属。项目的方向标签由关联成果及在研课题推导，不能另填一套 `layers`。修改后运行生成命令。
- **改动态、「探索课题」和其他页面文案**：改 `tools/build-pages.js` 里的 `NEWS`、`MORE_DIRECTIONS` 等，再运行上面的命令。中英文分别写在每一项的英文和中文两个位置。

### 分类与收录规则

- 一级研究方向固定为 **Perception & Understanding（感知与理解）**、**Semantic Reasoning（语义推理）**、**Autonomous Decision-Making（自主决策）**，统一在 `content.js` 的 `topics` 中维护。
- 方法和应用场景不作为第四个方向。推荐相关成果按其主要贡献归入表征理解或语义推理；隐私数据、专著等明确作为支撑工作展示。
- 每个方向的 `featured` 最多两条；`figure.paper` 必须属于该方向，配图链接从这条成果的项目关系生成。
- 导师代表作筛选与在读学生共同成果收录分开处理：后者不受刘帆教授作者排序限制，保留 NMVM 等共同工作。
- 论文正式题名、作者、发表信息与链接按原始记录维护。专著、技术报告分别标注和计数。
- 陈慧临 / Huilin Chen 为同一人；用户已确认其保留在已毕业成员中（2026-10-30）。

### 提交前检查

```sh
node tools/check-content.js
node tools/build-pages.js
```

在合作者的 PR 分支上追加提交，可继续通过同一个 PR 审阅；不要改写已有提交。只有合并到 Pages 发布分支 `main` 后，官网才会更新。

## 发布后检查

检查首页、研究框架、项目页、论文的主题与年份视图、中英文切换和手机菜单。用实际对外域名，分别在校园网和手机流量下关闭代理测试访问；某个网络能打开，不代表其他网络也一样。自定义域名不会自动改变底层托管网络。

## 官方说明

- 创建站点：https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site
- 发布来源：https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
- 自定义域名：https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site

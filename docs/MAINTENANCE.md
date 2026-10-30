# 网站维护

本指南面向内容维护者，记录日常更新方法和长期使用的内容规则。

## 更新流程

1. 同步 `main`，修改下表对应的文件；双语内容同时更新，数组形式为 `[英文, 中文]`。
2. 在仓库根目录运行检查和页面生成：

   ```sh
   node tools/check-content.js
   node tools/build-pages.js
   ```

3. 预览受影响的页面，检查中英文、链接和手机布局。
4. 将数据、素材及生成的 HTML 一起提交；进入 `main` 后由 GitHub Pages 发布。

生成脚本会重写根目录的 7 个 HTML 页面，不要直接编辑这些文件。内容数据发生变化时，如检查脚本中的成果数量等预期值需要更新，应先核对数据，再调整检查。

## 内容位置

| 内容 | 文件 / 数据项 |
| --- | --- |
| 成员 | `content.js` → `members` |
| 三个研究方向 | `content.js` → `topics` |
| 项目及其子方向 | `content.js` → `projects` |
| 论文、技术报告、专著 | `content.js` → `papers` |
| 首页动态、探索课题、公共页面文案 | `tools/build-pages.js` → `NEWS`、`MORE_DIRECTIONS` 等 |
| 布局与样式 | `style.css` |
| 中英文切换、搜索及页面交互 | `app.js` |
| 内容关系、筛选及校验 | `model.js` |
| 图片、字体和机构标识 | `assets/` |
| 资料与素材出处 | [SOURCES.md](../SOURCES.md) |

## 成员

- `role` 使用 `Faculty`、`PhD`、`Master`、`Undergrad`、`Intern` 或 `Alumni`。
- `since` 为入组年份；待入学成员使用 `intake` 标明入学年份。
- `interests` 写简短的研究关键词；已毕业成员卡片通过 `now` 展示现任信息。
- 照片放在 `assets/people/`，推荐 4:5 竖图。`links` 按实际情况填写 `homepage`、`scholar`、`github`、`orcid`、`profile`、`email`。
- 团队页和首页团队区由同一份数据生成。

## 研究方向、项目与成果

一级研究方向统一在 `topics` 中维护：

- `perception`：Perception & Understanding（感知与理解）
- `reasoning`：Semantic Reasoning（语义推理）
- `decision`：Autonomous Decision-Making（自主决策）

方法和应用场景归入这三个方向；数据与专著等支撑工作使用相应的 `supporting` 子类。

新增成果时，填写正式题名、作者、发表信息和链接；`kind` 区分 `paper`、`report`、`book`。`topic` 指定主方向，`group` 对应该方向的子类，`relatedTopics` 可记录交叉方向。然后将成果 id 加入所属项目的 `themes[].papers`；每条成果归属一个项目，主方向只计数一次。

导师代表作和导师与在读学生的共同成果分别考虑收录，共同成果不受导师作者排序限制。每个方向的 `featured` 最多两条，`figure.paper` 必须属于该方向。

项目通过 `themes` 组织子方向，通过 `members` 关联参与成员。项目方向由成果及在研课题推导，不另维护 `layers`；尚无成果的子方向可用 `topics` 指明归属。修改时保留已有 id，以维持链接和关联关系。

## 首页动态

在 `NEWS` 中人工精选重要竞赛获奖、代表性论文录用或发表等科研成果，不收录人员变动、旅行资助和常规学术服务。日期格式为 `YYYY-MM`。

网站按北京时间显示含当月在内最近 24 个月的动态，生成页面和访问时均会筛选。未来及过期条目不显示；没有符合条件的内容时隐藏整个栏目。

## 发布

当前发布来源为 `main` 分支的仓库根目录。提交后可在仓库的 **Actions** 或 **Settings → Pages** 查看发布结果，再到[官网](https://mai-palm-seu.github.io/)核对改动。

// Writes the static HTML pages of the MAI Lab site from content.js.
// Usage, from the repository root: node tools/build-pages.js   (or: node build-pages.js <repo dir>)
// Edit this file, not the generated HTML: running it overwrites all seven pages.
const fs = require("fs");
const path = require("path");
const out = path.resolve(process.argv[2] || path.join(__dirname, ".."));

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
// Bilingual element: T("p", "English", "中文", 'class="x"')
const T = (tag, en, zh, attrs = "") => `<${tag} data-en="${esc(en)}" data-zh="${esc(zh)}"${attrs ? " " + attrs : ""}>${esc(en)}</${tag}>`;
const ext = 'target="_blank" rel="noopener noreferrer"';

// Member data comes from the site's own content.js, so pages and data cannot drift apart.
global.window = {};
require(path.join(out, "content.js"));
const MEMBERS = window.MAI_CONTENT.members;
const CONTENT = window.MAI_CONTENT;
const TOPICS = CONTENT.topics;
const MODEL = require(path.join(out, "model.js"));
const contentErrors = MODEL.validate(CONTENT);
if (contentErrors.length) throw new Error(contentErrors.join("\n"));
const paperById = (id) => CONTENT.papers.find((paper) => paper.id === id);
const byRole = (role) => MEMBERS.filter((m) => m.role === role);
const initials = (en) => en.split(" ").map((w) => w[0]).join("");

// Link icons (Material Icons, Apache 2.0; GitHub mark from Simple Icons, CC0).
const ICONS = {
  homepage: ["Homepage", '<path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>'],
  scholar: ["Google Scholar", '<path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3 1 9l11 6 9-4.91V17h2V9L12 3z"/>'],
  github: ["GitHub", '<path d="M12 .3a12 12 0 0 0-3.8 23.38c.6.12.83-.26.83-.57v-2.03c-3.34.73-4.04-1.6-4.04-1.6-.55-1.4-1.34-1.76-1.34-1.76-1.08-.75.09-.73.09-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .1-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.64 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.62-5.48 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.21.69.82.57A12 12 0 0 0 12 .3"/>'],
  orcid: ["ORCID", '<circle cx="12" cy="12" r="11"/><text x="12" y="16.2" text-anchor="middle" font-size="10.5" font-weight="700" font-family="Arial, sans-serif" fill="#fff">iD</text>'],
  profile: ["Faculty profile", '<path d="M4 10v7h3v-7H4zm6 0v7h3v-7h-3zM2 22h19v-3H2v3zm14-12v7h3v-7h-3zm-4.5-9L2 6v2h19V6l-9.5-5z"/>'],
  email: ["Email", '<path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/>'],
};
const iconLinks = (links = {}) => {
  const items = Object.keys(ICONS).filter((k) => links[k]);
  if (!items.length) return "";
  return `<div class="icon-links">${items
    .map((k) => {
      const [label, svg] = ICONS[k];
      const href = k === "email" ? `mailto:${links[k]}` : links[k];
      return `<a href="${esc(href)}" title="${label}" aria-label="${label}"${k === "email" ? "" : " " + ext}><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${svg}</svg></a>`;
    })
    .join("")}</div>`;
};
// The year line under a name, in the style of MMLab@NTU: the year someone joined (alumni show no year).
const yearLine = (m) =>
  m.role === "Alumni" ? null : m.intake ? [`Incoming ${m.intake}`, `${m.intake} 级（待入学）`] : m.since ? [String(m.since), String(m.since)] : null;
const ROLE_LABEL = { Faculty: ["Faculty", "教师"], PhD: ["PhD student", "博士生"], Master: ["Master's student", "硕士生"], Undergrad: ["Undergraduate", "本科生"], Intern: ["Research intern", "科研实习生"] };

const NAV = [
  ["index", "Home", "首页", "index.html"],
  ["research", "Research", "研究方向", "research.html"],
  ["projects", "Projects", "研究项目", "projects.html"],
  ["publications", "Publications", "研究成果", "publications.html"],
  ["people", "People", "团队", "people.html"],
  ["join", "Join us", "加入我们", "join.html"],
];

function head(title, description) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${esc(title)}</title>
    <meta name="description" content="${esc(description)}" />
    <meta name="theme-color" content="#ffffff" />
    <meta property="og:title" content="${esc(title)}" />
    <meta property="og:description" content="Multimodal Autonomous Intelligence at Southeast University" />
    <link rel="icon" href="assets/favicon.svg" type="image/svg+xml" />
    <link rel="stylesheet" href="assets/fonts.css" />
    <link rel="stylesheet" href="style.css" />
    <script src="content.js" defer></script>
    <script src="model.js" defer></script>
    <script src="app.js" defer></script>
  </head>`;
}

function header(active) {
  const nav = NAV.map(([id, en, zh, href]) =>
    T("a", en, zh, `href="${href}"${id === active ? ' class="active" aria-current="page"' : ""}`),
  ).join("\n          ");
  return `    ${T("a", "Skip to content", "跳转到正文", 'href="#main" class="skip-link"')}
    <header class="site-header">
      <div class="container header-inner">
        <a href="index.html" class="brand" aria-label="MAI Lab home">MAI Lab</a>
        <nav class="main-nav" id="main-nav" aria-label="Main navigation">
          ${nav}
        </nav>
        <div class="header-tools">
          <button class="language-toggle" id="language-toggle" aria-label="Switch to Chinese"><span data-lang-label="en" class="active">EN</span><span aria-hidden="true">/</span><span data-lang-label="zh">中文</span></button>
          <div class="institution-logos">
            <a href="https://www.seu.edu.cn/" ${ext} aria-label="Southeast University"><img src="assets/identity/seu.png" alt="Southeast University / 东南大学" class="seu-logo" fetchpriority="high" decoding="async" /></a>
            <a href="https://palm.seu.edu.cn/" ${ext} aria-label="PALM Lab"><img src="assets/identity/palm.png" alt="PALM Lab" class="palm-logo" fetchpriority="high" decoding="async" /></a>
          </div>
          <button class="menu-toggle" id="menu-toggle" aria-expanded="false" aria-controls="main-nav" aria-label="Open navigation"><span></span><span></span></button>
        </div>
      </div>
    </header>`;
}

const footer = `    <footer class="site-footer">
      <div class="container footer-grid">
        <div>
          ${T("h2", "Visit & contact", "访问与联系")}
          ${T("p", "School of Computer Science and Engineering, Jiulonghu Campus", "东南大学九龙湖校区计算机科学与工程学院")}
          ${T("p", "2 Southeast University Road, Jiangning, Nanjing 211189, China", "南京市江宁区东南大学路 2 号 · 邮编 211189")}
          <a class="email-link" href="mailto:liufan@seu.edu.cn">liufan@seu.edu.cn</a>
        </div>
        <div class="footer-links">
          ${T("a", "PALM Lab ↗", "PALM 实验室 ↗", `href="https://palm.seu.edu.cn/" class="text-link" ${ext}`)}
          ${T("a", "School website ↗", "学院官网 ↗", `href="https://cs.seu.edu.cn/" class="text-link" ${ext}`)}
          ${T("a", "University website ↗", "学校官网 ↗", `href="https://www.seu.edu.cn/" class="text-link" ${ext}`)}
          ${T("a", "Prospective students →", "申请与交流 →", 'href="join.html" class="text-link"')}
        </div>
      </div>
      <div class="container footer-bottom">
        <p>© <span id="current-year">2026</span> MAI Lab</p>
        ${T("a", "Back to top ↑", "返回顶部 ↑", 'href="#"')}
      </div>
    </footer>
    <div class="toast" id="toast" role="status" aria-live="polite"></div>
    <dialog id="citation-dialog" aria-labelledby="citation-heading">
      <div class="dialog-heading">
        ${T("h2", "Citation", "引用信息", 'id="citation-heading"')}
        <button id="close-dialog" aria-label="Close">×</button>
      </div>
      <p id="citation-text"></p>
      <div class="dialog-actions">${T("button", "Copy citation", "复制引用", 'id="copy-citation" class="button"')}</div>
    </dialog>
  </body>
</html>
`;

const DESC = "Multimodal Autonomous Intelligence at PALM Lab, Southeast University. Research, projects, publications, people, and opportunities with Prof. Fan Liu.";
function page(file, { title, active, bodyPage, main }) {
  const html = `${head(title, DESC)}
  <body data-page="${bodyPage}">
${header(active)}
    <main id="main">
${main}
    </main>
${footer}`;
  fs.writeFileSync(path.join(out, file), html.replace(/[ \t]+$/gm, ""));
}

/* ---------- Shared blocks ---------- */
const pageHero = (h1, lead) => `      <section class="page-hero">
        <div class="container page-hero-inner">

          ${T("h1", ...h1, 'class="display"')}
          ${lead ? T("p", ...lead, 'class="lead"') : ""}
        </div>
      </section>`;

const pillars = `            <ul class="pillars">
${TOPICS.map((topic) => `              <li><a class="card" href="research.html#${topic.id}">${T("h3", topic.en, topic.zh, 'class="display"')}${T("p", ...topic.intro)}</a></li>`).join("\n")}
            </ul>`;

const joinCta = `      <section class="section cta-section">
        <div class="container">
          <div class="card join-cta">
            <div>

              ${T("h2", "Work with us", "与我们一起研究", 'class="display"')}
              ${T("p", "We welcome prospective graduate students, research interns, and postdoctoral researchers.", "欢迎有兴趣的硕士生、博士生、科研实习生和博士后与我们交流。", 'class="lead"')}
            </div>
            <div class="hero-actions">
              ${T("a", "Opportunities →", "申请信息 →", 'href="join.html" class="button"')}
              <a href="mailto:liufan@seu.edu.cn" class="button secondary">liufan@seu.edu.cn</a>
            </div>
          </div>
        </div>
      </section>`;

/* ---------- Home ---------- */
// Curated major research outcomes only; personnel changes and routine service are excluded.
const NEWS = [
  ["2026-10", "Oct 2026", "Our team wins first place in the MetaFine Open Competition at CoRL 2026.", "团队获 CoRL 2026 MetaFine 公开赛第一名。", ["Project →", "所属项目 →", "project.html?id=embodied-intelligence"]],
  ["2026-08", "Aug 2026", "NMVM is published at KDD 2026.", "NMVM 发表于 KDD 2026。", ["Paper ↗", "论文 ↗", "https://doi.org/10.1145/3770855.3817827", true]],
  ["2026-07", "Jul 2026", "MM-ContextFold and FIG are accepted as Oral presentations at ACM MM 2026.", "MM-ContextFold 与 FIG 被 ACM MM 2026 录用为 Oral。", ["Project →", "所属项目 →", "project.html?id=autonomous-agents"]],
  ["2025-07", "Jul 2025", "CoRe-MMRAG is published in the ACL 2025 main conference proceedings.", "CoRe-MMRAG 发表于 ACL 2025 主会。", ["Project →", "所属项目 →", "project.html?id=multimodal-models"]],
];
const news = NEWS.filter(([date]) => MODEL.isRecentNews(date)).map(
  ([dt, label, en, zh, [len, lzh, href, isExt]]) => `          <article>
            ${T("time", label, dt.replace("-", " 年 ").replace(/ 0?(\d+)$/, " $1 月"), `datetime="${dt}"`)}
            <p>${T("span", en, zh)} ${T("a", len, lzh, `href="${href}" class="inline-link"${isExt ? " " + ext : ""}`)}</p>
          </article>`,
).join("\n");

const preview = MEMBERS.filter((m) => m.role !== "Alumni")
  .map((m) => {
    const label = ROLE_LABEL[m.role];
    const sub = m.intake ? [`${label[0]} · incoming ${m.intake}`, `${m.intake} 级${label[1]}（待入学）`] : label;
    return `          <a href="people.html#${m.id}" class="person-preview">
            ${m.photo ? `<img src="${m.photo}" alt="${m.en}" loading="lazy" decoding="async" />` : `<span class="mini-placeholder" aria-hidden="true">${initials(m.en)}</span>`}
            ${T("h3", m.en, m.zh)}
            ${T("p", ...sub)}
          </a>`;
  })
  .join("\n");

page("index.html", {
  title: "Multimodal Autonomous Intelligence · MAI Lab",
  active: "index",
  bodyPage: "index",
  main: `      <section class="hero">
        <div class="container hero-inner">
          ${T("h1", "Multimodal Autonomous Intelligence", "多模态自主智能", 'class="display"')}
          <p class="hero-lead">${T("span", "A research group at PALM Lab, Southeast University, led by", "东南大学 PALM 实验室课题组，由")} ${T("a", "Prof. Fan Liu", "刘帆教授", 'href="people.html#fan-liu"')}${T("span", ", studying how intelligent systems perceive, reason and decide in complex, open environments.", "负责，研究智能系统如何在复杂开放环境中感知、推理与决策。")}</p>
          <div class="hero-actions">
            ${T("a", "Projects →", "研究项目 →", 'href="projects.html" class="button"')}
            ${T("a", "Publications", "研究成果", 'href="publications.html" class="button secondary"')}
          </div>
${pillars}
        </div>
      </section>
      <section class="section" id="projects">
        <div class="container">
          <div class="section-head">
            <div>

              ${T("h2", "Selected projects", "代表项目", 'class="display"')}
            </div>
            ${T("a", "All projects →", "全部项目 →", 'href="projects.html" class="text-link"')}
          </div>
          <div class="card-grid three" id="featured-projects" data-limit="3"></div>
        </div>
      </section>
      <section class="section alt" id="news"${news ? "" : " hidden"}>
        <div class="container news-grid">
          <div class="section-head">
            <div>

              ${T("h2", "Latest news", "最新动态", 'class="display"')}
            </div>
          </div>
          <div class="card news-list">
${news}
          </div>
        </div>
      </section>
      <section class="section" id="people">
        <div class="container">
          <div class="section-head">
            <div>

              ${T("h2", "The group", "团队成员", 'class="display"')}
            </div>
            ${T("a", "Meet everyone →", "查看团队 →", 'href="people.html" class="text-link"')}
          </div>
          <div class="people-preview">
${preview}
          </div>
        </div>
      </section>
${joinCta}`,
});

/* ---------- Research ---------- */
// Direction names, descriptions, figures and selected papers share the same records.
const areas = TOPICS.map((topic) => {
  const paper = paperById(topic.figure.paper);
  const project = MODEL.projectOfPaper(paper.id, CONTENT);
  return `        <section class="area" id="${topic.id}">
          <span id="${topic.alias}" class="anchor-alias"></span>
          ${topic.id === "perception" ? '<span id="applications" class="anchor-alias"></span>' : ""}
          <div class="area-text">
            ${T("h2", topic.en, topic.zh, 'class="display"')}
            ${T("p", ...topic.question, 'class="area-question"')}
            ${T("p", ...topic.description)}
            ${T("p", ...topic.focus, 'class="area-focus"')}
            ${T("h3", "Related projects", "相关项目", 'class="minor-heading"')}
            <ul class="plain-list" data-layer-projects="${topic.id}"></ul>
            ${T("a", "All publications in this direction →", "该方向全部成果 →", `href="publications.html#${topic.id}" class="text-link"`)}
          </div>
          <div class="area-results">
            <figure class="card area-figure">
              <a class="frame" href="project.html?id=${project.id}" aria-label="${esc(paper.short)}"><img src="${topic.figure.src}" alt="${esc(topic.figure.caption[0])}" loading="lazy" decoding="async" /></a>
              ${T("figcaption", ...topic.figure.caption)}
            </figure>
            ${T("h3", "Selected publications", "代表成果", 'class="minor-heading"')}
            <ol class="pub-list" data-featured-papers="${topic.id}"></ol>
          </div>
        </section>`;
}).join("\n");

// Publication milestones, not inferred starting dates for the research directions.
const timeline = [["dmrl"], ["sgfd"], ["hoi-lvlm", "core"], ["contextfold", "fig", "metafine"]].map((ids) => {
  const works = ids.map(paperById);
  return `<li class="card"><span class="milestone-year">${works[0].year}</span>${works.map((paper) => `<p><a href="${paper.paper}" ${ext}>${esc(paper.short)}</a></p>`).join("")}</li>`;
}).join("\n");
const researchSteps = `          <ol class="steps">
${TOPICS.map((topic) => `            <li><a class="card" href="#${topic.id}">${T("h3", topic.en, topic.zh, 'class="display"')}${T("p", ...topic.intro)}</a></li>`).join("\n")}
          </ol>`;

page("research.html", {
  title: "Research · MAI Lab",
  active: "research",
  bodyPage: "research",
  main: `${pageHero(["Research", "研究方向"], ["Our research is organized around three connected directions: perception and understanding, semantic reasoning, and autonomous decision-making.", "我们的研究围绕三个相互支撑的方向展开：感知与理解、语义推理、自主决策。"])}
      <section class="section">
        <div class="container">
          <div class="section-head">
            <div>

              ${T("h2", "From perception to autonomous decisions", "从感知到自主决策", 'class="display"')}
            </div>
          </div>
${researchSteps}
          <div class="framework-meta">
            <p class="loop"><span aria-hidden="true">↺</span> ${T("span", "Actions bring back new observations, and the loop starts again.", "行动带回新的观察，循环再次开始。")}</p>
            <dl><div>${T("dt", "Methods", "方法")}${T("dd", "Multimodal learning · Language models · Agent learning", "多模态学习 · 语言模型 · 智能体学习")}</div></dl>
            <dl><div>${T("dt", "Applications", "应用")}${T("dd", "Retrieval & recommendation · Robot manipulation", "信息检索与推荐 · 机器人操作")}</div></dl>
          </div>
          ${T("p", "These directions inform one another: representations support reasoning, reasoning guides decisions, and actions provide new observations. Individual projects may address one direction or connect several.", "表征为推理提供基础，推理为决策提供依据，行动带来新的观察。具体项目可以聚焦其中一个问题，也可以连接多个方向。", 'class="framework-note"')}
        </div>
      </section>
      <section class="section alt">
        <div class="container">
          <div class="section-head">
            <div>

              ${T("h2", "Selected milestones", "代表成果进展", 'class="display"')}
            </div>
          </div>
          <ol class="timeline">
${timeline}
          </ol>
        </div>
      </section>
      <div class="container">
${areas}
      </div>`,
});

/* ---------- Projects ---------- */
// Frontier topics the group follows and wants to explore; not yet projects with papers.
const MORE_DIRECTIONS = [
  ["AI for Science", "科研智能", "Agents that read the literature, form hypotheses and run analyses, assisting scientific discovery and everyday research.", "能阅读文献、提出假设、开展分析的智能体，辅助科学发现与日常科研。"],
  ["Agentic reinforcement learning", "智能体强化学习", "Training agents with reinforcement learning to plan, call tools and learn from feedback over long tasks.", "用强化学习训练智能体在长程任务中规划、调用工具，并从反馈中学习。"],
  ["Multimodal reasoning", "多模态推理", "Step-by-step reasoning over images, video and diagrams, including thinking with images.", "在图像、视频与图表上逐步推理，包括「用图像思考」。"],
  ["Unified understanding and generation", "理解与生成统一", "One model that both understands and generates images, video and text, and keeps what it generates true to fact.", "同一个模型既能理解也能生成图像、视频与文本，并让生成内容符合事实。"],
  ["World models", "世界模型", "Models that predict how the world changes under actions, for planning, simulation and embodied agents.", "预测世界在行动下如何变化的模型，用于规划、仿真与具身智能体。"],
  ["Self-evolving agents", "自我进化的智能体", "Agents that accumulate memory, skills and experience, and keep improving after deployment.", "能积累记忆、技能与经验，并在部署后持续改进的智能体。"],
];
const EXPLORATORY_TOPICS = [["reasoning", "decision"], ["decision"], ["reasoning"], ["perception", "reasoning"], ["perception", "decision"], ["decision"]];
const moreDirections = MORE_DIRECTIONS.map(
  ([en, zh, pen, pzh], index) => `            <li class="card">
              <p class="card-tags">${EXPLORATORY_TOPICS[index].map((id) => { const topic = TOPICS.find((item) => item.id === id); return T("a", topic.en, topic.zh, `href="research.html#${id}"`); }).join(" · ")}</p>
              ${T("h3", en, zh)}
              ${T("p", pen, pzh)}
            </li>`,
).join("\n");
page("projects.html", {
  title: "Projects · MAI Lab",
  active: "projects",
  bodyPage: "projects",
  main: `${pageHero(["Projects", "研究项目"], ["Our projects address specific problems within the three research directions. Each project brings together related topics, publications, code, data and participating members.", "研究项目围绕三个方向中的具体问题展开。每个项目汇集相关课题、论文、代码、数据与参与成员，并标明所属研究方向。"])}
      <section class="section">
        <div class="container">
          <div class="card-grid two" id="project-list"></div>
        </div>
      </section>
      <section class="section alt" id="more-directions">
        <div class="container">
          <div class="section-head"><div>${T("h2", "Exploratory topics", "探索课题", 'class="display"')}${T("p", "Within the same three directions, we are interested in the following topics. These are exploratory interests rather than completed results; we welcome students who would like to investigate them.", "以下课题仍围绕上述三个研究方向展开，属于希望探索的问题。欢迎有兴趣的同学与我们讨论具体研究计划。", 'class="lead"')}</div></div>
          <ul class="direction-grid">
${moreDirections}
          </ul>
          <p class="directions-cta">${T("a", "Interested in one of these? Join us →", "对这些方向感兴趣？欢迎加入我们 →", 'href="join.html" class="text-link"')}</p>
        </div>
      </section>
      <section class="section">
        <div class="container funding-note">
          <div>

            ${T("h2", "Funded research", "科研项目", 'class="display"')}
          </div>
          ${T("p", "Prof. Fan Liu leads research projects funded by the National Natural Science Foundation of China and by major provincial science and technology programs.", "刘帆教授主持国家自然科学基金、省科技重大专项课题等科研项目。")}
        </div>
      </section>`,
});

/* ---------- Project detail ---------- */
page("project.html", {
  title: "Project · MAI Lab",
  active: "projects",
  bodyPage: "project",
  main: `      <div class="container"><div id="project-content"></div></div>`,
});

/* ---------- Publications ---------- */
page("publications.html", {
  title: "Publications · MAI Lab",
  active: "publications",
  bodyPage: "publications",
  main: `${pageHero(["Publications", "研究成果"], ["Selected work by Prof. Fan Liu, together with publications co-authored with current group members. Browse by research direction or year; group members and alumni are highlighted in the author lists.", "展示刘帆教授的代表工作，以及与在读成员共同署名的成果。可按研究方向或年份浏览，作者列表突出显示课题组成员与已毕业成员。"])}
      <div class="container">
      <div class="pub-toolbar">
        <div class="view-switch" role="group" aria-label="Organize publications">
          ${T("button", "By direction", "按方向", 'data-view="topic" class="active" aria-pressed="true"')}
          ${T("button", "By year", "按年份", 'data-view="year" aria-pressed="false"')}
        </div>
        <label class="search-label">
          ${T("span", "Search publications", "搜索成果", 'class="sr-only"')}
          <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 5 5" /></svg>
          <input id="publication-search" type="search" placeholder="Search title, author, venue or year" aria-label="Search publications" />
        </label>
        <span id="publication-count" class="result-count" aria-live="polite"></span>
      </div>
      <nav id="pub-index" class="pub-index" aria-label="Jump to section"></nav>
      <div id="publication-list" class="publication-list"></div>
      <div id="empty-state" class="empty-state" hidden>
        ${T("h2", "No matching publications", "没有匹配的成果")}
        ${T("p", "Try another title, author, venue or year.", "试试其他标题、作者、会议或年份。")}
        ${T("button", "Clear search", "清除搜索", 'id="reset-filters" class="button secondary"')}
      </div>
      <p class="publication-note">
        ${T("span", "Representative works are selected from publications since 2022 with Prof. Fan Liu as first or corresponding author. Joint works with current members are included regardless of his author position; reports and books are labeled separately. For his full record, see", "导师代表作从 2022 年以来刘帆教授为第一作者或通讯作者的成果中选取；与在读成员共同署名的工作不受作者排序限制。技术报告与专著单独标注。完整记录请见")}
        ${T("a", "his homepage ↗", "个人主页 ↗", `href="https://liufancs.github.io/" class="inline-link" ${ext}`)}
        ${T("span", "and", "和")}
        <a href="https://orcid.org/0000-0002-4547-3982" class="inline-link" ${ext}>ORCID ↗</a>
      </p>
      </div>`,
});

/* ---------- People ---------- */
// Cards show member details and explicit external affiliations; alumni show their current position.
const personCard = (m) => {
  const year = yearLine(m);
  const now = m.role === "Alumni" ? m.now : m.institution && m.institution[0] !== "Southeast University" ? m.institution : null;
  // Undergraduates and interns show no placeholder line when they have nothing yet.
  const empty = m.role !== "Intern" && m.role !== "Undergrad" && !m.interests && !Object.keys(m.links || {}).length;
  const lines = [
    m.zh === m.en ? "" : T("p", m.zh, m.en, 'class="person-other-name"'),
    year ? T("p", ...year, 'class="person-year"') : "",
    now ? T("p", ...now, 'class="person-institution"') : "",
    m.interests && m.role !== "Alumni" ? T("p", ...m.interests, 'class="person-interests"') : "",
    empty ? T("p", "Details to be added", "资料待补充", 'class="person-interests"') : "",
    iconLinks(m.links),
  ].filter(Boolean);
  return `          <article class="card person-card" id="${m.id}">
            ${m.photo ? `<img src="${m.photo}" alt="${m.en}" class="portrait" loading="lazy" decoding="async" />` : `<div class="portrait name-placeholder" role="img" aria-label="${m.en}"><span>${initials(m.en)}</span></div>`}
            <div class="person-info">
              ${T("h3", m.en, m.zh)}
              ${lines.join("\n              ")}
            </div>
          </article>`;
};

const HONORS = [
  ["ACM China SIGMM Doctoral Dissertation Award", "ACM China SIGMM 优秀博士论文奖"],
  ["1st Place, MetaFine Open Competition, CoRL 2026", "CoRL 2026 MetaFine 公开赛第一名"],
  ["1st Place, CVPR 2026 DataMFM Challenge", "CVPR 2026 DataMFM Challenge 第一名"],
  ["1st Place, SIGIR 2026 eCommerce Data Challenge", "SIGIR 2026 eCommerce Data Challenge 第一名"],
  ["1st Place, ECCV 2024 Corner Case Scene Generation Challenge", "ECCV 2024 Corner Case Scene Generation Challenge 第一名"],
  ["Outstanding Reviewer, ACM WSDM and IEEE TMM", "ACM WSDM、IEEE TMM 杰出审稿人"],
];

page("people.html", {
  title: "People · MAI Lab",
  active: "people",
  bodyPage: "people",
  main: `${pageHero(["People", "团队"], ["Meet the people behind our research.", "认识参与这些研究的老师与同学。"])}
      <div class="container">
      <section class="people-section">
        <div class="section-head"><div>${T("h2", "Group lead", "课题组负责人", 'class="display"')}</div></div>
        <article class="card faculty-profile" id="fan-liu">
          <img src="assets/fan-liu-official.png" alt="Fan Liu / 刘帆" class="faculty-portrait" loading="lazy" decoding="async" />
          <div>
            <div class="name-line">
              ${T("h3", "Fan Liu", "刘帆")}
              ${T("span", "刘帆", "Fan Liu")}
            </div>
            ${T("p", "Professor · Group lead", "教授 · 课题组负责人", 'class="faculty-role"')}
            <div class="faculty-bio">
              ${T("p", "Fan Liu is a Professor and Young Chief Professor at Southeast University, with appointments in the School of Computer Science and Engineering, the School of Software and the School of Artificial Intelligence, and a doctoral supervisor. He has been selected for a national high-level young talent program and was named among the world's top 2% scientists in 2026. He received his PhD from Shandong University and was a research fellow at the National University of Singapore.", "刘帆，东南大学计算机科学与工程学院、软件学院、人工智能学院教授，青年首席教授，国家级高层次青年人才，博士生导师，入选 2026 年全球前 2% 顶尖科学家榜。博士毕业于山东大学，曾任新加坡国立大学研究员。")}
              ${T("p", "His research focuses on perception and understanding, semantic reasoning, and autonomous decision-making in complex, open environments. He has published more than 40 papers in CCF-A conferences and IEEE/ACM Transactions, and two monographs as first author.", "研究聚焦复杂开放环境中的感知与理解、语义推理和自主决策。在 CCF-A 类国际会议及 IEEE/ACM 汇刊等高水平期刊和会议发表论文 40 余篇，出版第一作者学术专著 2 部。")}
            </div>
            <div class="faculty-facts">
              <div>
                ${T("h4", "Selected honors", "主要荣誉")}
                <ul>
                  ${HONORS.map(([en, zh]) => T("li", en, zh)).join("\n                  ")}
                </ul>
              </div>
              <div>
                ${T("h4", "Service", "学术服务")}
                ${T("p", "Area Chair or Senior Program Committee member for ACM MM and other leading conferences; Guest Editor for ACM Transactions.", "多次担任 ACM MM 等国际顶级学术会议领域主席或资深程序委员会委员，担任 ACM 汇刊客座编辑。")}
              </div>
            </div>
            ${iconLinks(MEMBERS.find((m) => m.id === "fan-liu").links)}
          </div>
        </article>
      </section>
      <section class="people-section" id="phd">
        <div class="section-head"><div>${T("h2", "PhD students", "博士生", 'class="display"')}</div></div>
        <div class="people-grid">
${byRole("PhD").map(personCard).join("\n")}
        </div>
      </section>
      <section class="people-section" id="masters">
        <div class="section-head"><div>${T("h2", "Master’s students", "硕士生", 'class="display"')}</div></div>
        <div class="people-grid">
${byRole("Master").map(personCard).join("\n")}
        </div>
      </section>
      <section class="people-section" id="undergraduates">
        <div class="section-head"><div>${T("h2", "Undergraduate students", "本科生", 'class="display"')}</div></div>
        <div class="people-grid">
${byRole("Undergrad").map(personCard).join("\n")}
        </div>
      </section>
      <section class="people-section" id="interns">
        <div class="section-head"><div>${T("h2", "Research interns", "科研实习生", 'class="display"')}</div></div>
        <div class="people-grid">
${byRole("Intern").map(personCard).join("\n")}
        </div>
      </section>
      <section class="people-section" id="alumni">
        <div class="section-head"><div>${T("h2", "Alumni", "已毕业成员", 'class="display"')}</div></div>
        <div class="people-grid">
${byRole("Alumni").map(personCard).join("\n")}
        </div>
      </section>
      </div>`,
});

/* ---------- Join ---------- */
const LOOK_FOR = [
  ["Working knowledge of at least one programming language", "至少熟悉一门编程语言"],
  ["Sustained enthusiasm and self-motivation for research", "具有持续的科研热情与自驱力"],
  ["A solid foundation in English and mathematics", "具备扎实的英语和数学基础"],
];
page("join.html", {
  title: "Join us · MAI Lab",
  active: "join",
  bodyPage: "join",
  main: `${pageHero(["Join us", "加入我们"], ["If our research interests overlap with yours, we would be glad to hear from you. Our research framework and projects show what you would work on.", "如果你对我们的研究方向感兴趣，欢迎与我们交流。研究框架和研究项目两页介绍了你将参与的工作。"])}
      <div class="container">
      <div class="join-layout">
        <div class="opportunities">
          <article class="card opportunity">
            ${T("h2", "Graduate students", "硕士生与博士生")}
            ${T("p", "We are recruiting master's students and 2–3 PhD students for 2027 admission. Students from computer science, software engineering, artificial intelligence, automation, mathematics, statistics and related fields are welcome. Current openings are listed in the official faculty notice.", "拟招收 2027 年入学的硕士研究生若干名及博士研究生 2–3 名。欢迎计算机、软件、人工智能、自动化、数学和统计等相关专业的同学报考。具体名额以教师主页的最新招生信息为准。")}
          </article>
          <article class="card opportunity">
            ${T("h2", "Research interns", "科研实习生")}
            ${T("p", "We welcome undergraduate students to join our research year-round. Tell us about your interests and the time you can commit.", "长期接收本科生参与科研实习。来信可以介绍研究兴趣，以及能够投入科研的时间。")}
          </article>
          <article class="card opportunity">
            ${T("h2", "Postdoctoral researchers", "博士后")}
            ${T("p", "Applicants with related research experience are welcome. Please include a CV, representative publications, and a brief research plan.", "欢迎具有相关研究经历的申请者联系。请提供个人简历、代表性论文及简要研究计划。")}
          </article>
          <article class="card opportunity">
            ${T("h2", "What we look for", "我们希望你具备")}
            <ol>
              ${LOOK_FOR.map(([en, zh]) => T("li", en, zh)).join("\n              ")}
            </ol>
          </article>
        </div>
        <aside class="card contact-panel">
          ${T("h2", "Start a conversation", "联系我们")}
          ${T("p", "Send a short introduction, your CV, and the research questions you are interested in.", "请简要介绍自己，附上个人简历，并说明感兴趣的研究问题。")}
          <a class="contact-email" href="mailto:liufan@seu.edu.cn">liufan@seu.edu.cn</a>
          ${T("button", "Copy email address", "复制邮箱", 'id="copy-email" class="copy-button"')}
          <hr />
          ${T("h3", "Official information", "官方信息")}
          ${T("a", "Current faculty notice ↗", "教师主页招生信息 ↗", `href="https://cs.seu.edu.cn/liufan/main.htm" class="text-link" ${ext}`)}
          ${T("a", "PALM admission guide ↗", "PALM 实验室申请指南 ↗", `href="https://palm.seu.edu.cn/application.html" class="text-link" ${ext}`)}
          ${T("a", "PALM application portal ↗", "PALM 实验室申请入口 ↗", `href="https://palmlab.cn/" class="text-link" ${ext}`)}
          ${T("p", "Graduate admission follows the official university and laboratory procedures.", "研究生录取遵循学校与实验室的正式流程。", 'class="contact-note"')}
        </aside>
      </div>
      <section class="card visit-section">
        <img src="assets/campus-library.jpg" alt="Li Wenzheng Library, Jiulonghu Campus" loading="lazy" decoding="async" />
        <div>
          ${T("h2", "At Southeast University", "在东南大学")}
          ${T("p", "Our group is based at the School of Computer Science and Engineering on the Jiulonghu Campus in Nanjing.", "课题组位于南京东南大学九龙湖校区计算机科学与工程学院。")}
          ${T("a", "Li Wenzheng Library · Explore the campus ↗", "李文正图书馆 · 了解校园 ↗", `href="https://seuaa.seu.edu.cn/2023/1228/c51495a477424/page.psp" class="text-link" ${ext}`)}
        </div>
      </section>
      </div>`,
});

console.log("pages written to", out);

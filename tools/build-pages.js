// Writes the static HTML pages of the MAI Group site from content.js.
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
const PROJECTS = window.MAI_CONTENT.projects;
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
  m.role === "Alumni" ? null : m.intake ? [String(m.intake), String(m.intake)] : m.since ? [String(m.since), String(m.since)] : null;
const ROLE_LABEL = { Faculty: ["Faculty", "教师"], PhD: ["PhD student", "博士生"], Master: ["Master's student", "硕士生"], Undergrad: ["Undergraduate", "本科生"], Intern: ["Research intern", "科研实习生"] };

const NAV = [
  ["index", "Home", "首页", "index.html"],
  ["research", "Research", "研究方向", "research.html"],
  ["projects", "Projects", "研究项目", "projects.html"],
  ["publications", "Publications", "论文", "publications.html"],
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
        <a href="index.html" class="brand" aria-label="MAI Group home">MAI Group<span class="brand-dot" aria-hidden="true">.</span></a>
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
        <p>© <span id="current-year">2026</span> MAI Group</p>
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
  fs.writeFileSync(path.join(out, file), html);
}

/* ---------- Shared blocks ---------- */
const pageHero = (h1, lead) => `      <section class="page-hero">
        <div class="container page-hero-inner">
          ${T("p", "MAI Group", "MAI 课题组", 'class="eyebrow"')}
          ${T("h1", ...h1, 'class="display"')}
          ${lead ? T("p", ...lead, 'class="lead"') : ""}
        </div>
      </section>`;

const STEPS = [
  { id: "perception", step: "01", verb: ["Perceive", "感知理解"], problem: ["Perception & understanding", "感知理解"], dir: ["Multimodal understanding", "多模态理解"], q: ["Represent images, video, text and behavior.", "表征图像、视频、文本与行为。"] },
  { id: "reasoning", step: "02", verb: ["Reason", "语义推理"], problem: ["Semantic reasoning", "语义推理"], dir: ["Foundation models", "基础模型"], q: ["Reason with internal and retrieved knowledge.", "基于内部知识与检索知识推理。"] },
  { id: "decision", step: "03", verb: ["Decide", "自主决策"], problem: ["Autonomous decision-making", "自主决策"], dir: ["Autonomous intelligence", "自主智能"], q: ["Plan, search, use tools and act.", "规划、检索、调用工具并行动。"] },
];
const pillars = `            <ul class="pillars">
${STEPS.map((s) => `              <li><a class="card" href="research.html#${s.id}">${T("h3", ...s.verb, 'class="display"')}${T("p", `${s.step} · ${s.dir[0]} ↗`, `${s.step} · ${s.dir[1]} ↗`)}</a></li>`).join("\n")}
            </ul>`;

const joinCta = `      <section class="section cta-section">
        <div class="container">
          <div class="card join-cta">
            <div>
              ${T("p", "Join us", "加入我们", 'class="eyebrow"')}
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
const NEWS = [
  ["2026-10", "Oct 2026", "The group (team MAI) wins first place in the MetaFine Open Competition at the RoboFineMani Workshop, CoRL 2026; the technical report is on arXiv.", "团队（MAI）获 CoRL 2026 RoboFineMani Workshop MetaFine 公开赛第一名，技术报告已发布于 arXiv。", ["Project →", "所属项目 →", "project.html?id=embodied-intelligence"]],
  ["2026-10", "Oct 2026", "Yueqing Xing, Yukai Wu and Zhiyu Zeng join as master's students of the 2027 intake; undergraduate students Yixuan Zhang, Xintong Lu, Xinyi Li and Haoran Jing and research interns Wenxiang Sun (Nanjing Agricultural University) and Bingzong Liu (Xidian University) join the group.", "邢越卿、吴钰恺、曾沚玉作为 2027 级硕士生加入；本科生张奕轩、卢欣童、李欣怡、景浩然，科研实习生孙文翔（南京农业大学）、刘秉宗（西安电子科技大学）加入课题组。", ["People →", "查看团队 →", "people.html#masters"]],
  ["2026-08", "Aug 2026", "Yang Tian receives a Student Travel Award for ACM MM 2026.", "田阳获 ACM MM 2026 学生旅行资助。", ["Source ↗", "来源 ↗", "https://tyangjn.github.io/", true]],
  ["2026-08", "Aug 2026", "NMVM, co-authored by Enhao Cheng, appears at KDD 2026.", "程恩浩与合作者的 NMVM 发表于 KDD 2026。", ["Project →", "所属项目 →", "project.html?id=multimodal-models"]],
  ["2026-07", "Jul 2026", "MM-ContextFold and FIG are accepted as Oral presentations at ACM MM 2026.", "MM-ContextFold 与 FIG 被 ACM MM 2026 录用为 Oral。", ["Project →", "所属项目 →", "project.html?id=autonomous-agents"]],
  ["2026-07", "Jul 2026", "The ACM TOMM special issue on multimodal video understanding and analysis with foundation models, co-edited by Prof. Fan Liu, is published.", "刘帆教授参与客座编辑的 ACM TOMM 专刊（基础模型驱动的多模态视频理解与分析）出版。", ["Source ↗", "来源 ↗", "https://doi.org/10.1145/3801571", true]],
  ["2025-07", "Jul 2025", "CoRe-MMRAG appears in the ACL 2025 main conference proceedings.", "CoRe-MMRAG 发表于 ACL 2025 主会。", ["Project →", "所属项目 →", "project.html?id=multimodal-models"]],
];
const news = NEWS.map(
  ([dt, label, en, zh, [len, lzh, href, isExt]]) => `          <article>
            ${T("time", label, dt.replace("-", " 年 ").replace(/ 0?(\d+)$/, " $1 月"), `datetime="${dt}"`)}
            <p>${T("span", en, zh)} ${T("a", len, lzh, `href="${href}" class="inline-link"${isExt ? " " + ext : ""}`)}</p>
          </article>`,
).join("\n");

const preview = MEMBERS.filter((m) => m.role !== "Alumni")
  .map((m) => {
    const label = ROLE_LABEL[m.role];
    const sub = m.intake ? [`${label[0]} · ${m.intake}`, `${m.intake} 级${label[1]}`] : label;
    return `          <a href="people.html#${m.id}" class="person-preview">
            ${m.photo ? `<img src="${m.photo}" alt="${m.en}" loading="lazy" decoding="async" />` : `<span class="mini-placeholder" aria-hidden="true">${initials(m.en)}</span>`}
            ${T("h3", m.en, m.zh)}
            ${T("p", ...sub)}
          </a>`;
  })
  .join("\n");

page("index.html", {
  title: "Multimodal Autonomous Intelligence · MAI Group",
  active: "index",
  bodyPage: "index",
  main: `      <section class="hero">
        <div class="container hero-inner">
          ${T("p", "MAI Group · Southeast University", "MAI 课题组 · 东南大学", 'class="pill"')}
          ${T("h1", "Multimodal Autonomous Intelligence", "多模态自主智能", 'class="display"')}
          <p class="hero-lead">${T("span", "A research group at PALM Lab, Southeast University, led by", "东南大学 PALM 实验室课题组，由")} ${T("a", "Prof. Fan Liu", "刘帆教授", 'href="people.html#fan-liu"')}${T("span", ", studying how intelligent systems perceive, reason and decide in complex, open environments.", "负责，研究智能系统如何在复杂开放环境中感知、推理与决策。")}</p>
          <blockquote class="hero-quote">
            ${T("p", "Perceive the world, reason with knowledge, act on one’s own.", "感知世界，依据知识推理，自主决策与行动。")}
            ${T("span", "— Our research framework", "— 我们的研究框架")}
          </blockquote>
          <div class="hero-actions">
            ${T("a", "Projects →", "研究项目 →", 'href="projects.html" class="button"')}
            ${T("a", "Publications", "论文", 'href="publications.html" class="button secondary"')}
          </div>
${pillars}
        </div>
      </section>
      <section class="section" id="projects">
        <div class="container">
          <div class="section-head">
            <div>
              ${T("p", "Projects", "研究项目", 'class="eyebrow"')}
              ${T("h2", "Selected projects", "代表项目", 'class="display"')}
            </div>
            ${T("a", "All projects →", "全部项目 →", 'href="projects.html" class="text-link"')}
          </div>
          <div class="card-grid three" id="featured-projects" data-limit="3"></div>
        </div>
      </section>
      <section class="section alt" id="news">
        <div class="container news-grid">
          <div class="section-head">
            <div>
              ${T("p", "News", "动态", 'class="eyebrow"')}
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
              ${T("p", "People", "团队", 'class="eyebrow"')}
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
const AREAS = [
  {
    id: "perception",
    alias: "multimodal",
    label: ["01 · Perception & understanding", "01 · 感知理解"],
    title: ["Multimodal understanding", "多模态理解"],
    question: ["How can a system turn images, video, text and behavior into representations it can use?", "如何把图像、视频、文本与行为信号转化为系统可用的表征？"],
    text: [
      "We learn from images, video, text and user behavior: fusing and disentangling modalities, distilling the useful parts, and staying robust when a modality is missing or labels are noisy. Much of this work began in multimodal recommendation, and it now extends to visual commonsense reasoning, video question answering, and human–object interaction detection with large vision-language models.",
      "我们从图像、视频、文本与用户行为中学习：多模态的融合与解耦、有用信息的提炼，以及模态缺失、标签噪声下的稳健性。这部分工作起步于多模态推荐，现已延伸到视觉常识推理、视频问答，以及借助视觉-语言大模型的人物交互检测。",
    ],
    focus: ["Multimodal representation · Disentanglement and fusion · Visual reasoning", "多模态表征 · 解耦与融合 · 视觉推理"],
  },
  {
    id: "reasoning",
    alias: "foundation",
    label: ["02 · Semantic reasoning", "02 · 语义推理"],
    title: ["Foundation models", "基础模型"],
    question: ["How can large models reason with knowledge they can trust, whether it is stored in their parameters or retrieved from outside?", "无论知识来自模型参数还是外部检索，大模型如何基于可信的知识进行推理？"],
    text: [
      "Large models know a lot, but not always the right thing. We study how a multimodal model should reconcile its internal knowledge with retrieved visual and textual evidence, and how the semantic knowledge of language models can be used to understand reviews and short texts.",
      "大模型掌握大量知识，但未必总是正确。我们研究多模态模型如何协调自身知识与检索到的视觉、文本证据，以及如何利用语言模型的语义知识理解评论与短文本。",
    ],
    focus: ["Multimodal RAG · Knowledge reconciliation · LLM-based semantic understanding", "多模态检索增强生成 · 知识协调 · 基于大模型的语义理解"],
  },
  {
    id: "decision",
    alias: "autonomous",
    label: ["03 · Autonomous decision-making", "03 · 自主决策"],
    title: ["Autonomous intelligence", "自主智能"],
    question: ["How can an agent plan, search, use tools and act over many steps without losing track of its goal?", "智能体如何在多步任务中规划、检索、调用工具并采取行动，而不偏离目标？"],
    text: [
      "Autonomy means running the whole loop on one's own: deciding what to look for, gathering evidence, and acting on it over many steps. Current work studies context management for multimodal agentic retrieval, evidence-grounded image generation, and memory and collaboration for agents. In embodied intelligence, our vision-language-action policies won first place in the MetaFine Open Competition at CoRL 2026.",
      "自主意味着独立完成整个循环：决定要找什么、收集证据，并据此在多步任务中采取行动。当前工作包括多模态智能体检索中的上下文管理、基于证据的图像生成，以及智能体的记忆与协作；在具身智能方面，团队的视觉-语言-动作策略获 CoRL 2026 MetaFine 公开赛第一名。",
    ],
    focus: ["Agentic retrieval · Memory · Multi-agent systems · Embodied manipulation", "智能体检索 · 记忆 · 多智能体 · 具身操作"],
  },
  {
    id: "applications",
    label: ["Applications", "应用"],
    title: ["Retrieval and recommendation", "检索与推荐"],
    question: ["Where do these capabilities meet real users and real problems?", "这些能力在哪里接受真实用户与真实问题的检验？"],
    text: [
      "Recommendation and retrieval are where the group's methods have been tested longest, on graph-structured interactions, multiple behavior types, cross-domain data and privacy-preserving data synthesis. Building on this, we aim to bring these capabilities to scientific discovery and research assistance.",
      "推荐与检索是团队方法长期检验的场景，涵盖图结构交互、多类型行为、跨域数据与隐私保护的数据合成。在此基础上，我们希望把这些能力推进到科学发现与科研辅助等领域。",
    ],
    focus: ["Graph recommendation · Multi-behavior recommendation · Cross-domain recommendation", "图推荐 · 多行为推荐 · 跨域推荐"],
  },
];
const AREA_FIGURES = {
  perception: ["assets/research/sgfd.jpg", "SGFD (ACM MM 2023)", "SGFD（ACM MM 2023）", "recommendation"],
  reasoning: ["assets/research/core-teaser.jpg", "CoRe-MMRAG (ACL 2025)", "CoRe-MMRAG（ACL 2025）", "multimodal-models"],
  decision: ["assets/research/fig.jpg", "ORIG and FIG-Eval (ACM MM 2026)", "ORIG 与 FIG-Eval（ACM MM 2026）", "autonomous-agents"],
  applications: ["assets/research/bipn.jpg", "BIPN (SIGIR 2024)", "BIPN（SIGIR 2024）", "recommendation"],
};
const areas = AREAS.map((a) => {
  const [img, cen, czh, pid] = AREA_FIGURES[a.id];
  return `        <section class="area" id="${a.id}">${a.alias ? `<span id="${a.alias}" class="anchor-alias"></span>` : ""}
          <div class="area-text">
            ${T("p", ...a.label, 'class="eyebrow"')}
            ${T("h2", ...a.title, 'class="display"')}
            ${T("p", ...a.question, 'class="area-question"')}
            ${T("p", ...a.text)}
            ${T("p", ...a.focus, 'class="area-focus"')}
            ${T("h3", "Projects", "相关项目", 'class="minor-heading"')}
            <ul class="plain-list" data-layer-projects="${a.id}"></ul>
            ${T("a", "Publications in this area →", "该方向论文 →", `href="publications.html#${a.id}" class="text-link"`)}
          </div>
          <figure class="card area-figure">
            <a class="frame" href="project.html?id=${pid}" tabindex="-1" aria-hidden="true"><img src="${img}" alt="" loading="lazy" decoding="async" /></a>
            ${T("figcaption", "Figure: " + cen, "图：" + czh)}
          </figure>
        </section>`;
}).join("\n");

const TIMELINE = [
  ["From 2019", "2019 年起", "Multimodal representation for recommendation", "面向推荐的多模态表征", "Learning what users prefer from images, text and behavior.", "从图像、文本与行为中理解用户偏好。", "MAML · DMRL · SGFD · AD-DRL"],
  ["From 2023", "2023 年起", "Foundation models and knowledge", "大模型与知识", "Reading user text with language models, and reconciling internal and retrieved knowledge.", "用语言模型理解用户文本，协调内部知识与检索知识。", "SAGCN · CoRe-MMRAG · NMVM"],
  ["From 2025", "2025 年起", "Autonomous agents", "自主智能体", "Agents that retrieve evidence, manage long context and ground what they produce in facts.", "能检索证据、管理长程上下文、让输出有据可依的智能体。", "MM-ContextFold · FIG"],
  ["From 2026", "2026 年起", "Embodied intelligence", "具身智能", "Robot policies that turn instructions and what they see into precise actions.", "把指令与所见转化为精确动作的机器人策略。", "MetaFine (1st place)"],
];
const timeline = TIMELINE.map(
  ([yen, yzh, ten, tzh, pen, pzh, works]) => `            <li class="card">
              ${T("span", yen, yzh, 'class="eyebrow"')}
              ${T("strong", ten, tzh)}
              ${T("p", pen, pzh)}
              <p class="timeline-works">${works}</p>
            </li>`,
).join("\n");

const researchSteps = `          <ol class="steps">
${STEPS.map((s) => `            <li><a class="card" href="#${s.id}">${T("span", `${s.step} · ${s.dir[0]}`, `${s.step} · ${s.dir[1]}`, 'class="eyebrow"')}${T("h3", ...s.problem, 'class="display"')}${T("p", ...s.q)}</a></li>`).join("\n")}
          </ol>`;

page("research.html", {
  title: "Research · MAI Group",
  active: "research",
  bodyPage: "research",
  main: `${pageHero(["Research", "研究方向"], ["We study autonomous intelligence for complex, open environments, organized around three linked problems: perceiving and understanding multimodal information, reasoning with knowledge, and making decisions autonomously.", "我们研究复杂开放环境中的自主智能，围绕三个前后衔接的关键问题展开：多模态信息的感知理解、基于知识的语义推理，以及自主决策。"])}
      <section class="section">
        <div class="container">
          <div class="section-head">
            <div>
              ${T("p", "Framework", "研究框架", 'class="eyebrow"')}
              ${T("h2", "From perception to autonomous decisions", "从感知到自主决策", 'class="display"')}
            </div>
          </div>
${researchSteps}
          <div class="framework-meta">
            <p class="loop"><span aria-hidden="true">↺</span> ${T("span", "Actions bring back new observations, and the loop starts again.", "行动带回新的观察，循环再次开始。")}</p>
            <dl><div>${T("dt", "Methods", "方法")}${T("dd", "Multimodal large models · Agents · Embodied intelligence", "多模态大模型 · 智能体 · 具身智能")}</div></dl>
            <dl><div>${T("dt", "Applications", "应用")}${T("dd", "Retrieval & recommendation · Scientific discovery & research assistance", "信息检索与推荐 · 科学发现与科研辅助")}</div></dl>
          </div>
          ${T("p", "Reasoning is only as reliable as the representations it starts from, and decisions are only as sound as the knowledge behind them. Once an agent acts, by searching, opening an image or reading a page, it brings back new observations and the loop starts again. Autonomy is the ability to run this loop on one's own.", "推理是否可靠，取决于感知得到的表征；决策是否合理，取决于背后的知识与推理。智能体一旦行动（检索、查看图像、阅读网页），又会带回新的观察，循环再次开始。所谓自主，就是能够独立完成这个循环。", 'class="framework-note"')}
        </div>
      </section>
      <section class="section alt">
        <div class="container">
          <div class="section-head">
            <div>
              ${T("p", "Timeline", "研究脉络", 'class="eyebrow"')}
              ${T("h2", "How our work has developed", "研究如何一步步走到这里", 'class="display"')}
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
const moreDirections = MORE_DIRECTIONS.map(
  ([en, zh, pen, pzh]) => `            <li class="card">
              ${T("h3", en, zh)}
              ${T("p", pen, pzh)}
            </li>`,
).join("\n");
page("projects.html", {
  title: "Projects · MAI Group",
  active: "projects",
  bodyPage: "projects",
  main: `${pageHero(["Projects", "研究项目"], ["Four long-running lines of research. Each brings together several directions with their papers, code and data, and the people working on them. The tags show where a project sits in our research framework.", "四条长期研究主线。每个项目包含若干子方向，列出相关论文、代码与数据，以及参与的成员。标签表示项目在研究框架中的位置。"])}
      <section class="section">
        <div class="container">
          <div class="card-grid two" id="project-list"></div>
        </div>
      </section>
      <section class="section alt" id="more-directions">
        <div class="container">
          <div class="section-head"><div>${T("p", "Frontier", "前沿", 'class="eyebrow"')}${T("h2", "More directions", "更多方向", 'class="display"')}${T("p", "Beyond the four projects, we follow these frontier topics closely and want to explore them. Students who would like to start something new in one of them are welcome.", "除以上四个项目外，我们也密切关注以下前沿方向，并希望开展探索。欢迎有兴趣的同学在这些方向上开启新的课题。", 'class="lead"')}</div></div>
          <ul class="direction-grid">
${moreDirections}
          </ul>
          <p class="directions-cta">${T("a", "Interested in one of these? Join us →", "对这些方向感兴趣？欢迎加入我们 →", 'href="join.html" class="text-link"')}</p>
        </div>
      </section>
      <section class="section">
        <div class="container funding-note">
          <div>
            ${T("p", "Funding", "经费", 'class="eyebrow"')}
            ${T("h2", "Funded research", "科研项目", 'class="display"')}
          </div>
          ${T("p", "Prof. Fan Liu leads research projects funded by the National Natural Science Foundation of China and by major provincial science and technology programs.", "刘帆教授主持国家自然科学基金、省科技重大专项课题等科研项目。")}
        </div>
      </section>`,
});

/* ---------- Project detail ---------- */
page("project.html", {
  title: "Project · MAI Group",
  active: "projects",
  bodyPage: "project",
  main: `      <div class="container"><div id="project-content"></div></div>`,
});

/* ---------- Publications ---------- */
page("publications.html", {
  title: "Publications · MAI Group",
  active: "publications",
  bodyPage: "publications",
  main: `${pageHero(["Publications", "论文"], ["Papers by Prof. Fan Liu and collaborators, by research topic or by year. Group members and alumni are shown in bold.", "刘帆教授与合作者的论文，可按研究主题或年份浏览。课题组成员与校友以粗体显示。"])}
      <div class="container">
      <div class="pub-toolbar">
        <div class="view-switch" role="group" aria-label="Organize publications">
          ${T("button", "By topic", "按主题", 'data-view="topic" class="active" aria-pressed="true"')}
          ${T("button", "By year", "按年份", 'data-view="year" aria-pressed="false"')}
        </div>
        <label class="search-label">
          ${T("span", "Search publications", "搜索论文", 'class="sr-only"')}
          <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 5 5" /></svg>
          <input id="publication-search" type="search" placeholder="Search title, author, venue or year" aria-label="Search publications" />
        </label>
        <span id="publication-count" class="result-count" aria-live="polite"></span>
      </div>
      <nav id="pub-index" class="pub-index" aria-label="Jump to section"></nav>
      <div id="publication-list" class="publication-list"></div>
      <div id="empty-state" class="empty-state" hidden>
        ${T("h2", "No matching papers", "没有匹配的论文")}
        ${T("p", "Try another title, author, venue or year.", "试试其他标题、作者、会议或年份。")}
        ${T("button", "Clear search", "清除搜索", 'id="reset-filters" class="button secondary"')}
      </div>
      <p class="publication-note">
        ${T("span", "This list covers papers with Prof. Fan Liu as an author. For the latest records, see", "本页收录刘帆教授署名的论文。最新记录请见")}
        ${T("a", "his homepage ↗", "个人主页 ↗", `href="https://liufancs.github.io/" class="inline-link" ${ext}`)}
        ${T("span", "and", "和")}
        <a href="https://orcid.org/0000-0002-4547-3982" class="inline-link" ${ext}>ORCID ↗</a>
      </p>
      </div>`,
});

/* ---------- People ---------- */
// A card shows only name, year, research interests and link icons; everyone is at Southeast University
// by default, so institution, notes and alumni degrees stay in content.js for the member folder. Alumni show only where they are now.
const personCard = (m) => {
  const year = yearLine(m);
  const now = m.role === "Alumni" ? m.now : null;
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
  title: "People · MAI Group",
  active: "people",
  bodyPage: "people",
  main: `${pageHero(["People", "团队"], ["Meet the people behind our research.", "认识参与这些研究的老师与同学。"])}
      <div class="container">
      <section class="people-section">
        <div class="section-head"><div>${T("p", "Faculty", "教师", 'class="eyebrow"')}${T("h2", "Group lead", "课题组负责人", 'class="display"')}</div></div>
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
              ${T("p", "His research covers multimodal understanding, foundation models and autonomous intelligence, focusing on perception and understanding, semantic reasoning and autonomous decision-making in complex, open environments. He has published more than 40 papers in CCF-A conferences and IEEE/ACM Transactions, and two monographs as first author.", "主要从事多模态理解、基础模型与自主智能研究，聚焦复杂开放环境中的感知理解、语义推理与自主决策等关键问题。在 CCF-A 类国际会议及 IEEE/ACM 汇刊等高水平期刊和会议发表论文 40 余篇，出版第一作者学术专著 2 部。")}
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
        <div class="section-head"><div>${T("p", "Students", "学生", 'class="eyebrow"')}${T("h2", "PhD students", "博士生", 'class="display"')}</div></div>
        <div class="people-grid">
${byRole("PhD").map(personCard).join("\n")}
        </div>
      </section>
      <section class="people-section" id="masters">
        <div class="section-head"><div>${T("p", "Students", "学生", 'class="eyebrow"')}${T("h2", "Master’s students", "硕士生", 'class="display"')}</div></div>
        <div class="people-grid">
${byRole("Master").map(personCard).join("\n")}
        </div>
      </section>
      <section class="people-section" id="undergraduates">
        <div class="section-head"><div>${T("p", "Students", "学生", 'class="eyebrow"')}${T("h2", "Undergraduate students", "本科生", 'class="display"')}</div></div>
        <div class="people-grid">
${byRole("Undergrad").map(personCard).join("\n")}
        </div>
      </section>
      <section class="people-section" id="interns">
        <div class="section-head"><div>${T("p", "Interns", "实习生", 'class="eyebrow"')}${T("h2", "Research interns", "科研实习生", 'class="display"')}</div></div>
        <div class="people-grid">
${byRole("Intern").map(personCard).join("\n")}
        </div>
      </section>
      <section class="people-section" id="alumni">
        <div class="section-head"><div>${T("p", "Alumni", "校友", 'class="eyebrow"')}${T("h2", "Alumni", "已毕业成员", 'class="display"')}</div></div>
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
  title: "Join us · MAI Group",
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

/* Buildless, accessible interactions for the group website. */
(() => {
  "use strict";
  const content = window.MAI_CONTENT;
  const model = window.MAI_MODEL;
  const { papers, members, topics } = content;
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => [...document.querySelectorAll(s)];
  const page = document.body.dataset.page;
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  let lang = "en";
  try {
    lang = localStorage.getItem("mai-language") === "zh" ? "zh" : "en";
  } catch {}
  let view = "topic",
    query = "",
    citation = "",
    toastTimer,
    scrolledToHash = false;

  const tr = (en, zh) => (lang === "zh" ? zh : en);
  const local = (pair) => pair[lang === "zh" ? 1 : 0];
  const name = (x) => tr(x.en, x.zh);
  const external = (url, label) => `<a href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(label)}</a>`;
  const topicById = (id) => topics.find((t) => t.id === id);
  const paperById = (id) => papers.find((p) => p.id === id);
  const topicLabel = (t) => name(t);
  // Old topic ids, kept so earlier links still land in the right place.
  const legacyTopics = { multimodal: "perception", foundation: "reasoning", autonomous: "decision", applications: "perception" };

  // Keep the time window current even when the static site has not been rebuilt.
  if (page === "index") {
    const news = $$("#news .news-list article");
    news.forEach((item) => { item.hidden = !model.isRecentNews(item.querySelector("time").dateTime); });
    $("#news").hidden = !news.some((item) => !item.hidden);
  }

  /* ---------- Papers ---------- */
  function authorHtml(p) {
    return p.authors
      .map((n) => {
        if (n === "Fan Liu") return '<a href="people.html#fan-liu">Fan Liu</a>';
        const m = members.find((x) => x.en === n);
        return m ? `<a href="people.html#${m.id}">${esc(n)}</a>` : esc(n);
      })
      .join(", ");
  }
  function paperItem(p, { showTopic = false, showSummary = false } = {}) {
    const links = [
      external(p.paper, p.kind === "book" ? tr("Book", "专著") : p.kind === "report" ? tr("Report", "报告") : tr("Paper", "论文")),
      p.code ? external(p.code, tr("Code", "代码")) : "",
      p.dataset ? external(p.dataset, tr("Dataset", "数据集")) : "",
      `<button data-cite="${p.id}" aria-haspopup="dialog">${tr("Cite", "引用")}</button>`,
    ].join("");
    return `<li class="pub" id="paper-${p.id}">
      <p class="pub-title"><a href="${esc(p.paper)}" target="_blank" rel="noopener noreferrer">${esc(p.title)}</a></p>
      <p class="pub-authors">${authorHtml(p)}</p>
      ${showSummary && p.summary ? `<p class="pub-summary">${esc(local(p.summary))}</p>` : ""}
      <div class="pub-meta"><span class="venue">${esc(p.venue)} ${p.year}</span>${p.kind === "report" ? `<span class="work-type">${tr("Technical report", "技术报告")}</span>` : ""}${p.distinction ? `<span class="oral">${esc(Array.isArray(p.distinction) ? local(p.distinction) : p.distinction)}</span>` : ""}${showTopic ? `<a class="pub-topic" href="research.html#${p.topic}">${esc(name(topicById(p.topic)))}</a>` : ""}<span class="pub-links">${links}</span></div>
      ${p.relatedTopics?.length ? `<p class="related-topics">${tr("Also related to", "关联方向")} ${p.relatedTopics.map((id) => `<a href="research.html#${id}">${esc(name(topicById(id)))}</a>`).join(tr(", ", "、"))}</p>` : ""}
    </li>`;
  }

  function renderPublications() {
    if (page !== "publications") return;
    const found = papers.filter((p) => model.matches(p, query, content));
    let sections = [];
    if (view === "topic") {
      sections = topics
        .map((t) => {
          const inTopic = found.filter((p) => p.topic === t.id);
          const groups = t.groups.length ? t.groups.map((g) => ({ g, list: inTopic.filter((p) => p.group === g.id) })) : [{ g: null, list: inTopic }];
          const body = groups
            .filter((x) => x.list.length)
            .map((x) => `${x.g ? `<h3 class="pub-group">${esc(name(x.g))}</h3>` : ""}<ol class="pub-list">${x.list.map((p) => paperItem(p)).join("")}</ol>`)
            .join("");
          return {
            id: t.id,
            label: topicLabel(t),
            count: inTopic.length,
            html: `<section class="pub-section" id="${t.id}">
              <div class="pub-section-head">
                <h2>${esc(name(t))}</h2>
                <p class="pub-section-intro">${esc(local(t.intro))} <a href="research.html#${t.id}" class="inline-link">${tr("About this direction", "了解该方向")} →</a></p>
              </div>${body}</section>`,
          };
        })
        .filter((s) => s.count);
    } else {
      const years = [...new Set(found.map((p) => p.year))].sort((a, b) => b - a);
      sections = years.map((y) => {
        const list = found.filter((p) => p.year === y);
        return {
          id: `y${y}`,
          label: String(y),
          count: list.length,
          html: `<section class="pub-section" id="y${y}"><div class="pub-section-head"><h2>${y}</h2></div><ol class="pub-list">${list.map((p) => paperItem(p, { showTopic: true })).join("")}</ol></section>`,
        };
      });
    }
    $("#pub-index").innerHTML = sections.map((s) => `<a href="#${s.id}">${esc(s.label)}<span>${s.count}</span></a>`).join("");
    $("#pub-index").hidden = !sections.length;
    $("#publication-list").innerHTML = sections.map((s) => s.html).join("");
    $("#publication-count").textContent = tr(`${found.length} ${found.length === 1 ? "publication" : "publications"}`, `共 ${found.length} 项成果`);
    $("#empty-state").hidden = found.length !== 0;
    $$("[data-view]").forEach((b) => {
      const selected = b.dataset.view === view;
      b.classList.toggle("active", selected);
      b.setAttribute("aria-pressed", String(selected));
    });
  }

  function syncUrl() {
    const params = new URLSearchParams();
    if (view !== "topic") params.set("view", view);
    if (query.trim()) params.set("q", query.trim());
    const search = params.toString();
    history.replaceState(null, "", `${location.pathname}${search ? `?${search}` : ""}`);
  }

  function renderFeaturedPapers() {
    $$("[data-featured-papers]").forEach((el) => {
      el.innerHTML = topicById(el.dataset.featuredPapers).featured.map((id) => paperItem(paperById(id), { showSummary: true })).join("");
    });
  }

  /* ---------- Language ---------- */
  function setLanguage(next) {
    lang = next;
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
    try {
      localStorage.setItem("mai-language", lang);
    } catch {}
    $$("[data-en][data-zh]").forEach((el) => {
      el.textContent = el.dataset[lang];
    });
    $$("a[data-url-en][data-url-zh]").forEach((link) => {
      link.href = lang === "zh" ? link.dataset.urlZh : link.dataset.urlEn;
    });
    $$("[data-lang-label]").forEach((el) => el.classList.toggle("active", el.dataset.langLabel === lang));
    $("#language-toggle").setAttribute("aria-label", tr("Switch to Chinese", "切换为英文"));
    $("#main-nav").setAttribute("aria-label", tr("Main navigation", "主导航"));
    $("#close-dialog").setAttribute("aria-label", tr("Close citation", "关闭引用信息"));
    updateMenuLabel();
    if ($("#publication-search")) {
      $("#publication-search").placeholder = tr("Search title, author, venue or year", "搜索标题、作者、会议或年份");
      $("#publication-search").setAttribute("aria-label", tr("Search publications", "搜索成果"));
      $(".view-switch").setAttribute("aria-label", tr("Organize publications", "成果排列方式"));
      $("#pub-index").setAttribute("aria-label", tr("Jump to section", "跳转到分类"));
    }
    renderPublications();
    renderFeaturedPapers();
    if (!scrolledToHash && location.hash) {
      scrolledToHash = true;
      const target = document.getElementById(legacyTopics[location.hash.slice(1)] || location.hash.slice(1));
      if (target) requestAnimationFrame(() => target.scrollIntoView());
    }
  }

  /* ---------- Navigation, dialog, clipboard ---------- */
  function updateMenuLabel() {
    $("#menu-toggle").setAttribute(
      "aria-label",
      $("#menu-toggle").getAttribute("aria-expanded") === "true" ? tr("Close navigation", "关闭导航") : tr("Open navigation", "打开导航"),
    );
  }
  function closeMenu() {
    $("#main-nav").classList.remove("open");
    $("#menu-toggle").setAttribute("aria-expanded", "false");
    updateMenuLabel();
  }
  $("#menu-toggle").addEventListener("click", () => {
    const open = $("#main-nav").classList.toggle("open");
    $("#menu-toggle").setAttribute("aria-expanded", String(open));
    updateMenuLabel();
  });
  $("#language-toggle").addEventListener("click", () => setLanguage(lang === "en" ? "zh" : "en"));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && $("#main-nav").classList.contains("open")) {
      closeMenu();
      $("#menu-toggle").focus();
    }
  });
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".site-header")) closeMenu();
    const c = e.target.closest("[data-cite]");
    if (c) openCitation(c.dataset.cite);
  });
  const dialog = $("#citation-dialog");
  function openCitation(id) {
    const p = paperById(id);
    if (!p) return;
    citation = `${p.authors.join(", ")}. ${p.year}. ${p.title}. ${p.venue} ${p.year}. ${p.paper}`;
    $("#citation-text").textContent = citation;
    dialog.showModal();
  }
  $("#close-dialog").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) {
      const b = dialog.getBoundingClientRect();
      if (e.clientX < b.left || e.clientX > b.right || e.clientY < b.top || e.clientY > b.bottom) dialog.close();
    }
  });
  function toast(message) {
    clearTimeout(toastTimer);
    $("#toast").textContent = message;
    $("#toast").classList.add("visible");
    toastTimer = setTimeout(() => $("#toast").classList.remove("visible"), 2800);
  }
  async function copy(text) {
    try {
      await navigator.clipboard.writeText(text);
      toast(tr("Copied to clipboard", "已复制"));
    } catch {
      toast(tr("Please select and copy the text.", "请选中文字后手动复制。"));
    }
  }
  $("#copy-citation").addEventListener("click", () => copy(citation));
  $("#copy-email")?.addEventListener("click", () => copy("liufan@seu.edu.cn"));

  if (page === "publications") {
    const params = new URLSearchParams(location.search);
    if (params.get("view") === "year") view = "year";
    query = params.get("q") || "";
    const legacy = legacyTopics[params.get("topic")] || params.get("topic");
    if (!location.hash && topicById(legacy)) history.replaceState(null, "", `${location.pathname}#${legacy}`);
    $("#publication-search").value = query;
    $$("[data-view]").forEach((b) =>
      b.addEventListener("click", () => {
        view = b.dataset.view;
        renderPublications();
        syncUrl();
      }),
    );
    $("#publication-search").addEventListener("input", (e) => {
      query = e.target.value;
      renderPublications();
      syncUrl();
    });
    $("#reset-filters").addEventListener("click", () => {
      query = "";
      $("#publication-search").value = "";
      renderPublications();
      syncUrl();
      $("#publication-search").focus();
    });
  }
  $("#current-year").textContent = new Date().getFullYear();
  setLanguage(lang);
})();

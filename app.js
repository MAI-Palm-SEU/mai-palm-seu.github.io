/* Buildless, accessible interactions for the group website. */
(() => {
  'use strict';
  const {papers, members, topics} = window.MAI_CONTENT;
  const $ = s => document.querySelector(s);
  const $$ = s => [...document.querySelectorAll(s)];
  const page = $('#project-content') ? 'project' : document.body.dataset.page;
  const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  let lang = 'en';
  try { lang = localStorage.getItem('mai-language') === 'zh' ? 'zh' : 'en'; } catch {}
  let scope = 'all', topic = 'all', query = '', citation = '', toastTimer;
  const tr = (en, zh) => lang === 'zh' ? zh : en;
  const local = arr => arr[lang === 'zh' ? 1 : 0];
  const paperLink = p => `project.html?id=${encodeURIComponent(p.id)}`;
  const external = (url,label) => `<a href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(label)}</a>`;
  const topicName = id => { const x = topics.find(t => t.id === id); return tr(x.en,x.zh); };
  function paperMeta(p) { return `<span class="venue">${esc(p.venue)} ${p.year}</span>${p.distinction ? '<span class="oral">Oral</span>' : ''}`; }
  function authorHtml(p) {
    return p.authors.map(n => {
      const m = members.find(x => x.en === n);
      if (n === 'Fan Liu') return '<a href="people.html#fan-liu">Fan Liu</a>';
      return m ? `<a href="people.html#${m.id}">${esc(n)}</a>` : esc(n);
    }).join(', ');
  }
  function resources(p) {
    return `<div class="resource-links">${external(p.paper,tr('Paper ↗','论文 ↗'))}${p.code?external(p.code,'Code ↗'):''}${p.dataset?external(p.dataset,tr('Dataset ↗','数据集 ↗')):''}<button data-cite="${p.id}" aria-haspopup="dialog">${tr('Cite','引用')}</button></div>`;
  }
  function renderPublications() {
    if (page !== 'publications') return;
    const tokens = query.toLocaleLowerCase().trim().split(/\s+/).filter(Boolean);
    const found = papers.filter(p => {
      const names = members.filter(m=>p.members.includes(m.id)).map(m=>m.zh).join(' ');
      const haystack = `${p.title} ${p.authors.join(' ')} ${p.venue} ${p.year} ${topicName(p.topic)} ${names} 刘帆`.toLocaleLowerCase();
      return (scope==='all'||p.scope===scope)&&(topic==='all'||p.topic===topic)&&tokens.every(q=>haystack.includes(q));
    });
    $('#publication-list').innerHTML = found.map(p => `<article class="publication-row" data-paper-id="${p.id}">${p.image ? `<a href="${paperLink(p)}" class="publication-thumbnail" aria-label="${esc(p.title)}"><img src="${p.image}" alt="${esc(p.short)} — research overview" loading="lazy"></a>` : `<a href="${paperLink(p)}" class="publication-thumbnail publication-text-thumb"><strong>${esc(p.venue)}</strong><span>${p.year}</span><span>${esc(topicName(p.topic))}</span></a>`}<div><div class="paper-meta">${paperMeta(p)}</div><h2><a href="${paperLink(p)}">${esc(p.title)}</a></h2><p class="publication-authors">${authorHtml(p)}</p>${resources(p)}</div></article>`).join('');
    $('#publication-count').textContent = tr(`${found.length} ${found.length===1?'paper':'papers'}`,`${found.length} 篇论文`);
    $('#empty-state').hidden = found.length !== 0;
    $$('[data-scope]').forEach(b=>{const selected=b.dataset.scope===scope;b.classList.toggle('active',selected);b.setAttribute('aria-pressed',String(selected));});
  }
  function renderProject() {
    if (page !== 'project') return;
    const p = papers.find(p=>p.id===new URLSearchParams(location.search).get('id'));
    if (!p) {
      $('#project-content').innerHTML = `<section class="project-not-found"><h1>${tr('Project not found','未找到该项目')}</h1><p>${tr('Browse our publications to find a research project.','请前往论文页面查看研究项目。')}</p><a href="publications.html" class="button">${tr('Browse publications →','浏览论文 →')}</a></section>`;
      return;
    }
    document.title = `${p.short} · MAI Group`;
    $('#project-content').innerHTML = `<article class="project-detail"><a href="publications.html" class="breadcrumb">${tr('← Publications','← 返回论文')}</a><div class="paper-meta">${paperMeta(p)}</div><h1>${esc(p.title)}</h1><p class="publication-authors">${authorHtml(p)}</p>${resources(p)}${p.image?`<figure class="project-figure"><a href="${p.image}" target="_blank" rel="noopener" aria-label="${tr('View full-size figure','查看完整配图')}"><img src="${p.image}" alt="${esc(p.short)} — research framework"></a><figcaption>${tr('Research figure from the authors’ paper or project materials.','研究配图来自作者论文或项目资料。')} ${external(p.source,tr('Source ↗','来源 ↗'))}</figcaption></figure>`:''}<section class="project-overview"><h2>${tr('Overview','研究概述')}</h2><p>${esc(local(p.detail))}</p></section><div class="project-related"><a class="text-link" href="research.html#${p.topic}">${tr('More in ','了解更多：')}${esc(topicName(p.topic))} →</a></div></article>`;
  }
  function setLanguage(next) {
    lang = next;
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
    try { localStorage.setItem('mai-language',lang); } catch {}
    $$('[data-en][data-zh]').forEach(el=>{el.textContent=el.dataset[lang];});
    $$('[data-lang-label]').forEach(el=>el.classList.toggle('active',el.dataset.langLabel===lang));
    $('#language-toggle').setAttribute('aria-label',tr('Switch to Chinese','切换为英文'));
    $('#main-nav').setAttribute('aria-label',tr('Main navigation','主导航'));
    $('#close-dialog').setAttribute('aria-label',tr('Close citation','关闭引用信息'));
    updateMenuLabel();
    if ($('#publication-search')) {
      $('#publication-search').placeholder=tr('Search title, author, or venue','搜索标题、作者或会议');
      $('#publication-search').setAttribute('aria-label',tr('Search publications','搜索论文'));
      $('#topic-filter').setAttribute('aria-label',tr('Research area','研究方向'));
      $('.scope-filters').setAttribute('aria-label',tr('Publication collection','论文范围'));
    }
    renderPublications();renderProject();
  }
  function updateMenuLabel() { $('#menu-toggle').setAttribute('aria-label',$('#menu-toggle').getAttribute('aria-expanded')==='true'?tr('Close navigation','关闭导航'):tr('Open navigation','打开导航')); }
  function closeMenu() {$('#main-nav').classList.remove('open');$('#menu-toggle').setAttribute('aria-expanded','false');updateMenuLabel();}
  $('#menu-toggle').addEventListener('click',()=>{const open=$('#main-nav').classList.toggle('open');$('#menu-toggle').setAttribute('aria-expanded',String(open));updateMenuLabel();});
  $('#language-toggle').addEventListener('click',()=>setLanguage(lang==='en'?'zh':'en'));
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&$('#main-nav').classList.contains('open')){closeMenu();$('#menu-toggle').focus();}});
  document.addEventListener('click',e=>{if(!e.target.closest('.site-header'))closeMenu();const c=e.target.closest('[data-cite]');if(c)openCitation(c.dataset.cite);});
  const dialog = $('#citation-dialog');
  function openCitation(id) {
    const p=papers.find(x=>x.id===id);if(!p)return;
    citation=`${p.authors.join(', ')}. ${p.year}. ${p.title}. ${p.venue} ${p.year}. ${p.paper}`;
    $('#citation-text').textContent=citation;dialog.showModal();
  }
  $('#close-dialog').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',e=>{if(e.target===dialog){const b=dialog.getBoundingClientRect();if(e.clientX<b.left||e.clientX>b.right||e.clientY<b.top||e.clientY>b.bottom)dialog.close();}});
  function toast(message) { clearTimeout(toastTimer);$('#toast').textContent=message;$('#toast').classList.add('visible');toastTimer=setTimeout(()=>$('#toast').classList.remove('visible'),2800); }
  async function copy(text) {try{await navigator.clipboard.writeText(text);toast(tr('Copied to clipboard','已复制'));}catch{toast(tr('Please select and copy the text.','请选中文字后手动复制。'));}}
  $('#copy-citation').addEventListener('click',()=>copy(citation));
  $('#copy-email')?.addEventListener('click',()=>copy('liufan@seu.edu.cn'));
  if(page==='publications'){
    const params=new URLSearchParams(location.search);
    if(['all','group','faculty'].includes(params.get('scope')))scope=params.get('scope');
    if(topics.some(x=>x.id===params.get('topic')))topic=params.get('topic');
    query=params.get('q')||'';
    $('#publication-search').value=query;$('#topic-filter').value=topic;
    $$('[data-scope]').forEach(b=>b.addEventListener('click',()=>{scope=b.dataset.scope;renderPublications();}));
    $('#publication-search').addEventListener('input',e=>{query=e.target.value;renderPublications();});
    $('#topic-filter').addEventListener('change',e=>{topic=e.target.value;renderPublications();});
    $('#reset-filters').addEventListener('click',()=>{scope='all';topic='all';query='';$('#publication-search').value='';$('#topic-filter').value='all';renderPublications();$('#publication-search').focus();});
  }
  $('#current-year').textContent = new Date().getFullYear();
  setLanguage(lang);
})();

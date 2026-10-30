/* Shared content relationships for the static generator and the browser. */
(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory();
  else root.MAI_MODEL = factory();
})(typeof window === "undefined" ? this : window, function () {
  "use strict";
  const normalize = (value) => value.normalize("NFKC").toLocaleLowerCase().trim();
  const projectPapers = (project) => [...new Set(project.themes.flatMap((theme) => theme.papers))];
  const projectOfPaper = (id, content) => content.projects.find((project) => projectPapers(project).includes(id));
  function projectTopics(project, content) {
    const ids = new Set(project.themes.flatMap((theme) => theme.topics || []));
    for (const id of projectPapers(project)) {
      const paper = content.papers.find((item) => item.id === id);
      if (paper) [paper.topic, ...(paper.relatedTopics || [])].forEach((topic) => ids.add(topic));
    }
    return content.topics.filter((topic) => ids.has(topic.id)).map((topic) => topic.id);
  }
  function authorMembers(paper, members) {
    const names = new Set(paper.authors.map(normalize));
    return members.filter((member) => [member.en, ...(member.aliases || [])].some((name) => names.has(normalize(name))));
  }
  function matches(paper, query, content) {
    const tokens = normalize(query).split(/\s+/).filter(Boolean);
    const directions = content.topics.filter((topic) => [paper.topic, ...(paper.relatedTopics || [])].includes(topic.id));
    const aliases = authorMembers(paper, content.members).flatMap((member) => [member.en, member.zh, ...(member.aliases || [])]);
    const kind = paper.kind === "book" ? "book monograph 专著 图书" : paper.kind === "report" ? "report preprint 技术报告 预印本" : "paper 论文";
    const haystack = normalize([paper.title, paper.short || "", ...paper.authors, ...aliases, paper.venue, paper.year, kind,
      ...directions.flatMap((topic) => [topic.en, topic.zh]), ...(paper.tags || []).flat()].join(" "));
    return tokens.every((token) => haystack.includes(token));
  }
  function workCounts(papers) {
    return papers.reduce((counts, paper) => {
      counts[paper.kind || "paper"] += 1;
      return counts;
    }, { paper: 0, report: 0, book: 0 });
  }
  function validate(content) {
    const errors = [];
    const unique = (items, label) => {
      const ids = items.map((item) => item.id);
      if (new Set(ids).size !== ids.length) errors.push(`Duplicate ${label} id`);
      return new Set(ids);
    };
    const topics = unique(content.topics, "topic");
    const papers = unique(content.papers, "paper");
    const members = unique(content.members, "member");
    unique(content.projects, "project");
    if ([...topics].join(",") !== "perception,reasoning,decision") errors.push("Research must use the three agreed directions in order");
    for (const paper of content.papers) {
      const topic = content.topics.find((item) => item.id === paper.topic);
      if (!topic) errors.push(`${paper.id}: unknown primary direction`);
      if (paper.group && !topic?.groups.some((group) => group.id === paper.group)) errors.push(`${paper.id}: unknown subgroup`);
      if (topic?.groups.length && !paper.group) errors.push(`${paper.id}: subgroup is required`);
      for (const id of paper.relatedTopics || []) if (!topics.has(id) || id === paper.topic) errors.push(`${paper.id}: invalid related direction ${id}`);
      if (!["paper", "report", "book"].includes(paper.kind || "paper")) errors.push(`${paper.id}: unknown work type`);
      for (const id of paper.members) if (!members.has(id)) errors.push(`${paper.id}: unknown member ${id}`);
      if (content.projects.filter((project) => projectPapers(project).includes(paper.id)).length !== 1) errors.push(`${paper.id}: assign to exactly one project`);
    }
    for (const project of content.projects) {
      for (const id of projectPapers(project)) if (!papers.has(id)) errors.push(`${project.id}: unknown paper ${id}`);
      for (const id of project.members) if (!members.has(id)) errors.push(`${project.id}: unknown member ${id}`);
      for (const theme of project.themes) for (const id of theme.topics || []) if (!topics.has(id)) errors.push(`${project.id}: unknown ongoing direction ${id}`);
    }
    for (const topic of content.topics) {
      if (topic.featured.length > 2) errors.push(`${topic.id}: select at most two representative works`);
      for (const id of [...topic.featured, topic.figure.paper]) {
        const paper = content.papers.find((item) => item.id === id);
        if (!paper || paper.topic !== topic.id) errors.push(`${topic.id}: featured work or figure ${id} belongs to another direction`);
      }
    }
    return errors;
  }
  return { projectPapers, projectOfPaper, projectTopics, authorMembers, matches, workCounts, validate };
});

// Regression checks for research mappings, student work, author search and work types.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const model = require("../model.js");
const context = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(__dirname, "../content.js"), "utf8"), context);
const content = JSON.parse(JSON.stringify(context.window.MAI_CONTENT));
const paper = (id) => content.papers.find((item) => item.id === id);
const project = (id) => content.projects.find((item) => item.id === id);

assert.deepEqual(model.validate(content), [], "All references and direction assignments must be valid");
assert.deepEqual(content.topics.map((topic) => topic.en), ["Perception & Understanding", "Semantic Reasoning", "Autonomous Decision-Making"]);
assert.deepEqual(model.projectTopics(project("recommendation"), content), ["perception", "reasoning"], "Recommendation must appear under SAGCN's direction");
assert.equal(model.projectOfPaper("nmvm", content).id, "multimodal-models", "The old NMVM link must resolve to the project that contains it");
assert.ok(paper("nmvm").authors.includes("Enhao Cheng") && paper("nmvm").authors.includes("Fan Liu"), "Retain the student/advisor joint work");
assert.deepEqual(model.workCounts(content.papers), { paper: 13, report: 1, book: 1 }, "Reports and the monograph must not count as papers");

for (const [english, chinese] of [["Huilin Chen", "陈慧临"], ["Zhenyang Li", "李振阳"], ["Enhao Cheng", "程恩浩"]]) {
  const ids = (name) => content.papers.filter((item) => model.matches(item, name, content)).map((item) => item.id);
  assert.ok(ids(english).length, `Missing publications for ${english}`);
  assert.deepEqual(ids(chinese), ids(english), `Chinese search must match the actual authors for ${chinese}`);
}
const noHuilin = { ...paper("nmvm"), members: ["huilin-chen"] };
assert.equal(model.matches(noHuilin, "陈慧临", content), false, "Project/member associations must not invent authors");
assert.equal(model.matches(paper("gcn-book"), "专著", content), true);
assert.equal(model.matches(paper("metafine"), "技术报告", content), true);

const future = structuredClone(content);
future.projects.find((item) => item.id === "recommendation").themes.push({ papers: [], topics: ["decision"] });
assert.deepEqual(model.projectTopics(future.projects.find((item) => item.id === "recommendation"), future), ["perception", "reasoning", "decision"], "New ongoing work must update project directions without a second label list");
const invalid = structuredClone(content);
invalid.topics[1].figure.paper = "fig";
assert.ok(model.validate(invalid).some((error) => error.includes("belongs to another direction")), "Reject mismatched research figures before generating pages");

for (const topic of content.topics) {
  assert.ok(fs.existsSync(path.join(__dirname, "..", topic.figure.src)), `Missing figure for ${topic.id}`);
}
console.log("Content checks passed: three directions, 15 works, consistent projects/figures, bilingual author search and work types.");

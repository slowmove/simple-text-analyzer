const fs = require("fs");
const path = require("path");
const analyzer = require("../main");

describe("main", () => {
  let text;
  beforeAll(() => {
    text = fs.readFileSync(path.join(__dirname, "mocks/en.txt"), "utf-8");
  });
  it("should run respond with a json array of word objexts", () => {
    const res = analyzer.analyze(text);
    expect(Array.isArray(res)).toBe(true);
    expect(res.length).toBeGreaterThan(0);
  });
  it("should contain objects with name and total", () => {
    const res = analyzer.analyze(text);
    expect(res[0]).toBeInstanceOf(Object);
    expect(Object.keys(res[0])).toContain("name");
    expect(Object.keys(res[0])).toContain("total");
  });
  it("should be shorter if words are ignored, than if not", () => {
    const ignoreWords = ["lint-staged", "hooks"];
    const res = analyzer.analyze(text);
    const filteredRes = analyzer.analyze(text, ignoreWords);
    expect(filteredRes.length).toBeLessThan(res.length);
  });
});

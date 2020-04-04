const expect = require("expect");
const { promises } = require("fs");

const { extractWordsFromPage } = require("../src/Extractor");
const resultWords = require("./resultWords.json");

const TEST_FILE_PATH = "./test/result_page.html";

describe("Extractor", () => {
  let fileContent = "";
  before(async function loadExampleFile() {
    fileContent = await promises.readFile(TEST_FILE_PATH, "utf8");
  });

  it("should return an empty array", () => {
    const res = extractWordsFromPage("");
    expect(typeof res).toEqual(typeof []);
    expect(res).toEqual([]);
    expect(res.length).toEqual(0);
  });

  it("should return an array of string", () => {
    const res = extractWordsFromPage(fileContent);
    expect(typeof res).toEqual(typeof []);
    expect(res.length).toBeGreaterThan(0);
    expect(res).toEqual(resultWords);
  });
});

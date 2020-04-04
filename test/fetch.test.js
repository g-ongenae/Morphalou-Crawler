const expect = require("expect");
const { promises } = require("fs");
const { spy } = require("sinon");
const request = require("superagent");

const { Crawler } = require("../src/Crawler");
const resultWords = require("./resultWords.json");

const TEST_FILE_PATH = "./test/result_page.html";

/**
 * Do nothing
 */
const noop = () => void 0;

describe("Crawler", () => {
  let fileContent = "";
  let crawler = undefined;

  before(async function loadExampleFile() {
    fileContent = await promises.readFile(TEST_FILE_PATH, "utf8");
  });
  beforeEach(function createANewCrawlerInstance() {
    // Create a new crawler instance
    crawler = new Crawler();

    // Check instance is clean
    expect(typeof crawler.words).toEqual(typeof []);
    expect(crawler.words).toEqual([]);
  });

  it("should add words to the list of words", () => {
    crawler.addWords(resultWords);

    expect(typeof crawler.words).toEqual(typeof []);
    expect(crawler.words).toEqual(resultWords);
  });

  it("should request a letter page and extract all words", async () => {
    const requestSpy = spy(request);

    requestSpy.alwaysCalledWith("https://www.cnrtl.fr/portailindex/MORF/B/80");
    requestSpy.returnValues = { text: fileContent };

    // Intentionally wrong request to check it do not call the server directly
    // const result = await crawler.fetchOnePageWords("B", 0);

    // TODO: FIXME: Should not call the server directly
    const result = await crawler.fetchOnePageWords("A", 80);

    // Should not add to the words directly
    expect(typeof crawler.words).toEqual(typeof []);
    expect(crawler.words).toEqual([]);

    // Should return the words
    expect(typeof result).toEqual(typeof []);
    expect(result).toEqual(resultWords);

    return;
  });

  it.skip("should request all pages from a letter until the page is empty", noop);
  it.skip("should request all letter", noop);
});

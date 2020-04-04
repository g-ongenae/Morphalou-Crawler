const cheerio = require("cheerio");
const filter = require("lodash.filter");
const isEmpty = require("lodash.isempty");
const { format } = require("prettier");

/**
 * Check if an arrayish is not empty
 * @param {array|string|object} e the element to check
 * @return {boolean} whether the element is not empty
 */
const isNotEmpty = (e) => !isEmpty(e);

/**
 * Extract words from page
 * @param {string} page (HTML content)
 * @returns {string[]} the list of words found in the page
 */
function extractWordsFromPage(page) {
  // Formatting the document is really slow but it is a simple solution
  // Otherwise I would need to look over every element of the table
  // TODO: Replace with a skim over the file
  const formattedPage = format(page, { parser: "html" });
  const $ = cheerio.load(formattedPage);
  const table = $("table.hometab");

  if (!table) {
    return [];
  }

  const words = (cheerio.text(table) || "").split("\n").map((e) => e.replace(/\s+/, ""));

  return filter(words, isNotEmpty);
}

module.exports = {
  extractWordsFromPage,
};

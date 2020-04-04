const isEmpty = require("lodash.isempty");
const request = require("superagent");

const { extractWordsFromPage } = require("./Extractor");

/**
 * Simple alphabet list
 */
// prettier-ignore
const ALPHABET = Object.freeze([
  "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
  "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
]);

/**
 * Number of words per page
 */
const WORDS_PER_PAGE = 80;

/**
 * The source to fetch words from
 */
const BASE_URL = "https://www.cnrtl.fr/portailindex/MORF//";

/**
 * A fake empty array of words to pass the isEmpty check at first.
 * I could use a do while loop instead,
 * but it would need more lines for the index change and I don't like that.
 */
const FAKE_EMPTY_ARRAY = Object.freeze(["empty"]);

/**
 * Crawler to fetch all words from a source (french dictionary)
 */
class Crawler {
  /**
   * Creates an instance of Crawler.
   */
  constructor() {
    /**
     * The list of words extracted from the Source
     * @type {Array}
     */
    this.words = [];
  }

  /**
   * Add a log message in the console to inform of the progress
   * @param {string} letter the letter currently being fetched
   * @param {number} [index=0] the index of the last word fetched of the letter
   */
  logProgress(letter, index = 0) {
    // Write progress letter in the console
    // The process will be really slow due to the prettier (~2s each time)
    // And there's a lot of pages (almost 8000 words for the letter A divided by page of 80)
    // However the prettier formatting also act a `wait` preventing from DDOS impression
    // Event though it should not trigger a DDOS defense anyway.
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write(`Fetching letter: ${letter}; Progress: ${index}`);
  }

  /**
   * Add new words to the list of words
   * @param {string[]} wordsToAdd words to add to the list
   */
  addWords(wordsToAdd) {
    this.words = this.words.concat(wordsToAdd);
  }

  /**
   * Fetch and extract words from one page
   * @param {string} letter the beginning letter to fetch words from
   * @param {number} index the index of the words to start from
   * @returns {Promise<string[]>} the list of words found in the page
   */
  async fetchOnePageWords(letter, index) {
    const page = await request(`${BASE_URL}${letter}/${index}`);

    return extractWordsFromPage(page.text);
  }

  /**
   * Fetch and extract all word starting from the same letter
   * @param {string} letter
   * @returns {Promise<void>}
   */
  async fetchOneLetterWords(letter) {
    for (let index = 0, wordsPage = FAKE_EMPTY_ARRAY; !isEmpty(wordsPage); index += WORDS_PER_PAGE) {
      this.logProgress(letter, index);
      wordsPage = await this.fetchOnePageWords(letter, index);
      this.addWords(wordsPage);
    }
  }

  /**
   * Fetch and extract all words from the source
   * @returns {Promise<void>}
   */
  async fetchAllWords() {
    for (const letter of ALPHABET) {
      this.logProgress(letter);
      await this.fetchOneLetterWords(letter);
    }

    // Clean
    process.stdout.write("\n");
  }
}

module.exports = new Crawler();
module.exports.Crawler = Crawler;

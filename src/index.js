const { promises } = require("fs");
const Crawler = require("./Crawler");

async function main() {
  // 1. Fetch
  await Crawler.fetchAllWords();

  const filePath = `${__dirname}/result.txt`;
  console.log(`The result will be rendered at ${filePath}`);

  // 2. Save in a text file
  return promises.writeFile(filePath, Crawler.words.join("\n"), "utf-8");
}

main()
  .then(() => {
    console.log("Finished rendered.");
  })
  .catch((err) => {
    console.error("An error occurred while crawling:", err);
  });

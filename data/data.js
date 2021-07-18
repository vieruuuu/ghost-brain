const fs = require("fs").promises;
const path = require("path");
const { isValidData, getOnlyFiles } = require("./../lib/util");

async function getTrainingData(dirPath = __dirname) {
  let trainingData = [];
  const tensor = {
    intents: [],
    mapping(t) {
      let map = [];

      for (let i = 0; i < tensor.intents.length; i++) {
        const intent = tensor.intents[i];

        map.push(t.intent == intent ? 1 : 0);
      }

      return map;
    },
  };

  const files = await getOnlyFiles(dirPath, ".t.txt");
  console.log(files);
  for (const filePath of files) {
    // read the file
    const file = path.basename(filePath);
    const intent = file.split(".t.txt")[0];

    const fileData = await fs.readFile(filePath, { encoding: "utf-8" });
    const lines = fileData.split("\n");

    for (const line of lines) {
      const isTrainingData = await isValidData(line);
      if (!isTrainingData) {
        continue;
      }

      trainingData.push({
        text: line,
        intent,
      });
    }

    tensor.intents.push(intent);
  }

  return { trainingData, tensor };
}

module.exports = getTrainingData;

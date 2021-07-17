const fs = require("fs").promises;
const path = require("path");
const isWhitespace = require("is-whitespace");

async function getOnlyFiles(dirPath) {
  let files = [];
  const filesAndDirs = await fs.readdir(dirPath);

  for (const file of filesAndDirs) {
    const filePath = path.join(dirPath, file);
    const isDir = await fs.stat(filePath);

    if (isDir.isDirectory()) {
      // read the files recursively in directories
      const inDirFiles = await getOnlyFiles(filePath);

      files.push(...inDirFiles);
      continue;
    }

    if (!file.includes(".t.txt")) {
      // its not a train file
      continue;
    }

    // its a train file
    files.push(filePath);
  }

  return files;
}

async function ifTrainingData(line) {
  if (line.length < 2) {
    return false;
  }

  if (isWhitespace(line)) {
    return false;
  }

  if (line.includes("//")) {
    return false;
  }

  return true;
}

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

  const files = await getOnlyFiles(dirPath);
  for (const filePath of files) {
    // read the file
    const file = path.basename(filePath);
    const intent = file.split(".t.txt")[0];

    const fileData = await fs.readFile(filePath, { encoding: "utf-8" });
    const lines = fileData.split("\n");

    for (const line of lines) {
      const isTrainingData = await ifTrainingData(line);
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

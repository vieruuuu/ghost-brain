const fs = require("fs").promises;
const path = require("path");
const isWhitespace = require("is-whitespace");

async function isValidData(line) {
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

async function getOnlyFiles(dirPath, ext) {
  let files = [];
  const filesAndDirs = await fs.readdir(dirPath);

  for (const file of filesAndDirs) {
    const filePath = path.join(dirPath, file);
    const isDir = await fs.stat(filePath);

    if (isDir.isDirectory()) {
      // read the files recursively in directories
      const inDirFiles = await getOnlyFiles(filePath, ext);

      files.push(...inDirFiles);
      continue;
    }

    if (!file.includes(ext)) {
      // its not a train file
      continue;
    }

    // its a train file
    files.push(filePath);
  }

  return files;
}

async function getFile(filePath) {
  return fs.readFile(path.join(...filePath), {
    encoding: "utf-8",
  });
}

module.exports = {
  isValidData,
  getOnlyFiles,
  getFile,
};

require("./fetchFix");

const use = require("@tensorflow-models/universal-sentence-encoder");
const path = require("path");

module.exports = {
  async load() {
    const useFolder = path.join(__dirname, "..", "models", "use");
    return use.load({
      modelUrl: "file://" + path.join(useFolder, "model.json"),
      vocabUrl: "file://" + path.join(useFolder, "vocab.json"),
    });
  },
};

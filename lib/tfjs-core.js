const proxyquire = require("proxyquire");
const snooze = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const nodefetch = require("node-fetch");
const fs = require("fs").promises;
const path = require("path");
const toxicFolder = path.join(__dirname, "..", "models", "toxicity");
const useFolder = path.join(__dirname, "..", "models", "use");

async function f(url) {
  const filePath = path.join(...url);

  return {
    ok: true,
    async arrayBuffer() {
      return fs.readFile(filePath);
    },
    async json() {
      let file = await fs.readFile(filePath);
      return JSON.parse(file);
    },
  };
}
async function newFetch(url) {
  switch (url) {
    case "https://tfhub.dev/tensorflow/tfjs-model/universal-sentence-encoder-lite/1/default/1/model.json?tfjs-format=file":
      return f([useFolder, "model.json"]);
    case "https://storage.googleapis.com/tfjs-models/savedmodel/universal_sentence_encoder/vocab.json":
      return f([useFolder, "vocab.json"]);
    case "https://tfhub.dev/tensorflow/tfjs-model/universal-sentence-encoder-lite/1/default/1/group1-shard1of7?tfjs-format=file":
      return f([useFolder, "group1-shard1of7"]);
    case "https://tfhub.dev/tensorflow/tfjs-model/universal-sentence-encoder-lite/1/default/1/group1-shard2of7?tfjs-format=file":
      return f([useFolder, "group1-shard2of7"]);
    case "https://tfhub.dev/tensorflow/tfjs-model/universal-sentence-encoder-lite/1/default/1/group1-shard3of7?tfjs-format=file":
      return f([useFolder, "group1-shard3of7"]);
    case "https://tfhub.dev/tensorflow/tfjs-model/universal-sentence-encoder-lite/1/default/1/group1-shard4of7?tfjs-format=file":
      return f([useFolder, "group1-shard4of7"]);
    case "https://tfhub.dev/tensorflow/tfjs-model/universal-sentence-encoder-lite/1/default/1/group1-shard5of7?tfjs-format=file":
      return f([useFolder, "group1-shard5of7"]);
    case "https://tfhub.dev/tensorflow/tfjs-model/universal-sentence-encoder-lite/1/default/1/group1-shard6of7?tfjs-format=file":
      return f([useFolder, "group1-shard6of7"]);
    case "https://tfhub.dev/tensorflow/tfjs-model/universal-sentence-encoder-lite/1/default/1/group1-shard7of7?tfjs-format=file":
      return f([useFolder, "group1-shard7of7"]);
    case "https://tfhub.dev/tensorflow/tfjs-model/toxicity/1/default/1/model.json?tfjs-format=file":
      return f([toxicFolder, "model.json"]);
    case "https://tfhub.dev/tensorflow/tfjs-model/toxicity/1/default/1/group1-shard1of7?tfjs-format=file":
      return f([toxicFolder, "group1-shard1of7"]);
    case "https://tfhub.dev/tensorflow/tfjs-model/toxicity/1/default/1/group1-shard2of7?tfjs-format=file":
      return f([toxicFolder, "group1-shard2of7"]);
    case "https://tfhub.dev/tensorflow/tfjs-model/toxicity/1/default/1/group1-shard3of7?tfjs-format=file":
      return f([toxicFolder, "group1-shard3of7"]);
    case "https://tfhub.dev/tensorflow/tfjs-model/toxicity/1/default/1/group1-shard4of7?tfjs-format=file":
      return f([toxicFolder, "group1-shard4of7"]);
    case "https://tfhub.dev/tensorflow/tfjs-model/toxicity/1/default/1/group1-shard5of7?tfjs-format=file":
      return f([toxicFolder, "group1-shard5of7"]);
    case "https://tfhub.dev/tensorflow/tfjs-model/toxicity/1/default/1/group1-shard6of7?tfjs-format=file":
      return f([toxicFolder, "group1-shard6of7"]);
    case "https://tfhub.dev/tensorflow/tfjs-model/toxicity/1/default/1/group1-shard7of7?tfjs-format=file":
      return f([toxicFolder, "group1-shard7of7"]);

    default:
      console.log(url);
      //await snooze(3000);
      return nodefetch(url);
  }
}

const tfcore = proxyquire("@tensorflow/tfjs-core", {
  "node-fetch": newFetch,
});

module.exports = tfcore;

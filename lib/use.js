const proxyquire = require("proxyquire");
const tfcore = require("./tfjs-core");
const use = proxyquire("@tensorflow-models/universal-sentence-encoder", {
  "@tensorflow/tfjs-core": tfcore,
});

module.exports = {
  async load() {
    return use.load();
  },
};

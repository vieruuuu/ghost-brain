const proxyquire = require("proxyquire");
const use = require("./use");

const toxicity = proxyquire("@tensorflow-models/toxicity", {
  "@tensorflow-models/universal-sentence-encoder": use,
});

module.exports = {
  async load(threshold) {
    return toxicity.load(threshold);
  },
};

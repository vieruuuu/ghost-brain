async function isToxic(text, toxic) {
  const predictions = await toxic.classify(text);

  console.log(predictions);

  for (const prediction of predictions) {
    for (const result of prediction.results) {
      if (result.match == true) {
        return true;
      }
    }
  }

  return false;
}

async function main() {
  require("@tensorflow/tfjs-node");
  const toxicity = require("./lib/toxicity");
  const { Timer } = require("timer-node");
  const timer = new Timer({ label: "test-timer" });
  timer.start();
  const toxic = await toxicity.load(0.9);

  const result = await isToxic("fuck you", toxic);

  console.log(result);
  console.log(timer.time());
}

main();

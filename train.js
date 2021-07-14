const { train } = require("./lib/train.js");
const run = require("./lib/run.js");
const load = require("./lib/load.js");

async function main() {
  // train the model
  const model = await train("Model");

  // test the model
  const prediction = await run(model, "hello what is your name");

  console.log(prediction);
}

main();

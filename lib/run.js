const use = require("./use");

async function run(model, text) {
  const { tensor } = await require("./../data/data")();
  const sentenceEncoder = await use.load();

  let Data = [{ text }];

  let Sentences = Data.map((t) => t.text.toLowerCase());
  const xPredict = await sentenceEncoder.embed(Sentences);
  let prediction = await model.predict(xPredict).data();

  let highest = [0, prediction[0]];
  for (let i = 1; i < prediction.length; i++) {
    if (highest[1] < prediction[i]) {
      highest[0] = i;
      highest[1] = prediction[i];
    }
  }
  let intent = tensor.intents[highest[0]];

  return { highest: intent, prediction };
}

module.exports = run;

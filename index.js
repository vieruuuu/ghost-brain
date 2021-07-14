(async () => {
  const { train } = require("./lib/train.js");
  const run = require("./lib/run.js");
  const load = require("./lib/load.js");
  const toxicity = require("@tensorflow-models/toxicity");

  const [model, toxic] = await Promise.all([load("Model"), toxicity.load(0.9)]);

  const fastify = require("fastify")({
    logger: true,
  });

  async function isToxic(text) {
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

  fastify.get("/", async (req, reply) => {
    const { text } = req.query;

    console.log(text);

    let results = await Promise.all([run(model, text), isToxic(text)]);

    return { type: results[0].highest, isToxic: results[1] };
  });

  fastify.listen(3000, async (err, address) => {
    if (err) {
      fastify.log.error(err);
      process.exit(1);
    }
    fastify.log.info(`server listening on ${address}`);
  });
})();

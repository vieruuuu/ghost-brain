(async () => {
  const { train } = require("./lib/train.js");
  const run = require("./lib/run.js");
  const load = require("./lib/load.js");
  const toxicity = require("./lib/toxicity");
  const { NewEntity, GhostTypes } = require("./ghosts");
  const g = new NewEntity(GhostTypes.Pricolici);

  await g.gen();

  const [model, toxic] = await Promise.all([load("Model"), toxicity.load(0.9)]);

  const fastify = require("fastify")({
    logger: true,
  });

  async function isToxic(text) {
    const predictions = await toxic.classify(text);

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

    const results = await Promise.all([run(model, text), isToxic(text)]);

    switch (results[0].highest) {
      case "name_text":
        return g.name.lastName + " " + g.name.firstName;
      case "age_number":
        return g.age;
    }

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

const { train } = require("./lib/train.js");
const run = require("./lib/run.js");
const load = require("./lib/load.js");

//
let model;

const fastify = require("fastify")({
  logger: true,
});

fastify.get("/", async (req, reply) => {
  const { text } = req.query;

  console.log(text);

  let result = await run(model, text);

  return result;
});

fastify.listen(3000, async (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`server listening on ${address}`);

  model = await load("Model");
});

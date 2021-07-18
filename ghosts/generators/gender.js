const { Random, nodeCrypto } = require("random-js");

const genders = ["male", "female"];

async function gender() {
  const random = new Random(nodeCrypto);

  return random.pick(genders);
}

module.exports = gender;

const { Random, nodeCrypto } = require("random-js");

const random = new Random(nodeCrypto);

async function age(props) {
  if (!props.hasAge) {
    return;
  }

  props.age = random.integer(...props.ageInterval);
}

module.exports = age;

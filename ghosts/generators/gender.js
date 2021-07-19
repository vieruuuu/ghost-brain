const { Random, nodeCrypto } = require("random-js");

const genders = ["male", "female"];

const random = new Random(nodeCrypto);

async function gender(props) {
  if (props.genGender) {
    props.gender = random.pick(genders);
  }
}

module.exports = gender;

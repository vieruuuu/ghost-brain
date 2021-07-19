const { isValidData, getFile } = require("./../../lib/util");
const { Random, nodeCrypto } = require("random-js");
const path = require("path");

async function validName(random, names) {
  const name = random.pick(names);
  const isValid = await isValidData(name);

  if (isValid) {
    return name;
  }

  return validName(random, names);
}

async function name(props) {
  if (!props.hasName) {
    return;
  }

  const nameFolder = path.join(__dirname, "names");

  const lastNames = (await getFile([nameFolder, "lastname.txt"])).split("\n");
  const femaleFirstNames = (await getFile([nameFolder, "female.txt"])).split(
    "\n"
  );
  const maleFirstNames = (await getFile([nameFolder, "male.txt"])).split("\n");

  const random = new Random(nodeCrypto);

  const lastName = await validName(random, lastNames);
  let firstName;

  switch (props.gender) {
    case "male":
    default:
      firstName = await validName(random, maleFirstNames);
      break;
    case "female":
      firstName = await validName(random, femaleFirstNames);
      break;
  }

  props.name.firstName = firstName;
  props.name.lastName = lastName;
}

module.exports = name;

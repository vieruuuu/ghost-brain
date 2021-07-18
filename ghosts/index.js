const randomName = require("./generators/name");
const randomGender = require("./generators/gender");

const GhostTypes = {
  Pricolici: {
    randomGender: true,
    name: true,
    age: [20, 60],
  },
  Moroi: {
    randomGender: true,
    name: true,
    age: [20, 60],
  },
  Strigoi: {
    randomGender: true,
    name: true,
    age: [20, 60],
  },
  Samca: {
    randomGender: false,
    gender: "female",
    name: false,
    age: [-1],
  },
};

class Ghost {
  #props = {};
  name = "Hello";

  constructor(props) {
    this.props = props;
  }

  async gen() {
    const gender = await randomGender();

    this.props.gender = gender;

    const name = await randomName(this.props);

    console.log(name);
  }
}

(async () => {
  const g = new Ghost(GhostTypes.Moroi);

  await g.gen();
})();

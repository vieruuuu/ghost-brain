const { generateName, generateGender, generateAge } = require("./generators");

const HumanTypes = {
  Normal: {
    genGender: true,
    hasName: true,
    hasAge: true,
    ageInterval: [20, 60],
  },
};

const GhostTypes = {
  Pricolici: {
    genGender: true,
    hasName: true,
    hasAge: true,
    ageInterval: [20, 60],
  },
  Moroi: {
    genGender: true,
    hasName: true,
    hasAge: true,
    ageInterval: [20, 60],
  },
  Strigoi: {
    genGender: true,
    hasName: true,
    hasAge: true,
    ageInterval: [20, 60],
  },
  Samca: {
    genGender: false,
    gender: "female",
    hasName: false,
    hasAge: false,
  },
};

class NewEntity {
  #props = {
    genGender: true,
    gender: "",
    hasName: true,
    name: { lastName: "", firstName: "" },
    hasAge: false,
    ageInterval: [0, 0],
    age: 0,
  };

  constructor(props) {
    this.#props = { ...this.#props, ...props };
  }

  async gen() {
    await generateGender(this.#props);

    await generateName(this.#props);

    await generateAge(this.#props);

    console.log(this.#props);
  }

  get name() {
    return this.#props.name;
  }
  get age() {
    return this.#props.age;
  }
  get gender() {
    return this.#props.age;
  }
}

(async () => {
  const g = new NewEntity(GhostTypes.Pricolici);

  await g.gen();
})();

module.exports = {
  GhostTypes,
  HumanTypes,
  NewEntity,
};

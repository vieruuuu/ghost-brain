const nodefetch = require("node-fetch");
const fs = require("fs").promises;

global.fetch = async (url) => {
  if (url.includes("file://")) {
    return {
      json: async () => {
        let file = await fs.readFile(url.split("file://")[1]);
        return JSON.parse(file);
      },
    };
  } else {
    return nodefetch(url);
  }
};

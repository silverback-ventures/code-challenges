const faker = require("faker");
const path = require("path");
const fs = require("fs");
const { v4: uuid } = require("uuid");

function generate() {
  return {
    id: uuid(),
    logo: "https://static.daffy.org/avatars/logo-placeholder.png",
    name: faker.company.companyName(),
    city: faker.address.city(),
    state: faker.address.state(),
    mission: faker.company.catchPhrase(),
  };
}

let charities = JSON.stringify(
  Array.from({ length: 100 }, () => {
    return {
      id: uuid(),
      logo: "https://static.daffy.org/avatars/logo-placeholder.png",
      name: faker.company.companyName(),
      city: faker.address.city(),
      state: faker.address.state(),
      mission: faker.company.catchPhrase(),
    };
  }),
  null,
  2
);

fs.writeFileSync(path.resolve("./app/data/charities.json"), charities, "utf-8");

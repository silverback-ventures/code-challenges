import faker from "faker";
import fs from "fs/promises";
import { resolve } from "path";
import { v4 as uuid } from "uuid";

type Charity = {
  id: string;
  logo: string;
  name: string;
  city: string;
  state: string;
  mission: string;
};

/**
 * How common is for an error to happen when calling an API method.
 * Change this value to make it more or less common.
 */
const ERROR_RATE = 5;

export function api() {
  function raise() {
    if (Math.random() * 100 > ERROR_RATE) return;
    throw new Error("Something went wrong");
  }

  return {
    charities: {
      /**
       * Get a single charity using the ID.
       */
      async show(id: number) {
        raise();

        let charities: Charity[] = JSON.parse(
          await fs.readFile(resolve("./app/data/charities.json"), "utf8")
        );

        return charities.find((charity) => charity.id === id);
      },

      /**
       * Get the list of charities.
       * Optionally filter by name.
       */
      async list({ term, page = 1 }: { term?: string; page?: number } = {}) {
        raise();

        let charities: Charity[] = JSON.parse(
          await fs.readFile(resolve("./app/data/charities.json"), "utf8")
        );

        return charities
          .filter((charity) => (term ? charity.name.includes(term) : true))
          .slice((page - 1) * 10, page * 10);
      },

      /**
       * Create a new charity.
       * It receives an object with the name, city, mission or state.
       * All attributes are optional.
       */
      async create(
        charity: Partial<Pick<Charity, "name" | "city" | "mission" | "state">>
      ) {
        raise();

        let charities: Charity[] = JSON.parse(
          await fs.readFile(resolve("./app/data/charities.json"), "utf8")
        );

        let result: Charity = {
          id: uuid(),
          logo: "https://static.daffy.org/avatars/logo-placeholder.png",
          name: faker.company.companyName(),
          city: faker.address.city(),
          state: faker.address.state(),
          mission: faker.company.catchPhrase(),
          ...charity,
        };

        await fs.writeFile(
          resolve("./app/data/charities.json"),
          JSON.stringify(charities.concat(result), null, 2),
          "utf-8"
        );

        return result;
      },
    },
  };
}

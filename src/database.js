import knex from "knex";

export const db = knex({
  client: "sqlite3",
  connection: {
    filename: "/home/davi/dev/stash/database.db",
  },
  useNullAsDefault: true,
});

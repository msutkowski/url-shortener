import { factory, primaryKey } from "@mswjs/data";

export const db = factory({
  // Create a "link" model that matches our DTO
  link: {
    id: primaryKey(String),
    long_url: String,
    link: String,
    hash: String,
  },
});

export default db;

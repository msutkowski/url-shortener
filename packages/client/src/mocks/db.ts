import { factory, primaryKey } from "@mswjs/data";

export const db = factory({
  // Create a "link" model,
  link: {
    id: primaryKey(String),
    long_url: String,
    link: String,
    hash: String,
  },
});

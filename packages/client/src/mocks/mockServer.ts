import { setupServer } from "msw/node";
import { handlers } from "./handlers";

export function mockServer() {
  const server = setupServer(...handlers);
  return { server };
}

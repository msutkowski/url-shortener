import { rest } from "msw";
import {
  CreateLinkApiResponse,
  CreateLinkRequest,
} from "../services/api.generated";

import { db } from "./db";

export const handlers = [
  rest.get("/echo", (req, res, ctx) => {
    return res(ctx.json({ success: true, ...req.params }));
  }),
  rest.post<CreateLinkRequest, CreateLinkApiResponse>(
    "/generate",
    (req, res, ctx) => {
      const entry = db.link.create(req.body) as any as CreateLinkApiResponse;
      return res(ctx.json(entry));
    }
  ),
  rest.get("/check", (req, res, ctx) => {
    const hash = req.url.searchParams.get("hash");
    if (!hash) {
      return res(
        ctx.status(400),
        ctx.json({ message: "Missing hash in query parameters" })
      );
    }
    const entry = db.link.findFirst({
      where: {
        hash: {
          equals: hash,
        },
      },
    });
    return res(ctx.json(entry));
  }),
] as const;

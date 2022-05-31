import { rest } from "msw";

import userInfo from "./user-info.json";
import authorGenesets from "./author-genesets.json";

// api calls to be mocked with fixture data
export const handlers = [
  rest.get(/user_info/i, (req, res, ctx) =>
    res(ctx.status(200), ctx.json(userInfo))
  ),
  rest.get(/query/i, (req, res, ctx) => {
    if (req.url.searchParams.get("q")?.includes("author:"))
      return res(ctx.status(200), ctx.json(authorGenesets));
  }),
  rest.post(/user_geneset/i, (req, res, ctx) =>
    res(ctx.status(200), ctx.json({}))
  ),
  rest.put(/user_geneset/i, (req, res, ctx) =>
    res(ctx.status(200), ctx.json({}))
  ),
  rest.delete(/user_geneset/i, (req, res, ctx) =>
    res(ctx.status(200), ctx.json({}))
  ),
];

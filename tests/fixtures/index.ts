import { rest } from "msw";

import userInfo from "./user-info.json";
import genesets from "./genesets.json";

// api calls to be mocked with fixture data
export const handlers = [
  rest.get(/user_info/i, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(null)); // not logged in
    // return res(ctx.status(200), ctx.json(userInfo)); // logged in
  }),
  rest.get(/query/i, (req, res, ctx) =>
    res(ctx.status(200), ctx.json(genesets))
  ),
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

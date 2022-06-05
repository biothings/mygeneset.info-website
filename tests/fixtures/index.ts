import { rest } from "msw";

import userInfo from "./user-info.json";
import query from "./query.json";
import queryFacetTaxid from "./query-facet-taxid.json";

// api calls to be mocked with fixture data
export const handlers = [
  rest.get(/mygeneset.info.*user_info/i, (req, res, ctx) => {
    // return res(ctx.status(200), ctx.json(null)); // not logged in
    return res(ctx.status(200), ctx.json(userInfo)); // logged in
  }),

  rest.get(/mygeneset.info.*query/i, (req, res, ctx) => {
    if (req.url.searchParams.get("facets") === "taxid")
      return res(ctx.status(200), ctx.json(queryFacetTaxid));

    return res(ctx.status(200), ctx.json(query));
  }),

  rest.post(/mygeneset.info.*user_geneset/i, (req, res, ctx) =>
    res(ctx.status(200), ctx.json({}))
  ),

  rest.put(/mygeneset.info.*user_geneset/i, (req, res, ctx) =>
    res(ctx.status(200), ctx.json({}))
  ),

  rest.delete(/mygeneset.info.*user_geneset/i, (req, res, ctx) =>
    res(ctx.status(200), ctx.json({}))
  ),
];

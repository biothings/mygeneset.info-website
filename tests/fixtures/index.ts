import { rest } from "msw";

import userInfo from "./user-info.json";
import usage from "./usage.json";
import lookupGeneset from "./lookup-geneset.json";
import searchGenesets from "./search-genesets.json";
import searchGenesetsFacetTaxid from "./search-genesets-facet-taxid.json";
import searchGenes from "./search-genes.json";

// flag to conveniently switch between mocking every call (except user info)
// and mocking no calls, only in development mode
const mock = true;

// flag to conveniently switch between logged in and not (anonymous)
const loggedIn = false;

// api calls to be mocked with fixture data
export const handlers = [
  rest.get(/mygeneset.info.*user_info/i, (req, res, ctx) => {
    if (loggedIn) return res(ctx.status(200), ctx.json(userInfo));
    else return res(ctx.status(200), ctx.json(null));
  }),

  rest.get(/biothings-data/i, (req, res, ctx) => {
    if (!mock) return req.passthrough();

    return res(ctx.status(200), ctx.json(usage));
  }),

  rest.get(/mygeneset.info.*geneset/i, (req, res, ctx) => {
    if (!mock) return req.passthrough();

    return res(ctx.status(200), ctx.json(lookupGeneset));
  }),

  rest.get(/mygeneset.info.*query/i, (req, res, ctx) => {
    if (!mock) return req.passthrough();

    if (req.url.searchParams.get("facets") === "taxid")
      return res(ctx.status(200), ctx.json(searchGenesetsFacetTaxid));

    return res(ctx.status(200), ctx.json(searchGenesets));
  }),

  rest.get(/mygene.info.*query/i, (req, res, ctx) => {
    if (!mock) return req.passthrough();

    return res(ctx.status(200), ctx.json(searchGenes));
  }),

  rest.post(/mygeneset.info.*user_geneset/i, (req, res, ctx) => {
    if (!mock) return req.passthrough();

    return res(ctx.status(200), ctx.json({}));
  }),

  rest.put(/mygeneset.info.*user_geneset/i, (req, res, ctx) => {
    if (!mock) return req.passthrough();

    return res(ctx.status(200), ctx.json({}));
  }),

  rest.delete(/mygeneset.info.*user_geneset/i, (req, res, ctx) => {
    if (!mock) return req.passthrough();

    return res(ctx.status(200), ctx.json({}));
  }),
];

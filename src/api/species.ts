import { request } from ".";
import { Response } from "@/types";
import { mygeneset } from ".";
import { biothings } from ".";

// search species by keyword
export const search = async (query?: string): Response => {
  // params
  const params = new URLSearchParams();
  if (query) params.set("q", query);
  params.set("fields", "*");
  params.set("size", "100");

  // request and parse results
  const url = biothings + "query?" + params.toString();
  const { total = 0, hits = [] } = await request(url);
  if (hits.length) hits[0].total = total;
  return hits;
};

// get species in order of included in most genesets
export const popular = async (): Response => {
  // params
  let params = new URLSearchParams();
  params.set("q", "*");
  params.set("facets", "taxid");
  params.set("facet_size", "100");
  params.set("fields", "*");

  // request and parse results
  let url = mygeneset + "query?" + params.toString();
  const { facets = {}, total = 0 } = await request(url);
  const ids = facets.taxid.terms
    .map(({ term }: { term: number }) => term)
    .join(",");

  // params
  params = new URLSearchParams();
  params.set("q", ids);

  // request and parse results
  url = biothings + "query?" + params.toString();
  const results = await request(url, "POST");
  if (results.length) results[0].total = total;
  return results;
};

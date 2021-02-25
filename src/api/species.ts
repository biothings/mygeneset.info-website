import { request } from ".";
import { Response } from ".";
import { Json } from ".";

const base = "http://t.biothings.io/v1/";

export const search = async (query?: string): Response => {
  const params = new URLSearchParams();
  if (query) params.set("q", query);
  params.set("fields", "*");
  params.set("size", "100");
  const url = base + "query?" + params.toString();
  return (await request(url)).hits;
};

export const getAll = async (): Response => {
  const expectedResults = 30000; // max approx expected number of species
  const perPage = 1000; // results page size
  const maxRequests = expectedResults / perPage; // max number of requests

  let results: Json[] = [];
  let scrollId = "";
  for (let requestCount = 0; requestCount < maxRequests; requestCount++) {
    const params = new URLSearchParams();
    params.set("size", "1000");
    params.set("q", "has_gene:true");
    params.set("fetch_all", "TRUE");
    params.set("scroll_id", scrollId);
    const url = base + "query?" + params.toString();
    const { _scroll_id: newScrollId, hits } = await request(url);
    if (!hits) break;
    scrollId = newScrollId;
    results = results.concat(hits);
  }
  return results;
};

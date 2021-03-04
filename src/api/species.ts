import { request } from ".";
import { mygeneset } from ".";
import { biothings } from ".";
import { Species } from "@/api/types";

// search species by keyword
export const search = async (query?: string): Promise<Species[]> => {
  // params
  const params = new URLSearchParams();
  if (query) params.set("q", query);
  params.set("fields", "*");
  params.set("size", "100");

  // request and parse results
  const url = biothings + "query?" + params.toString();
  try {
    const { total = 0, hits = [] } = await request(url);
    if (hits.length) hits[0].total = total;
    return hits;
  } catch (error) {
    console.error(error);
    return [];
  }
};

// get species in order of included in most genesets
export const popular = async (): Promise<Species[]> => {
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
  try {
    const results = await request(url, "POST");
    if (results.length) results[0].total = total;
    return results;
  } catch (error) {
    console.error(error);
    return [];
  }
};

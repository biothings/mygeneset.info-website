import { request } from ".";
import { Response } from ".";
import { mygeneset } from ".";
import { biothings } from ".";

export const search = async (query?: string): Response => {
  const params = new URLSearchParams();
  if (query) params.set("q", query);
  params.set("fields", "*");
  params.set("size", "100");
  const url = biothings + "query?" + params.toString();
  return (await request(url)).hits;
};

export const top = async (): Response => {
  let params = new URLSearchParams();
  params.set("q", "*");
  params.set("facets", "taxid");
  params.set("facet_size", "100");
  params.set("fields", "*");
  let url = mygeneset + "query?" + params.toString();
  const ids = (await request(url)).facets.taxid.terms
    .map(({ term }: { term: number }) => term)
    .join(",");
  params = new URLSearchParams();
  params.set("q", ids);
  url = biothings + "query?" + params.toString();
  return await request(url, "POST");
};

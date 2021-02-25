import { request } from ".";
import { Response } from ".";
import { Json } from ".";
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
  const params = new URLSearchParams();
  params.set("q", "*");
  params.set("facets", "taxid");
  params.set("facet_size", "100");
  params.set("fields", "*");
  const url = mygeneset + "query?" + params.toString();
  const ids = (await request(url)).facets.taxid.terms.map(
    ({ term }: { term: number }) => term
  );

  const results: Json = [];
  for (const id of ids) {
    const url = biothings + "taxon/" + id;
    results.push(await request(url));
  }
  console.log(results)
  return results;
};

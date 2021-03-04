import { request } from ".";
import { Response } from "@/types";
import { mygeneset } from ".";

// get metadata about my geneset
export const metadata = async (): Response => {
  const url = mygeneset + "metadata";
  return await request(url);
};

// look up geneset from id
export const lookup = async (id: string): Response => {
  const url = mygeneset + "geneset/" + id;
  return await request(url);
};

// search genesets by keyword
export const search = async (query?: string, species?: string[]): Response => {
  // params
  const params = new URLSearchParams();
  if (query) {
    query = ` ${query} `.split(/\s+/g).join("*"); // pseudo fuzzy search
    params.set("q", query);
  }
  if (species?.length) params.set("species", species.join(","));
  params.set("fields", "*");
  params.set("size", "100");

  // request and parse results
  const url = mygeneset + "query?" + params.toString();
  const { total = 0, hits = [] } = await request(url);
  if (hits.length) hits[0].total = total;
  return hits;
};

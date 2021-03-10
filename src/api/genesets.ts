import { request } from ".";
import { mygeneset } from ".";
import { Geneset } from "@/api/types";

// look up geneset from id
export const lookup = async (id: string): Promise<Geneset> => {
  const url = mygeneset + "geneset/" + id;
  try {
    return await request(url);
  } catch (error) {
    console.error(error);
    return {};
  }
};

// search genesets by keyword
export const search = async (
  query?: string,
  species?: string[]
): Promise<Geneset[]> => {
  // params
  const params = new URLSearchParams();
  if (query) {
    query = ` ${query} `.split(/\s+/g).join("*"); // pseudo fuzzy search
    params.set("q", query);
  }
  if (species?.length) params.set("species", species.join(","));
  params.set("fields", "*");
  params.set("size", "100");
  params.set("always_list", "genes,genes.ensemblgene,genes.uniprot");

  // request and parse results
  const url = mygeneset + "query?" + params.toString();
  try {
    const { total = 0, hits = [] } = await request(url);
    if (hits.length) hits[0].total = total;
    return hits;
  } catch (error) {
    console.error(error);
    return [];
  }
};

import { request } from ".";
import { mygene } from ".";
import { Gene } from "@/api/types";
import { mapGene } from "@/api/types";

// search genes by keyword
export const search = async (
  query?: string,
  species?: string[]
): Promise<Gene[]> => {
  // params
  const params = new URLSearchParams();
  if (query) params.set("q", query);
  if (species?.length) params.set("species", species.join(","));
  params.set("fields", "all");
  params.set("size", "100");
  params.set("scopes", "_id,alias,symbol,entrezgene,ensembl.gene,uniprot");
  params.set("always_list", "alias,symbol,ensembl,uniprot");

  // request and parse results
  const url = mygene + "query?" + params.toString();
  try {
    // eslint-disable-next-line
    let { total = 0, hits = [] } = await request(url);
    if (hits.length) hits[0].total = total;
    hits = hits.map(mapGene);
    return hits;
  } catch (error) {
    console.error(error);
    return [];
  }
};

// convert search into dash case expected by api
// e.g. "  adjuba  LIM protein   " -> "adjuba-LIM-protein"
const toDash = (search: string) =>
  search
    .split(/\s/)
    .filter(word => word)
    .join("-");

// search genes by keyword
export const batchSearch = async (
  query?: string[],
  species?: string[]
): Promise<Gene[]> => {
  // params
  const params = new URLSearchParams();
  if (query?.length) params.set("q", query.map(toDash).join(","));
  if (species?.length) params.set("species", species.join(","));
  params.set("fields", "all");
  params.set("size", "100");
  params.set("scopes", "_id,alias,symbol,entrezgene,ensembl.gene,uniprot");
  params.set("always_list", "alias,symbol,ensembl,uniprot");

  // request and parse results
  const url = mygene + "query?" + params.toString();
  try {
    // eslint-disable-next-line
    let hits = await request(url, "POST");
    if (hits.length) hits[0].total = hits.length;
    hits = hits.map(mapGene).filter((hit: Gene) => !hit.notfound);
    return hits;
  } catch (error) {
    console.error(error);
    return [];
  }
};

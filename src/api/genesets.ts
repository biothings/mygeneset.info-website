import { request } from ".";
import { mygeneset } from ".";
import { Geneset } from "@/api/types";

// look up geneset from id
export const lookup = async (id: string): Promise<Geneset> => {
  // params
  const params = new URLSearchParams();
  params.set(
    "always_list",
    "genes,genes.symbol,genes.ensemblgene,genes.uniprot"
  );

  // request
  const url = mygeneset + "geneset/" + id + "?" + params.toString();
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
  if (query) params.set("q", query);
  if (species?.length) params.set("species", species.join(","));
  params.set("fields", "all");
  params.set("size", "100");
  params.set(
    "always_list",
    "genes,genes.symbol,genes.ensemblgene,genes.uniprot"
  );

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

// create or update a geneset
export const update = async (
  fresh: boolean,
  id: string,
  name: string,
  description: string,
  isPublic: boolean,
  genes: string[]
) => {
  // headers
  const headers = new Headers();
  headers.set("Content-Type", "application/json");

  // params
  const params = new URLSearchParams();
  if (!fresh) params.set("gene_operation", "replace");

  // body
  const body = {
    name,
    description,
    isPublic,
    genes
  };

  const url = mygeneset + "user_geneset/" + id + "?" + params.toString();

  // make request
  try {
    const response = await request(url, {
      method: fresh ? "POST" : "PUT",
      body: JSON.stringify(body)
    });
    console.log(response);
    return true;
  } catch (error) {
    return false;
  }
};

// delete geneset
export const destroy = async (id: string) => {
  const url = mygeneset + "user_geneset/" + id;
  try {
    const response = await request(url, { method: "DELETE" });
    console.log(response);
    return true;
  } catch (error) {
    return false;
  }
};

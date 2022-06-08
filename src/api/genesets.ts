import { sleep } from "./../util/debug";
import { request } from ".";
import { mygeneset } from ".";
import { _Gene, Gene, mapGene } from "./genes";

// from backend
export interface _Geneset {
  _id?: string;
  name?: string;
  author?: string;
  source?: string;
  created?: string;
  updated?: string;
  description?: string;
  is_public?: boolean;
  genes?: Array<_Gene>;
}

// for frontend
export interface Geneset {
  id: string;
  name: string;
  author?: string;
  source?: string;
  created?: Date;
  updated?: Date;
  description: string;
  isPublic: boolean;
  genes: Array<Gene>;
}

// convert backend format to desired frontend format
const mapGeneset = (geneset: _Geneset): Geneset => ({
  id: String(geneset._id || ""),
  name: geneset.name || "",
  author: geneset.author || "",
  source: geneset.source || "",
  created: geneset.created ? new Date(geneset.created) : undefined,
  updated: geneset.updated ? new Date(geneset.updated) : undefined,
  description: geneset.description || "",
  isPublic: !!geneset.is_public,
  genes: geneset.genes?.map(mapGene) || [],
});

// look up geneset from id
export const lookupGeneset = async (id: string): Promise<Geneset> => {
  // params
  const params = new URLSearchParams();
  params.set("fields", "all");
  params.set(
    "always_list",
    [
      "genes",
      "genes.alias",
      "genes.entrezgene",
      "genes.symbol",
      "genes.ensembl",
      "genes.ensemblgene",
      "genes.uniprot",
    ].join(",")
  );

  // request
  const url = `${mygeneset}/geneset/${id}?${params.toString()}`;
  const response = await request<_Geneset>(url);

  return mapGeneset(response);
};

// search genesets by keyword, species, etc
export const searchGenesets = async (
  query?: string,
  species?: Array<string>,
  sort?: string,
  start?: number,
  perPage?: number
): Promise<SearchResult> => {
  // params
  const params = new URLSearchParams();

  // await sleep(1000);

  // dynamic params
  if (query) params.set("q", query);
  if (species?.length) params.set("species", species.join(","));
  if (sort) params.set("sort", sort);
  if (start) params.set("from", String(start));
  if (perPage) params.set("size", String(perPage));
  else params.set("size", "100");

  // static params
  params.set("fields", "all");
  params.set(
    "always_list",
    [
      "genes",
      "genes.alias",
      "genes.entrezgene",
      "genes.symbol",
      "genes.ensembl",
      "genes.ensemblgene",
      "genes.uniprot",
    ].join(",")
  );

  // request
  const url = `${mygeneset}/query?${params.toString()}`;
  const response = await request<SearchResponse>(url);

  return { total: response.total, genesets: response.hits.map(mapGeneset) };
};

// from backend
interface SearchResponse {
  hits: Array<_Geneset>;
  total: number;
}

// for frontend
export interface SearchResult {
  genesets: Array<Geneset>;
  total: number;
}

// // create or update a geneset
// export const update = async (
//   fresh: boolean,
//   id: string,
//   name: string,
//   description: string,
//   is_public: boolean,
//   genes: string[]
// ) => {
//   // headers
//   const headers = new Headers();
//   headers.set("Content-Type", "application/json");

//   // params
//   const params = new URLSearchParams();
//   if (!fresh) params.set("gene_operation", "replace");

//   // body
//   const body = {
//     name,
//     description,
//     is_public,
//     genes,
//   };

//   const url = `${mygeneset}/user_geneset/${id}?${params.toString()}`;

//   // make request
//   try {
//     const response = await request(url, {
//       method: fresh ? "POST" : "PUT",
//       body: JSON.stringify(body),
//     });
//     console.info(response);
//     return true;
//   } catch (error) {
//     return false;
//   }
// };

// // delete geneset
// export const destroy = async (id: string) => {
//   const url = `${mygeneset}/user_geneset/${id}`;
//   try {
//     const response = await request(url, { method: "DELETE" });
//     console.info(response);
//     return true;
//   } catch (error) {
//     return false;
//   }
// };

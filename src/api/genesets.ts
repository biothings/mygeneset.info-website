import { request } from ".";
import { mygeneset } from ".";
import { _Gene, Gene, mapGene } from "./genes";

// from backend
export interface _Geneset {
  _id?: number;
  name?: string;
  author?: string;
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
  updated: string;
  description: string;
  isPublic: boolean;
  genes: Array<Gene>;
}

// convert backend format to desired frontend format
const mapGeneset = (geneset: _Geneset): Geneset => ({
  id: String(geneset._id || ""),
  name: geneset.name || "",
  author: geneset.author || "",
  updated: geneset.updated || new Date().toISOString(),
  description: geneset.description || "",
  isPublic: !!geneset.is_public,
  genes: geneset.genes?.map(mapGene) || [],
});

// // look up geneset from id
// export const lookup = async (id: string): Promise<Geneset> => {
//   // params
//   const params = new URLSearchParams();
//   params.set(
//     "always_list",
//     "genes,genes.symbol,genes.ensemblgene,genes.uniprot"
//   );

//   // request
//   const url = `${mygeneset}/geneset/${id}?${params.toString()}`;
//   try {
//     return await request(url);
//   } catch (error) {
//     console.error(error);
//     return {};
//   }
// };

// search genesets by keyword, species, etc
export const searchGenesets = async (
  query?: string,
  species?: Array<string>,
  sort?: string
): Promise<SearchResult> => {
  // params
  const params = new URLSearchParams();

  // dynamic params
  if (query) params.set("q", query);
  if (species?.length) params.set("species", species.join(","));
  if (sort) params.set("sort", sort);

  // static params
  params.set("fields", "all");
  params.set("size", "100");
  params.set(
    "always_list",
    [
      "genes",
      "genes.alias",
      "genes.symbol",
      "genes.entrezgene",
      "genes.ensembl",
      "genes.uniprot",
    ].join(",")
  );

  // request
  const url = `${mygeneset}/query?${params.toString()}`;
  const { total = 0, hits = [] } = await request<SearchResponse>(url);

  return { total, genesets: hits.map(mapGeneset) };
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

// get list of genesets in order of date update
export const getRecentGenesets = async (): Promise<Array<Geneset>> =>
  (await searchGenesets("", [], "updated")).genesets;

// get number of public genesets
export const getPublicGenesetCount = async (): Promise<number> =>
  (await searchGenesets("_exists_:author")).total;

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

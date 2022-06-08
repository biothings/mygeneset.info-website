import { request } from ".";
import { mygene } from ".";

// from backend
export interface _Gene {
  _id?: string;
  mygene_id?: string;
  name?: string;
  taxid?: string;
  alias?: Array<string>;
  symbol?: Array<string>;
  entrezgene?: Array<string>;
  ensemblgene?: Array<string>;
  uniprot?: Array<string | { "Swiss-Prot": string }>;
  notfound?: boolean;
}

// for frontend
export interface Gene {
  id: string;
  name: string;
  taxid: string;
  alias: Array<string>;
  symbol: Array<string>;
  entrezgene: Array<string>;
  ensemblgene: Array<string>;
  uniprot: Array<string>;
}

// convert backend format to desired frontend format
export const mapGene = (gene: _Gene): Gene => ({
  id: gene._id || gene.mygene_id || "",
  name: gene.name || "",
  taxid: gene.taxid || "",
  alias: gene.alias || [],
  entrezgene: gene.entrezgene || [],
  symbol: gene.symbol || [],
  ensemblgene: gene.ensemblgene || [],
  uniprot:
    gene.uniprot
      ?.map((u) => (typeof u === "string" ? u : u["Swiss-Prot"]))
      ?.filter((u) => u) || [],
});

// search genes by keyword
export const searchGenes = async (
  query?: string | Array<string>,
  species?: Array<string>,
  sort?: string,
  start?: number,
  perPage?: number
): Promise<SearchResult> => {
  // params
  const params = new URLSearchParams();

  // dynamic params
  let method;
  if (Array.isArray(query)) {
    params.set("q", query.join());
    method = "POST";
  } else if (query) {
    params.set("q", query);
  }
  if (species?.length) params.set("species", species.join(","));
  if (sort) params.set("sort", sort);
  if (start) params.set("from", String(start));
  if (perPage) params.set("size", String(perPage));
  else params.set("size", "100");

  // static params
  params.set("fields", "all");
  params.set(
    "scopes",
    [
      "gene",
      "_id",
      "alias",
      "entrezgene",
      "symbol",
      "ensemblgene",
      "uniprot",
    ].join(",")
  );
  params.set(
    "always_list",
    ["alias", "entrezgene", "symbol", "ensemblgene", "uniprot"].join(",")
  );

  // query
  const url = `${mygene}/query?${params.toString()}`;
  const response = await request<SearchResponse>(url, { method });

  if (Array.isArray(response))
    return { total: response.length, genes: response.map(mapGene) };
  else
    return {
      total: response.total,
      genes: response.hits.filter((hit) => !hit.notfound).map(mapGene),
    };
};

// from backend
type SearchResponse =
  | Array<_Gene>
  | {
      hits: Array<_Gene>;
      total: number;
    };

// for frontend
export interface SearchResult {
  genes: Array<Gene>;
  total: number;
}

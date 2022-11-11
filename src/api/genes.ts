import { request } from ".";
import { mygene } from ".";

// from backend
export interface _Gene {
  _id?: string;
  mygene_id?: string;
  symbol?: Array<string>;
  name?: string;
  alias?: Array<string>;
  entrezgene?: Array<string>;
  ensemblgene?: Array<string>;
  uniprot?: Array<string | { "Swiss-Prot": string }>;
  taxid?: string;
  notfound?: boolean;
}

// for frontend
export interface Gene {
  id: string;
  symbol: Array<string>;
  name: string;
  alias: Array<string>;
  entrezgene: Array<string>;
  ensemblgene: Array<string>;
  uniprot: Array<string>;
  taxid: string;
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

// get displayable label for gene with fallbacks
export const getGeneLabel = (gene: Gene) =>
  gene.symbol[0] ||
  gene.name ||
  gene.id ||
  gene.alias[0] ||
  gene.entrezgene[0] ||
  gene.ensemblgene[0] ||
  gene.uniprot[0];

// get displayable tooltip for gene with more info
export const getGeneTooltip = (gene: Gene) =>
  [
    "Gene details:",
    "",
    "ID: " + (gene.id || "-"),
    "Symbol: " + (gene.symbol.join(", ") || "-"),
    "Name: " + (gene.name || "-"),
    "Alias: " + (gene.alias.join(", ") || "-"),
    "Entrez: " + (gene.entrezgene.join(", ") || "-"),
    "Ensembl: " + (gene.ensemblgene.join(", ") || "-"),
    "Uniprot: " + (gene.uniprot.join(", ") || "-"),
    "Taxon: " + (gene.taxid || "-"),
  ].join("<br/>");

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
    if (start) params.set("from", String(start));
    if (perPage) params.set("size", String(perPage));
    else params.set("size", "100");
  }
  if (species?.length) params.set("species", species.join(","));
  if (sort) params.set("sort", sort);

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
  const type = "searchGenes";
  const response = await request<SearchResponse>(url, type, { method });

  // distinguish between batch and single query
  if (Array.isArray(response)) {
    const list = response.filter((hit) => !hit.notfound);
    return {
      total: list.length,
      genes: list.map(mapGene).slice(start || 0, (start || 0) + (perPage || 0)),
    };
  } else
    return {
      total: response.total,
      genes: response.hits.map(mapGene),
    };
};

// from backend
type SearchResponse =
  | {
      hits: Array<_Gene>;
      total: number;
    }
  | Array<_Gene>;

// for frontend
export interface SearchResult {
  genes: Array<Gene>;
  total: number;
}

// make a gene identifier into pure string
export const flattenGeneId = (id: Gene[keyof Gene]): string => {
  // if array, only take first value
  if (Array.isArray(id)) return id[0];
  if (typeof id === "string") return id;
  return "";
};

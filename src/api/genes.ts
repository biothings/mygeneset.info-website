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
  ensembl?: { gene: Array<string> };
  uniprot?: Array<string | { "Swiss-Prot": string }>;
  taxid?: number;
  notfound?: boolean;
}

// for frontend
export interface Gene {
  id: string;
  symbol: Array<string>;
  name: string;
  alias: Array<string>;
  entrez: Array<string>;
  ensembl: Array<string>;
  uniprot: Array<string>;
  taxid: string;
  species?: Array<string>;
}

// convert backend format to desired frontend format
export const mapGene = (gene: _Gene): Gene => ({
  id: gene._id || gene.mygene_id || "",
  symbol: gene.symbol || [],
  name: gene.name || "",
  alias: gene.alias || [],
  entrez: gene.entrezgene || [],
  ensembl: gene.ensemblgene || gene.ensembl?.gene || [],
  uniprot:
    gene.uniprot
      ?.map((u) => (typeof u === "string" ? u : u["Swiss-Prot"]))
      ?.filter((u) => u) || [],
  taxid: String(gene.taxid) || "",
});

// get displayable label for gene with fallbacks
export const getGeneLabel = (gene: Gene) =>
  gene.symbol[0] ||
  gene.name ||
  gene.id ||
  gene.alias[0] ||
  gene.entrez[0] ||
  gene.ensembl[0] ||
  gene.uniprot[0];

const biogps = "http://biogps.org/#goto=genereport&id=";

// get displayable tooltip for gene with more info
export const getGeneTooltip = (gene: Gene) =>
  `
<table>
<tr><th>Gene details</th></tr>
<tr><td><b>ID</b></td><td>${gene.id || "-"}</td></tr>
<tr><td><b>Symbol</b></td><td>${gene.symbol.join(", ") || "-"}</td></tr>
<tr><td><b>Name</b></td><td>${gene.name || "-"}</td></tr>
<tr><td><b>Alias</b></td><td>${gene.alias.join(", ") || "-"}</td></tr>
<tr><td><b>Entrez</b></td><td>${gene.entrez.join(", ") || "-"}</td></tr>
<tr><td><b>Ensembl</b></td><td>${gene.ensembl.join(", ") || "-"}</td></tr>
<tr><td><b>Uniprot</b></td><td>${gene.uniprot.join(", ") || "-"}</td></tr>
<tr><td><b>Taxon</b></td><td>${gene.taxid || "-"}</td></tr>
<tr><td><b>Links</b></td><td>
<a href="${biogps}${gene.id || "-"}" target="_blank">on BioGPS</a>
</td></tr>
</table>
`;

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
    params.set("q", query.join(","));
    method = "POST";
  } else {
    if (query) params.set("q", query);
    params.set("from", String(start || 0));
    params.set("size", String(perPage || 100));
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
  let string = "";
  // if array, only take first value
  if (Array.isArray(id) && id[0]) string = id[0];
  if (typeof id === "string") string = id;
  if (typeof id === "number") string = String(id);
  // get rid of chars that would interfere with csv/tsv
  return string.replaceAll(/[,|\t]/g, "");
};

import { request } from ".";
import { mygene } from ".";

// from backend
export interface _Gene {
  _id?: string;
  mygene_id?: string;
  symbol?: Array<string>;
  name?: string;
  alias?: Array<string>;
  ncbigene?: Array<string>;
  entrezgene?: Array<string>;
  ensemblgene?: Array<string>;
  ensembl?: { gene: Array<string> };
  uniprot?: Array<string | { "Swiss-Prot": string } | { TrEMBL: string }>;
  taxid?: number;
  notfound?: boolean;
}

// for frontend
export interface Gene {
  id: string;
  symbol: Array<string>;
  name: string;
  alias: Array<string>;
  ncbi: Array<string>;
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
  ncbi: gene.ncbigene || gene.entrezgene || [],
  ensembl: gene.ensemblgene || gene.ensembl?.gene || [],
  uniprot:
    gene.uniprot
      ?.map((u) => {
        if (typeof u === "string") return u;
        if ("Swiss-Prot" in u) return u["Swiss-Prot"];
        if ("TrEMBL" in u) return u["TrEMBL"];
        return "";
      })
      ?.filter(Boolean) || [],
  taxid: String(gene.taxid) || "",
});

// get displayable label for gene with fallbacks
export const getGeneLabel = (gene: Gene) =>
  gene.symbol[0] ||
  gene.name ||
  gene.id ||
  gene.alias[0] ||
  gene.ncbi[0] ||
  gene.ensembl[0] ||
  gene.uniprot[0];

const biogps = "http://biogps.org/#goto=genereport&id=";

// get displayable tooltip for gene with more info
export const getGeneTooltip = (gene: Gene) =>
  `
<div style="display: grid; grid-template-columns: auto auto; gap: 5px 20px;">
<b style="grid-column: 1 / -1;">Gene details</b>
<b>ID</b>
<span>${gene.id || "-"}</span>
<b>Symbol</b>
<span>${gene.symbol.join(", ") || "-"}</span>
<b>Name</b>
<span>${gene.name || "-"}</span>
<b>Alias</b>
<span>${gene.alias.join(", ") || "-"}</span>
<b>NCBI</b>
<a href="https://www.ncbi.nlm.nih.gov/gene/${gene.ncbi[0] || ""}">
${gene.ncbi.join(", ") || "-"}
</a>
<b>Ensembl</b>
<span>${gene.ensembl.join(", ") || "-"}</span>
<b>Uniprot</b>
<a href="http://www.uniprot.org/uniprot/${gene.uniprot[0] || ""}">
${gene.uniprot.join(", ") || "-"}
</a>
<b>Taxon</b>
<span>${gene.taxid || "-"}</span>
<b>BioGPS</b>
<a href="${biogps}${gene.id || "-"}" target="_blank">link</a>
</div>
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
      "_id",
      "symbol",
      "gene",
      "alias",
      "ncbigene",
      "entrezgene",
      "ensemblgene",
      "uniprot",
    ].join(",")
  );
  params.set(
    "always_list",
    ["symbol", "alias", "entrezgene", "ensembl", "ensemblgene", "uniprot"].join(
      ","
    )
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

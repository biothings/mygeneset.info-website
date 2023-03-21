import { uniq } from "lodash";
import { request } from ".";
import { mygeneset } from ".";
import { biothings } from ".";

// from backend
export interface _Species {
  _id?: string;
  taxid?: number;
  scientific_name?: string;
  common_name?: Array<string>;
  uniprot_name?: Array<string>;
  genbank_common_name?: Array<string>;
  other_names?: Array<string>;
  notfound?: boolean;
}

// for frontend
export interface Species {
  id: string;
  scientific: string;
  common: Array<string>;
  uniprot: Array<string>;
  genbank: Array<string>;
  other: Array<string>;
  secondary: Array<string>; // combination of all "secondary" names (everything but scientific)
  icon: string;
}

// convert backend format to desired frontend format
const mapSpecies = (species: _Species): Species => ({
  id: species._id || String(species.taxid) || "",
  scientific: species.scientific_name || "",
  common: species.common_name || [],
  uniprot: species.uniprot_name || [],
  genbank: species.genbank_common_name || [],
  other: species.other_names || [],
  secondary: uniq(
    [
      species.common_name,
      species.genbank_common_name,
      species.uniprot_name,
      species.other_names,
    ].flat()
  ).filter(
    (name) => !!name && name !== species.scientific_name
  ) as Array<string>,
  icon: species.scientific_name || "",
});

// get displayable label for species with fallbacks
export const getSpeciesLabel = (species: Species) =>
  species.scientific || species.id;

// get displayable tooltip for species with more info
export const getSpeciesTooltip = (species: Species) =>
  `
<div style="display: grid; grid-template-columns: auto auto; gap: 5px 20px;">
<b style="grid-column: 1 / -1;">Species details</b>
<b>ID</b>
<span>${species.id || "-"}</span>
<b>Scientific name</b>
<span>${species.scientific || "-"}</span>
<b>Common names</b>
<span>${species.common.join(", ") || "-"}</span>
<b>Uniprot names</b>
<span>${species.uniprot.join(", ") || "-"}</span>
<b>GenBank names</b>
<span>${species.genbank.join(", ") || "-"}</span>
<b>Other names</b>
<span>${species.other.join(", ") || "-"}</span>
</div>
`;

// add weights to certain types of species names
const weightedQuery = (query: string) => {
  console.log(query);
  const weights: Partial<Record<keyof _Species, number>> = {
    taxid: 10,
    scientific_name: 8,
    uniprot_name: 6,
    genbank_common_name: 1,
    common_name: 1,
    other_names: 1,
  };
  return Object.entries(weights)
    .map(([key, weight]) => `${key}:"${query}"^${weight}`)
    .join(" OR ");
};

// search for species by keyword
export const searchSpecies = async (
  query?: string | Array<string>,
  weighted = false
): Promise<SearchResult> => {
  // params
  const params = new URLSearchParams();

  // weight function
  const weightFunc = weighted ? weightedQuery : (query: string) => query;

  // dynamic params
  let method;
  if (query) {
    if (Array.isArray(query)) {
      params.set("q", query.map(weightFunc).join(","));
      method = "POST";
    } else params.set("q", weightFunc(query));
  } else {
    params.set("q", (await getPopularSpecies()).join(","));
    method = "POST";
  }

  // static params
  params.set("fields", "all");
  params.set("size", "100");
  params.set(
    "always_list",
    ["common_name", "uniprot_name", "genbank_common_name", "other_names"].join(
      ","
    )
  );

  // request
  const url = `${biothings}/query?${params.toString()}`;
  const type = "searchSpecies";
  const response = await request<SearchResponse>(url, type, { method });

  console.log(url);

  // distinguish between batch and single query
  if (Array.isArray(response)) {
    const list = response.filter((hit) => !hit.notfound);
    return { total: list.length, species: list.map(mapSpecies) };
  } else
    return { total: response.total, species: response.hits.map(mapSpecies) };
};

// from backend
type SearchResponse =
  | {
      hits: Array<_Species>;
      total: number;
    }
  | Array<_Species>;

// for frontend
export interface SearchResult {
  species: Array<Species>;
  total: number;
}

// get species taxon ids in order of included in most genesets
export const getPopularSpecies = async (): Promise<PopularResult> => {
  // params
  const params = new URLSearchParams();
  params.set("q", "*");
  params.set("facets", "taxid");
  params.set("facet_size", "100");

  // request and parse results
  const url = `${mygeneset}/query?${params.toString()}`;
  const type = "getPopularSpecies";
  const response = await request<PopularResponse>(url, type);
  return response.facets.taxid.terms.map(({ term }) => term);
};

// from backend
interface PopularResponse {
  facets: {
    taxid: {
      terms: Array<{ term: number }>;
    };
  };
}

// for frontend
type PopularResult = Array<number>;

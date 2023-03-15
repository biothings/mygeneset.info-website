import { request } from ".";
import { mygeneset } from ".";
import { biothings } from ".";

// from backend
export interface _Species {
  _id?: number;
  scientific_name?: string;
  genbank_common_name?: Array<string>;
  common_name?: Array<string>;
  other_names?: Array<string>;
  notfound?: boolean;
}

// for frontend
export interface Species {
  id: string;
  common: string;
  scientific: string;
  icon: string;
}

// convert backend format to desired frontend format
const mapSpecies = (species: _Species): Species => ({
  id: String(species._id) || "",
  common: [
    species.genbank_common_name,
    species.common_name,
    species.other_names,
  ]
    .flat()
    .filter((name) => name)
    .join(", "),
  scientific: species.scientific_name || "",
  icon: species.scientific_name || "",
});

// get displayable label for species with fallbacks
export const getSpeciesLabel = (species: Species) =>
  species.common || species.scientific || species.id;

// get displayable tooltip for species with more info
export const getSpeciesTooltip = (species: Species) =>
  `
<table>
<tr><th>Species details</th></tr>
<tr><td><b>ID</b></td><td>${species.id || "-"}</td></tr>
<tr><td><b>Common</b></td><td>${species.common || "-"}</td></tr>
<tr><td><b>Scientific</b></td><td>${species.scientific || "-"}</td></tr>
</td></tr>
</table>
`;

// search for species by keyword
export const searchSpecies = async (
  query?: string | Array<string>
): Promise<SearchResult> => {
  // params
  const params = new URLSearchParams();

  // dynamic params
  let method;
  if (query) {
    if (Array.isArray(query)) {
      params.set("q", query.join());
      method = "POST";
    } else params.set("q", query);
  } else {
    params.set("q", (await getPopularSpecies()).join(","));
    method = "POST";
  }

  // static params
  params.set("fields", "all");
  params.set("size", "100");
  params.set(
    "always_list",
    ["genbank_common_name", "common_name", "other_names"].join(",")
  );

  // request
  const url = `${biothings}/query?${params.toString()}`;
  const type = "searchSpecies";
  const response = await request<SearchResponse>(url, type, { method });

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

import { request } from ".";
import { mygeneset } from ".";
import { biothings } from ".";

// from backend
export interface _Species {
  _id?: string;
  scientific_name?: string;
  genbank_common_name?: Array<string>;
  common_name?: Array<string>;
  other_names?: Array<string>;
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
  id: species._id || "",
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

// search for species by keyword
export const searchSpecies = async (query?: string): Promise<SearchResult> => {
  // params
  const params = new URLSearchParams();

  // dynamic params
  let method;
  if (query) {
    params.set("q", query);
  } else {
    method = "POST";
    params.set("q", (await getPopularSpecies()).join(","));
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

  if (Array.isArray(response))
    return { total: response.length, species: response.map(mapSpecies) };
  else return { total: response.total, species: response.hits.map(mapSpecies) };
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

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
  if (query) params.set("q", query);
  else params.set("q", (await getPopularSpecies()).join(","));

  // static params
  params.set("fields", "all");
  params.set("size", "100");
  params.set(
    "always_list",
    ["genbank_common_name", "common_name", "other_names"].join(",")
  );

  // request
  const url = `${biothings}/query?${params.toString()}`;
  const { total = 0, hits = [] } = await request<SearchResponse>(url);

  console.log(hits);

  return { total, species: hits.map(mapSpecies) };
};

// from backend
interface SearchResponse {
  hits: Array<_Species>;
  total: number;
}

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
  const response = await request<PopularResponse>(url);
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

// request types
// eslint-disable-next-line
export type Json = Record<string, any>;
export type Response = Promise<Json>;

// expected type for genes
export interface Gene {
  // from api
  mygene_id: string;
  name: string;
  ensemblgene: string;
  ncbigene: string;
  uniprot: string;
}

// expected type for geneset
export interface Geneset {
  // from api
  _id?: string;
  creator?: string;
  date?: string;
  description?: string;
  is_public?: boolean;
  genes?: Gene | Gene[];
}

// expected type of species
export interface Species {
  // from api
  _id?: string;
  scientific_name?: string;
  genbank_common_name?: string | string[];
  common_name?: string | string[];
  other_names?: string | string[];

  // app-specific
  common?: string;
  full?: string;
  icon?: string;
}

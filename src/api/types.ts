// expected type for genes
export interface Gene {
  // from api
  mygene_id: string;
  name: string;
  ensemblgene: string;
  ncbigene: string;
  uniprot: string;

  // from app
  total?: number;
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

  // from app
  total?: number;
}

// expected type of species
export interface Species {
  // from api
  _id?: string;
  scientific_name?: string;
  genbank_common_name?: string | string[];
  common_name?: string | string[];
  other_names?: string | string[];

  // from app
  total?: number;
  common?: string;
  full?: string;
  icon?: string;
}

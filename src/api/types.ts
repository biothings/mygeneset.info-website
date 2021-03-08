// expected type for genes in genesets
export interface GenesetGene {
  // from api
  mygene_id: string;
  name: string;
  ensemblgene: string;
  ncbigene: string;
  uniprot: string;

  // from app
  total?: number;
}

// expected type for genesets from mygeneset.info
export interface Geneset {
  // from api
  _id?: string;
  creator?: string;
  date?: string;
  description?: string;
  is_public?: boolean;
  genes?: GenesetGene | GenesetGene[];

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

// expected type for genes from mygene.info
export interface Gene {
  // from api
  _id?: string;
  name?: string;
  taxid?: number;
  entrezgene?: string;
  symbol?: string;

  // from app
  total?: number;
}

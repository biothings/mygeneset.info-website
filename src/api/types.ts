// expected type for genesets from mygeneset.info
export interface Geneset {
  // from api
  _id?: string;
  name?: string;
  creator?: string;
  date?: string;
  description?: string;
  is_public?: boolean;
  genes?: Gene[];

  // from app
  total?: number;
}

// expected type of species
export interface Species {
  // from api
  _id?: string;
  scientific_name?: string;
  genbank_common_name?: string[];
  common_name?: string[];
  other_names?: string[];

  // from app
  total?: number;
  common?: string;
  full?: string;
  icon?: string;
}

// expected type for genes
export interface Gene {
  // from api
  mygene_id?: string;
  name?: string;
  alias?: string[];
  symbol?: string[];
  ncbigene?: string;
  ensemblgene?: string[];
  uniprot?: string[];
  notfound?: boolean;

  // from app
  total?: number;
  selected?: boolean;
  // eslint-disable-next-line
  [key: string]: any;
}

// gene from mygene api
export interface MyGene {
  // from api
  _id?: string;
  name?: string;
  alias?: string[];
  symbol?: string[];
  ncbigene?: string;
  ensembl?: { gene?: string }[];
  entrezgene?: string;
  uniprot?: { "Swiss-Prot": string }[];
  notfound?: boolean;

  // from app
  total?: number;
}

// convert gene from mygene api to gene from mygeneset api
export const mapGene = (myGene: MyGene): Gene => ({
  // from api
  // eslint-disable-next-line
  mygene_id: myGene._id,
  name: myGene.name,
  alias: myGene.alias,
  symbol: myGene.symbol,
  ncbigene: myGene.entrezgene,
  ensemblgene: (myGene.ensembl || []).map(e => e.gene || ""),
  uniprot: (myGene.uniprot || []).map(u => (u || {})["Swiss-Prot"] || ""),
  notfound: myGene.notfound,

  // from app
  total: myGene.total
});

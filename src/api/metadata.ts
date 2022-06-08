import { mapValues } from "lodash";
import { mygeneset, request } from ".";
import { searchGenesets } from "./genesets";

const usageUrl =
  "https://biothings-data.s3.us-west-2.amazonaws.com/stats/biothings_30day_usage.json";

// get metadata about mygenset.info
export const getMetadata = async (): Promise<MetadataResult> => {
  // get metadata info
  const url = `${mygeneset}/metadata`;
  const response = await request<MetadataResponse>(url);

  // calculate geneset numbers
  const totalGenesets = response.stats.total;
  const curatedGenesets = Object.entries(response.src)
    .map(([key, { stats }]) => stats[key])
    .reduce((total, value) => total + value, 0);
  const userGenesets = totalGenesets - curatedGenesets;
  const publicUserGenesets = (await searchGenesets("_exists_:author")).total;
  const privateUserGenesets = userGenesets - publicUserGenesets;

  // get usage metadata
  let usage: UsageMetadataResponse = {};
  try {
    usage = await request<UsageMetadataResponse>(usageUrl);
  } catch (error) {
    console.error(error);
  }

  return {
    totalGenesets,
    userGenesets,
    publicUserGenesets,
    privateUserGenesets,
    curatedGenesets,
    requests: usage["mygene.info"]?.no_of_requests || 0,
    ips: usage["mygene.info"]?.no_of_unique_ips || 0,
    curatedMeta: mapValues(response.src, (value) => ({
      url: value.url || "",
      logo: value.logo || "",
    })),
  };
};

// from backend
interface MetadataResponse {
  stats: {
    total: number;
  };
  src: {
    [key: string]: {
      stats: {
        [key: string]: number;
      };
      url?: string;
      logo?: string;
    };
  };
}

// from backend
interface UsageMetadataResponse {
  [key: string]: {
    no_of_requests: number;
    no_of_unique_ips: number;
  };
}

// for frontend
export interface MetadataResult {
  // total number of genesets
  totalGenesets: number;
  // number of user genesets
  userGenesets: number;
  // number of public user genesets
  publicUserGenesets: number;
  // number of private user genesets
  privateUserGenesets: number;
  // number of curated genesets
  curatedGenesets: number;
  // number of requests in last 30 days
  requests: number;
  // number of unique IP addresses in last 30 days
  ips: number;
  // metadata about curated genesets
  curatedMeta: {
    [key: string]: {
      url: string;
      logo: string;
    };
  };
}

import { mapValues } from "lodash";
import { mygeneset, request } from ".";
import { searchGenesets } from "./genesets";

const usageUrl =
  "https://biothings-data.s3.us-west-2.amazonaws.com/stats/biothings_30day_usage.json";

// get metadata about mygenset.info
export const getMetadata = async (): Promise<Metadata> => {
  // get metadata info
  const url = `${mygeneset}/metadata`;
  const type = "getMetadata";
  const response = await request<_Metadata>(url, type);

  console.log(response);

  // calculate geneset numbers
  const totalGenesets = response.stats.total;
  const curatedGenesets = Object.entries(response.src)
    .map(([key, { stats }]) => stats[key])
    .reduce((total, value) => total + value, 0);
  const userGenesets = totalGenesets - curatedGenesets;
  const publicUserGenesets = (
    await searchGenesets("getPublicUserGenesets", "_exists_:author")
  ).total;
  const privateUserGenesets = userGenesets - publicUserGenesets;

  // other metadata
  const curatedSources = Object.keys(response.src);

  // get usage metadata
  let usage: _Usage = {};
  try {
    usage = await request<_Usage>(usageUrl, "getUsage");
  } catch (error) {
    console.error(error);
  }

  return {
    totalGenesets,
    userGenesets,
    publicUserGenesets,
    privateUserGenesets,
    curatedGenesets,
    curatedSources,
    requests: usage["mygeneset.info"]?.no_of_requests || 0,
    ips: usage["mygeneset.info"]?.no_of_unique_ips || 0,
    curatedMeta: mapValues(response.src, (value) => ({
      url: value.url || "",
      logo: value.logo || "",
      uploaded: value.upload_date ? new Date(value.upload_date) : undefined,
      downloaded: value.download_date
        ? new Date(value.download_date)
        : undefined,
    })),
  };
};

// from backend
interface _Metadata {
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
      upload_date?: string;
      download_date?: string;
    };
  };
}

// from backend
interface _Usage {
  [key: string]: {
    no_of_requests: number;
    no_of_unique_ips: number;
  };
}

// for frontend
export interface Metadata {
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
  // names/keys of distinct sources for curated genesets
  curatedSources: Array<string>;
  // number of requests in last 30 days
  requests: number;
  // number of unique IP addresses in last 30 days
  ips: number;
  // metadata about curated genesets
  curatedMeta: {
    [key: string]: {
      url?: string;
      logo?: string;
      uploaded?: Date;
      downloaded?: Date;
    };
  };
}

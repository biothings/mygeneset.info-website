import { mapValues } from "lodash";
import { mygeneset, request } from ".";

const usageUrl =
  "https://biothings-data.s3.us-west-2.amazonaws.com/stats/biothings_30day_usage.json";

// get metadata about mygenset.info
export const getMetadata = async (): Promise<Metadata> => {
  // get metadata info
  const url = `${mygeneset}/metadata`;
  const type = "getMetadata";
  const response = await request<_Metadata>(url, type);

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
    stats: response.stats,
    curatedSources,
    requests: usage["mygeneset.info"]?.no_of_requests || 0,
    ips: usage["mygeneset.info"]?.no_of_unique_ips || 0,
    curatedMeta: mapValues(response.src, (value, key) => ({
      name: value.description || "",
      url: value.url || "",
      logo: value.logo || "",
      count: value.stats[key] || 0,
      version: value.version || "",
      downloaded: value.download_date
        ? new Date(value.download_date)
        : undefined,
      uploaded: value.upload_date ? new Date(value.upload_date) : undefined,
      license: value.license || "",
      licenseUrl: value.license_url || "",
    })),
  };
};

// from backend
interface _Metadata {
  stats: {
    total: number;
    curated: number;
    user: number;
    anonymous: number;
  };
  src: {
    [key: string]: {
      stats: {
        [key: string]: number;
      };
      description?: string;
      url?: string;
      logo?: string;
      version?: string;
      download_date?: string;
      upload_date?: string;
      license?: string;
      license_url?: string;
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
  // numbers of genesets
  stats: {
    total: number;
    curated: number;
    user: number;
    anonymous: number;
  };
  // names/keys of distinct sources for curated genesets
  curatedSources: Array<string>;
  // number of requests in last 30 days
  requests: number;
  // number of unique IP addresses in last 30 days
  ips: number;
  // metadata about curated genesets
  curatedMeta: {
    [key: string]: {
      name: string;
      url: string;
      logo: string;
      count: number;
      version: string;
      downloaded?: Date;
      uploaded?: Date;
      license: string;
      licenseUrl: string;
    };
  };
}

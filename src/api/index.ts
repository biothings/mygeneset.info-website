// api endpoint base urls
export const biothings = "https://t.biothings.io/v1/";
export const mygeneset = "http://localhost:8000/v1/";
export const mygenesetRoot = "http://localhost:8000/";
export const mygene = "https://mygene.info/v3/";

// make request and get json results
export const request = async (url: string, options: RequestInit = {}) => {
  // merge headers
  const headers = new Headers(options.headers);
  headers.append("pragma", "no-cache");
  headers.append("cache-control", "no-cache");
  options.headers = headers;

  // method
  if (!options.method) options.method = "GET";

  // other options
  options.cache = "no-store";

  // make request and parse response
  const response = await fetch(url, options);
  if (!response?.ok) throw new Error(`Response not ok`);
  const results = response.json();
  return results;
};

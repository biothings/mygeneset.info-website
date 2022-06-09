// api endpoint base urls
export const biothings = "https://t.biothings.io/v1";
export const mygeneset = "https://mygeneset.info/v1";
export const mygene = "https://mygene.info/v3";

// make request and get json results
export const request = async <Response>(
  // url to request
  url: string,
  // type of request used to de-dupe (only keep latest of this type)
  type: string,
  // fetch options
  options: RequestInit = {}
): Promise<Response> => {
  // merge headers
  const headers = new Headers(options.headers);
  headers.append("pragma", "no-cache");
  headers.append("cache-control", "no-cache");
  options.headers = headers;

  // method
  if (!options.method) options.method = "GET";

  // other options
  options.cache = "no-store";

  // log unique id for request
  const id = newRequest(type);

  // make request
  const response = await fetch(url, options);

  // check if request is still latest of type
  if (!latestRequest(type, id)) throw new Error("Stale request");

  // parse response
  if (!response?.ok) throw new Error("Response not ok");
  const results = response.json();
  return results;
};

// hold the latest call for each type of request
const cache: Record<string, symbol> = {};
const newRequest = (type: string): symbol => {
  const id = Symbol();
  cache[type] = id;
  return id;
};
const latestRequest = (type: string, id: symbol) => cache[type] === id;

// check if error is due to request being stale
export const isStale = (error: unknown) =>
  error instanceof Error ? error.message.match(/stale/i) : false;

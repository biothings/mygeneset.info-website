// api endpoint base urls
export const mygeneset = "https://mygeneset.info/v1/";
export const biothings = "https://t.biothings.io/v1/";

// eslint-disable-next-line
export type Json = Record<string, any>;
export type Response = Promise<Json>;

export const request = async (url: string, method = "GET"): Response => {
  console.log(method + " " + url);
  let response;
  try {
    response = await fetch(url, { method });
  } catch (error) {
    throw new Error(`Fetch failed`);
  }
  if (!response?.ok) throw new Error(`Response not ok`);
  let results;
  try {
    results = response.json();
  } catch (error) {
    throw new Error("JSON failed");
  }
  return results;
};

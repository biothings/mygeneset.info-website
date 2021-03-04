// api endpoint base urls
export const mygeneset = "https://mygeneset.info/v1/";
export const biothings = "https://t.biothings.io/v1/";

// make request and get json results
export const request = async (url: string, method = "GET") => {
  console.log(method + " " + url);
  const response = await fetch(url, { method });
  if (!response?.ok) throw new Error(`Response not ok`);
  const results = response.json();
  return results;
};
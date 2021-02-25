// api endpoint base urls
export const mygeneset = "https://mygeneset.info/v1/";
export const biothings = "http://t.biothings.io/v1/";

// eslint-disable-next-line
export type Json = Record<string, any>;
export type Response = Promise<Json>;

export const request = async (url: string): Response => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error();
    const json = await response.json();
    if (typeof json === "object" && !Array.isArray(json)) return json;
    else throw new Error();
  } catch (error) {
    throw new Error(`Couldn't complete request\n${url}`);
  }
};

// eslint-disable-next-line
export type Json = Record<string, any>;
export type Response = Promise<Json | Error>;

export const request = async (url: string): Response => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error();
    const json = await response.json();
    if (typeof json === "object" && !Array.isArray(json)) return json;
    else throw new Error();
  } catch (error) {
    return new Error(`Couldn't complete request\n${url}`);
  }
};

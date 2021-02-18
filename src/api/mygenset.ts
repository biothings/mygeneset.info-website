import { request } from "./";
import { Response } from "./";

const base = "https://mygeneset.info/v1/";

export const lookup = async (id: string): Response => {
  const url = base + "geneset/" + id;
  return await request(url);
};

export const metadata = async (): Response => {
  const url = base + "metadata";
  return await request(url);
};

export const search = async (query?: string, species?: string[]): Response => {
  const params = new URLSearchParams();
  if (query) params.set("q", query);
  if (species?.length) params.set("q", species.join(","));
  params.set("fields", "*");
  params.set("size", "100");
  const url = base + "query?" + params.toString();
  return (await request(url)).hits;
};

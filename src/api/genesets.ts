import { request } from ".";
import { Response } from ".";
import { mygeneset } from ".";

export const lookup = async (id: string): Response => {
  const url = mygeneset + "geneset/" + id;
  return await request(url);
};

export const metadata = async (): Response => {
  const url = mygeneset + "metadata";
  return await request(url);
};

export const search = async (query?: string, species?: string[]): Response => {
  const params = new URLSearchParams();
  if (query) params.set("q", query);
  if (species?.length) params.set("q", species.join(","));
  params.set("fields", "*");
  params.set("size", "100");
  const url = mygeneset + "query?" + params.toString();
  return (await request(url)).hits;
};

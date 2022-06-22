import { mygeneset, request } from ".";
import { searchGenesets } from "./genesets";

// mygeneset api root
const root = mygeneset.replaceAll(/\/v\d/g, "");

// login via github or orcid
export const login = async (method = "") => {
  window.location.href = `${root}/login/${method}`;
};

// logout
export const logout = async () => {
  window.location.href = `${root}/logout`;
};

// from backend
interface _User {
  username?: string;
  name?: string;
  email?: string;
  avatar_url?: string;
  organization?: string;
  oauth_provider?: string;
}

// for frontend
interface User {
  username?: string;
  name?: string;
  email?: string;
  avatar_url?: string;
  organization?: string;
  oauth_provider?: string;
  genesetCount: number;
}

// get user info and determine whether logged in or not
export const getUser = async (): Promise<User> => {
  const url = `${root}/user_info`;
  const type = "getUser";
  const response = await request<_User>(url, type);
  const user: User = response as User;
  if (user?.username) {
    const type = "getUserGenesetCount";
    const query = `author:${user.username}`;
    const response = await searchGenesets(type, query);
    user.genesetCount = response.total;
  }
  return user;
};

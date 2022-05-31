import { searchGenesets } from "./genesets";
import { mygeneset, request } from ".";

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

// get user info and determine whether logged in or not
export const getUser = async () => {
  try {
    const userInfo = await request(`${root}/user_info`);
    if (userInfo.username) {
      const userGenesets = await searchGenesets(`author:${userInfo.username}`);
      userInfo.genesets = userGenesets;
    }
    return userInfo;
  } catch (error) {
    return null;
  }
};

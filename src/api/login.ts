import { search } from "./genesets";
import { mygenesetRoot, request } from ".";

// login via github or orcid
export const login = async (method = "") => {
  window.location.href = `${mygenesetRoot}login/${method}`;
};

// logout
export const logout = async () => {
  window.location.href = `${mygenesetRoot}logout`;
};

// get user info and determine whether logged in or not
export const getUser = async () => {
  try {
    const userInfo = await request(`${mygenesetRoot}user_info`);
    if (userInfo.username) {
      const userGenesets = await search(`author:${userInfo.username}`);
      userInfo.genesets = userGenesets;
    }
    return userInfo;
  } catch (error) {
    return null;
  }
};

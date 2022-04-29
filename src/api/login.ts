import { mygenesetRoot, request } from ".";

// login via github or orcid
export const login = async (method = "") => {
  window.open(`${mygenesetRoot}login/${method}`);
};

// logout
export const logout = async () => {
  window.open(`${mygenesetRoot}logout`);
};

// get user info and determine whether logged in or not
export const getUser = async () => {
  try {
    return await request(`${mygenesetRoot}user_info`);
  } catch (error) {
    return null;
  }
};

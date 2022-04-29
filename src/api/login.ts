import { mygenesetRoot, request } from ".";

// login via github or orcid
export const login = async (method = "") => {
  try {
    return await request(`${mygenesetRoot}login/${method}`);
  } catch (error) {
    return null;
  }
};

// logout
export const logout = async () => {
  try {
    return await request(`${mygenesetRoot}logout}`);
  } catch (error) {
    return null;
  }
};
// get user info and determine whether logged in or not
export const getUser = async () => {
  try {
    return await request(`${mygenesetRoot}user_info`);
  } catch (error) {
    return null;
  }
};

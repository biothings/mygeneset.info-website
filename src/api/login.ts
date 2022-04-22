import { mygenesetRoot, request } from ".";

// get user info and determine whether logged in or not
export const getUser = async () => {
  try {
    return await request(`${mygenesetRoot}user_info`);
  } catch (error) {
    return null;
  }
};

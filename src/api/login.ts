import { mygenesetRoot, request } from ".";

// get user info and determine whether logged in or not
export const getUser = async () => {
  try {
    return await request(`${mygenesetRoot}user_info`);
  } catch (error) {
    return null;
  }
};

// login via one of supported oauth methods
export const logIn = async (method = "") => {
  try {
    await request(`${mygenesetRoot}login/${method}`);
  } catch (error) {
    console.error(error);
  }
};

// logout, clear user cookie
export const logOut = async () => {
  try {
    await request(`${mygenesetRoot}logout`);
  } catch (error) {
    console.error(error);
  }
};

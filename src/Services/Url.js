import axios from "axios";

export const baseURL = `https://upskilling-egypt.com:3006/api/v1`;
export const imgURL = `https://upskilling-egypt.com:3006/`;

export const axiosInstance = axios.create({
  baseURL,
  headers: { Authorization: localStorage.getItem("token") },
});

export const userUrl = {
  getUsers: `/Users/`,
  login: `/Users/Login`,
  register: `/Users/Register`,
  verify: `/Users/verify`,
  changePassword: `/Users/ChangePassword`,
  forgetPassword: `/Users/Reset/Request`,
  resetPassword: `/Users/Reset`,
  deleteUser: (id) => `/Users/${id}`,
};

export const categoriesUrl = {
  allCategories: `/Category/`,
  deleteCategory: (id) => `/Category/${id}`,
};

export const recipeUrl = {
  allRecipes: `/Recipe/`,
  deleteRecipe: (id) => `/Recipe/${id}`,
};
export const FavUrl = {
  AddToFav: `/userRecipe/`,
  getAllFav: `/userRecipe/`,
  deleteFav: (id) => `userRecipe/${id}`,
};

export const TagUrl = {
  getTags: `/tag/`,
};

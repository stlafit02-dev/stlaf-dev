import axios from "./axios";

export const getCategories = async (): Promise<string[]> => {
  const { data } = await axios.get("/Enums/categories");
  return data;
};

export const getPriorities = async (): Promise<string[]> => {
  const { data } = await axios.get("/Enums/priorities");
  return data;
};
import axios from "./axios";

export interface UserDto {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

export const getUsers = async (): Promise<UserDto[]> => {
  const response = await axios.get("/User");
  return response.data;
};
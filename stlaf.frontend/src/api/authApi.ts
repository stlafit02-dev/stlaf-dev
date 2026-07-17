import api from "./axios";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export async function login(data: LoginRequest) {
  const response = await api.post<LoginResponse>(
    "/Auth/login",
    data
  );

  return response.data;
}
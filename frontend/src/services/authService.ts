import api from "./api";
import type { IUser } from "../../interface";

interface RegisterData {
  username: string;
  email: string;
  password: string;
}

interface LoginData {
  email?: string;
  username?: string;
  password: string;
}

export class AuthService {
  static register = async (
    data: RegisterData
  ): Promise<{ message: string }> => {
    const response = await api.post("/auth/register", data);
    return response.data;
  };

  static login = async (data: LoginData): Promise<IUser> => {
    const response = await api.post("/auth/login", data);
    return response.data.data;
  };

  static logout = () => {
    localStorage.removeItem("token");
  };

  static refreshUser = async (): Promise<IUser> => {
    const response = await api.get("/auth/refresh-user");
    return response.data.data;
  };
}

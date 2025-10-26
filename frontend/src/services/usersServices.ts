import api from "./api";

export class UsersService {
  static getOtherUsers = async (url: string) => {
    const response = await api.get(url);
    return response.data;
  };

  static changePassword = async (data: { newPassword: string }) => {
    const response = await api.patch("/users/update-password", data);
    return response.data;
  };
}

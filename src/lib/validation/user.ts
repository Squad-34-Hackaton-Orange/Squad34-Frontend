import { api } from "../api";
import { User, create } from "../api/user";

export type GoogleCredencials = Partial<{
  family_name: string;
  given_name: string;
  email: string;
  picture: string;
  token: string;
}>;

export const handleGoogle = async (data: User) => {
  const response = await api.post(`/user/google/login`, data);
  return response.data;
};

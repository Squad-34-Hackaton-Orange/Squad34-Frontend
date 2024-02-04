import axios from "axios";
import Cookies from "js-cookie";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

export class Unauthorized extends Error {
  constructor() {
    super("Unauthorized");
  }
}

export class NotFoundError extends Error { };

export class BadRequest extends Error { };

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("AccessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(undefined, async (error) => {
  switch (error.response?.status) {
    case 401:
      throw new Unauthorized();
    case 404:
      throw new NotFoundError();
    case 400:
      throw new BadRequest();
    default:
      throw error;
  }
});
import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export class Unauthorized extends Error {
  constructor() {
    super("Unauthorized");
  }
}

export class NotFoundError extends Error { };

export class BadRequest extends Error { };

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
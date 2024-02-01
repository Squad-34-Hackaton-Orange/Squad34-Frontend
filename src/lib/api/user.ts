import { api } from ".";
import { Id } from "./id";
import { Project } from "./project";

type GetByIdParams = { id: Id };

export type User = Partial<{
  id: Id;
  name: string;
  last_name: string;
  email: string;
  password: string;
  country: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  project: Project[];
}>;

/**
 * Get a single user by id
 * @param id User id
 * @returns A promise of a user
 */
export const get = async ({ id }: GetByIdParams): Promise<User> => {
  return (await api.get(`/user/${id}`)).data;
}

/**
 * Create a new user
 * @param data User data
 * @returns A promise of a user
 */
export const create = async ({ name, last_name, email, password }: User): Promise<User> => {
  return (await api.post(`/user/sign`, {
    name,
    last_name,
    email,
    password
  })).data;
}

/**
 * Update a user
 * @param id User id
 * @param data User data
 * @returns A promise of a user
 */
export const update = async ({ id, ...data }: GetByIdParams & User): Promise<User> => {
  return (await api.patch(`/user/${id}`, data)).data;
}

/**
 * Delete a user
 * @param id User id
 * @returns A promise of a user
 */
export const remove = async ({ id }: GetByIdParams): Promise<void> => {
  return (await api.delete(`/user/${id}`)).data;
}

/**
 * Login a user
 * @param data User data
 * @returns A promise of a user
 */
export const login = async (email: string, password: string): Promise<User> => {
  return (await api.post(`/user/login`, { email, password })).data;
}

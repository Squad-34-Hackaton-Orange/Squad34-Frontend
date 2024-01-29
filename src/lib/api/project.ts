<<<<<<< HEAD
import { Tag } from "./tag"

export type Project = Partial<{
  id: number
  date_post: Date
  title: string
  description: string
  link: string
  id_user: number
  tag_id: number[]
  tag: Tag[]
  updated_at: Date
  deleted_at: Date
}>
=======
import { api } from ".";
import { Id } from "./id";
import { ProjectTag } from "./project-tag";
import { User } from "./user";

type GetByIdParams = { id: Id };
type GetByUserIdParams = { id: Id };

export type Project = Partial<{
  id: Id;
  date_post: Date;
  title: string;
  description: string;
  link: string;
  id_user: Id;
  user: User;
  ProjectTag: ProjectTag[];
}>;

/**
 * List all projects
 * @returns A promise of a list of projects
 */
export const list = async (): Promise<Project[]> => {
  return (await api.get(`/project`)).data;
};


/**
 * Get a single project by id
 * @param id Project id
 * @returns A promise of a project
 */
export const get = async ({ id }: GetByIdParams): Promise<Project> => {
  return (await api.get(`/project/${id}`)).data;
};


/**
 * Get all projects from a user
 * @param id User id
 * @returns A promise of a list of projects from a users
 */
export const getAllUserProjects = async ({ id }: GetByUserIdParams): Promise<Project[]> => {
  return (await api.get(`/project/user/${id}`)).data;
};


/**
 * Create a new project
 * @param data Project data
 * @returns A promise of a project
 */
export const create = async (data: Project): Promise<Project> => {
  return (await api.post(`/project`, data)).data;
};


/**
 * Update a project
 * @param id Project id
 * @param data Project data
 * @returns A promise of a project
 */
export const update = async ({ id, ...data }: GetByIdParams & Project): Promise<Project> => {
  return (await api.patch(`/project/${id}`, data)).data;
};


/**
 * Delete a project
 * @param id Project id
 * @returns A promise of a project
 */
export const remove = async ({ id }: GetByIdParams): Promise<void> => {
  return (await api.delete(`/project/${id}`)).data;
}
>>>>>>> develop

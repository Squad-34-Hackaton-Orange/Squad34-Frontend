import { api } from ".";
import { Id } from "./id";
import { ProjectTag } from "./project-tag";
import { Token } from "./token";
import { User } from "./user";

type GetByIdParams = { id: string };
type GetByUserIdParams = { id: Id };

export type Project = Partial<{
  id: Id;
  image: string;
  date_post: Date;
  title: string;
  description: string;
  link: string;
  id_user: Id;
  user: User;
  token: Token;
  projectTag: ProjectTag[];
}>;

/**
 * List all projects from all users
 * @returns A promise of a list of projects
 */
export const list = async ({ id }: User): Promise<Project[]> => {
  return (await api.get(`/project?userId=${id}`)).data;
};


/**
 * Get all projects from a user
 * @param id Project id
 * @returns A promise of a project
 */
export const get = async ({ id }: GetByIdParams): Promise<Project[]> => {
  return (await api.get(`/project/${id}/all`)).data;

  
};



/**
 * Get project from a user by id
 * @param id User id
 * @returns A promise of a list of projects from a users
 */
export const getProjectById = async ({ id, id_user }: Project): Promise<Project> => {
  const resume = await api.get(`/project/${id_user}/${id}/`);

  return resume.data
};


/**
 * Create a new project
 * @param data Project data
 * @returns A promise of a project
 */
export const create = async (data: Project): Promise<any> => {
  const resume = await api.post(`/project`, data);

  return {status: resume.status,
    data: resume.data};
};


/**
 * Update a project
 * @param id Project id
 * @param data Project data
 * @returns A promise of a project
 */
export const update = async ({ id, ...data }: GetByIdParams & Project): Promise<any> => {
   
  
  const resume = await api.put(`/project/${id}`, data)

  return {status: resume.status,
    data: resume.data};

};


/**
 * Delete a project
 * @param id Project id
 * @returns A promise of a project
 */
export const remove = async ({ id, id_user }: Project): Promise<any> => {
  const resume = await api.delete(`/project/${id_user}/${id}`)

  return {status: resume.status,
  data: resume.data};
}

import { api } from "."
import { Id } from "./id"
import { Project } from "./project"

export type Tag = Partial<{
  id: Id;
  userId: Id;
  name: string;
}>

/**
 * List all projects from all users
 * @returns A promise of a list of projects
 */
export const list = async ({ id }: Tag): Promise<Project[]> => {
  return (await api.get(`/tag?userId=${id}`)).data;
};

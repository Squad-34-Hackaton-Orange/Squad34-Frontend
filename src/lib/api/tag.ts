<<<<<<< HEAD
import { Project } from "./project"

export type Tag = Partial<{
  id: number
  name: string
  project_id: number[]
  project: Project[]
  created_at: Date
  updated_at: Date
  deleted_at: Date
}>
=======
import { Id } from "./id";
import { ProjectTag } from "./project-tag";

export type Tag = Partial<{
  id: Id;
  name: string;
  ProjectTag: ProjectTag[];
}>;  
>>>>>>> develop

import { Id } from "./id";
import { Project } from "./project";
import { Tag } from "./tag";

export type ProjectTag = Partial<{
  id_project: Id;
  id_tag: Id;
  project: Project;
  tag: Tag;
}>;
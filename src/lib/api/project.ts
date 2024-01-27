import { Id } from "./id";
import { ProjectTag } from "./project-tag";
import { User } from "./user";

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
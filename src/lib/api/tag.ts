import { Id } from "./id";
import { ProjectTag } from "./project-tag";

export type Tag = Partial<{
  id: Id;
  name: string;
  ProjectTag: ProjectTag[];
}>;  
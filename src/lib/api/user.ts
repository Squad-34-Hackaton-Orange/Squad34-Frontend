import { Id } from "./id";
import { Project } from "./project";

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

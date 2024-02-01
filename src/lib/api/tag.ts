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

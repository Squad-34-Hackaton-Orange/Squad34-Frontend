import { Project } from "./project"

export type User = Partial<{
  id: number
  name: string
  last_name: string
  email: string
  password: string
  country: string | undefined
  project_id: number[]
  project: Project[]
  created_at: Date
  updated_at: Date
  deleted_at: Date
}>
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
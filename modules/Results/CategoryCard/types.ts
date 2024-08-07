import { Category } from 'entities'

export interface CategoryCardProps {
  category: Category
}

export interface GroupListProps {
  id: string
  groupName: string
  actions?: any
}

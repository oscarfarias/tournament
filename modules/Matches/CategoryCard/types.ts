import { Category } from 'entities'

export interface CategoryCardProps {
  category: Category
}

export interface GroupListProps {
  id: string
  groupName: string
  matchesCount: number
  teamsCount: number
  isMatchable: boolean
  actions?: any
}

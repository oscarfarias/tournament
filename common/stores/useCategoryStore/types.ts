import { Category } from 'entities'

export type CategoryState = {
  categories: Category[]
  categoriesIds: string[]
  categoriesById: Record<string, Category>
}
export type CategoryActions = {
  setCategories: (categories: Category[]) => void
  setCategoriesIds: (categoriesIds: string[]) => void
  setCategoriesById: (categoriesById: Record<string, Category>) => void
}

export type CategoryStore = CategoryState & CategoryActions

import { create } from 'zustand'
import { CategoryStore } from './types'
const useCategoryStore = create<CategoryStore>((set) => ({
  categories: [],
  categoriesIds: [],
  categoriesById: {},
  setCategories: (categories) => set({ categories }),
  setCategoriesIds: (categoriesIds) => set({ categoriesIds }),
  setCategoriesById: (categoriesById) => set({ categoriesById }),
}))

export default useCategoryStore

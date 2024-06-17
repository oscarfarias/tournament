export const QUERY_KEYS = {
  users: [`users`],
  roles: [`roles`],
  currentUser: [`current-user`],
  categories: [`categories`],
  groups: (year?: string) => [`grups`, year],
}

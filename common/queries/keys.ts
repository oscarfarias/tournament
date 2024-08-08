export const QUERY_KEYS = {
  users: [`users`],
  roles: [`roles`],
  currentUser: [`current-user`],
  categories: [`categories`],
  groups: (year?: string) => [`grups`, year],
  group: (id?: string) => [`group`, id],
  statisticsByGroup: (groupId: string) => [`statisticsByGroup`, groupId],
  scorersByTeam: (teamId: string) => [`scorersByTeam`, teamId],
  athletesByTeam: (teamId: string) => [`athletesByTeam`, teamId],
}

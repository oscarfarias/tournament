import { IconProps } from 'common/components/Icon'
import { ROLES, ROUTES } from 'common/config/constants'

export interface SidebarMenu {
  text: string
  icon: IconProps[`icon`]
  path: string
}

export const menu: SidebarMenu[] = [
  { text: `Manejo de competencia`, icon: `editRounded`, path: ROUTES.INDEX },
  { text: `Emparejamientos`, icon: `group`, path: ROUTES.MATCHES },
  { text: `Resultados`, icon: `barChart`, path: ROUTES.RESULTS },
]

export const menuByRole = (role: string): SidebarMenu[] => {
  if (role === ROLES.ADMIN) {
    return menu
  }
  return [
    { text: `Emparejamientos`, icon: `group`, path: ROUTES.MATCHES },
    { text: `Resultados`, icon: `barChart`, path: ROUTES.RESULTS },
  ]
}

import { IconProps } from 'common/components/Icon'
import { ROUTES } from 'common/config/constants'

export interface SidebarMenu {
  text: string
  icon: IconProps[`icon`]
  path: string
}

export const menu: SidebarMenu[] = [
  { text: `Manejo de competencia`, icon: `editRounded`, path: ROUTES.INDEX },
  { text: `Emparejamientos`, icon: `group`, path: ROUTES.MATCHES },
]

import { IconProps } from 'common/components/Icon'

export interface SidebarMenu {
  text: string
  icon: IconProps[`icon`]
}

export const menu: SidebarMenu[] = [
  { text: `Manejo de competencia`, icon: `editRounded` },
]

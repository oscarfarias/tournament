import { blue, green } from '@mui/material/colors'
import { Option } from 'common/types'
export const TOKEN_KEY = `userToken`
export const USER_KEY = `user`
export const laneColors: Record<string, string> = {
  gray: `#00000099`,
  blue: blue[800],
  orange: `#ED6C02`,
  green: green[800],
  red: `#D24E4E`,
}

export const drawerWidth = 240

export enum ROUTES {
  LOGIN = `/login`,
  INDEX = `/`,
  CATEGORY = `/category`,
  GROUPS = `/groups`,
  MATCHES = `/matches`,
  RESULTS = `/results`,
}

export enum ROLES {
  ADMIN = `Admin`,
  SUPERVISOR = `Supervisor`,
}

export const groupTypes: Option[] = [
  {
    label: `Grupo único`,
    value: 1,
  },
  {
    label: `Grupo 2`,
    value: 2,
  },
  {
    label: `Grupo 3`,
    value: 3,
  },
]

export const MIN_PLAYERS = 2

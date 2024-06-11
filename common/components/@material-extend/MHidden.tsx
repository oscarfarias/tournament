import { Breakpoint, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'

interface HiddenProps {
  children?: JSX.Element
  direction?: string
  breakpoint: Breakpoint
}

export default function MHidden({
  direction = `up`,
  breakpoint,
  children = <></>,
}: HiddenProps): JSX.Element | null {
  const theme = useTheme()
  const hiddenUp = useMediaQuery(theme.breakpoints.up(breakpoint))
  const hiddenDown = useMediaQuery(theme.breakpoints.down(breakpoint))

  if (direction.includes(`down`) && hiddenDown) {
    return null
  }

  if (direction.includes(`up`) && hiddenUp) {
    return null
  }

  return children
}

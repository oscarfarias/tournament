import {
  Button as MuiButton,
  CircularProgress,
  ButtonOwnProps,
} from '@mui/material'

interface ButtonProps extends ButtonOwnProps {
  isLoading?: boolean
  onClick?: () => void
}

const Button = ({
  isLoading,
  children,
  ...props
}: ButtonProps): JSX.Element => {
  return (
    <MuiButton {...props}>
      {isLoading ? (
        <CircularProgress sx={{ color: `white` }} size={24} />
      ) : (
        children
      )}
    </MuiButton>
  )
}

export default Button

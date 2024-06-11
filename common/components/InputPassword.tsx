import { VisibilityOff, Visibility } from '@mui/icons-material'
import {
  OutlinedInput,
  IconButton,
  InputAdornment,
  OutlinedInputProps,
  FormControl,
  FormHelperText,
  SxProps,
  Theme,
} from '@mui/material'
import { FC, KeyboardEventHandler, useState } from 'react'

interface InputPasswordProps {
  value?: string
  onChange?: OutlinedInputProps[`onChange`]
  fullWidth?: boolean
  sx?: SxProps<Theme>
  name?: string
  onKeyPressHandler?: KeyboardEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  >
  helperText?: string
  onBlur?: OutlinedInputProps[`onBlur`]
  placeholder?: string
}

const InputPassword: FC<InputPasswordProps> = ({
  value,
  onChange,
  onBlur,
  fullWidth = false,
  name = `password`,
  onKeyPressHandler,
  helperText,
  sx,
  placeholder,
}): JSX.Element => {
  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = (): void => {
    setShowPassword(!showPassword)
  }
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ): void => {
    event.preventDefault()
  }
  return (
    <FormControl variant="outlined" fullWidth={fullWidth}>
      <OutlinedInput
        id="outlined-adornment-password"
        type={showPassword ? `text` : `password`}
        value={value}
        placeholder={placeholder}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        onKeyDown={onKeyPressHandler}
        sx={{ height: `40px`, ...sx }}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
      <FormHelperText error={helperText !== ``} id="password-error">
        {helperText}
      </FormHelperText>
    </FormControl>
  )
}
export default InputPassword

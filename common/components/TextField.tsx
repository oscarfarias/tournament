import {
  TextField,
  InputAdornment,
  InputProps,
  StandardTextFieldProps,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import Icon, { icons } from './Icon'

const useStyles = makeStyles({
  root: {
    '& .MuiOutlinedInput-root': {
      height: 37,
    },
  },
})

const positions = [`start`, `end`] as const
interface ExtendedInputProps extends StandardTextFieldProps {
  iconAdornment?: keyof typeof icons
  iconAdornmentPosition?: (typeof positions)[number]
}

export default function TextFieldWrapper({
  iconAdornment,
  iconAdornmentPosition = `start`,
  ...props
}: ExtendedInputProps): JSX.Element {
  const classes = useStyles()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const adornment: Record<(typeof positions)[number], InputProps> = {
    start: {
      startAdornment: (
        <>
          {iconAdornment ? (
            <InputAdornment position={iconAdornmentPosition}>
              <Icon icon={iconAdornment} />
            </InputAdornment>
          ) : null}
        </>
      ),
    },
    end: {
      endAdornment: (
        <>
          {iconAdornment ? (
            <InputAdornment position={iconAdornmentPosition}>
              <Icon icon={iconAdornment} />
            </InputAdornment>
          ) : null}
        </>
      ),
    },
  }

  return (
    <TextField
      {...props}
      className={classes.root}
      InputProps={{
        ...adornment[iconAdornmentPosition],
      }}
    />
  )
}

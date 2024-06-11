import { useCallback } from 'react'
import {
  AutocompleteProps as MUIAutocompleteProps,
  BaseTextFieldProps,
  Autocomplete as MUIAutocomplete,
  Typography,
  TextField,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { createFilterOptions } from '@mui/material/Autocomplete'
import type { Option } from 'common/types'
interface AutocompleteProps
  extends Omit<
    MUIAutocompleteProps<Option, boolean, boolean, boolean>,
    `renderInput`
  > {
  inputProps?: BaseTextFieldProps
}

const Autocomplete = ({
  inputProps,
  ...props
}: AutocompleteProps): JSX.Element => {
  const { palette } = useTheme()
  const filter = createFilterOptions<Option>({
    ignoreCase: true,
  })
  const isOptionEqualToValue = useCallback((option: Option, value: Option) => {
    return option?.value === value?.value
  }, [])
  return (
    <MUIAutocomplete
      forcePopupIcon={false}
      autoHighlight
      renderOption={(props, option) => (
        <Typography
          sx={{
            color: palette.secondary.dark,
          }}
          {...props}
        >
          {option.label}
        </Typography>
      )}
      isOptionEqualToValue={isOptionEqualToValue}
      filterOptions={(options, params) => {
        const filtered = filter(options, params)
        return filtered
      }}
      sx={{
        '& .MuiButtonBase-root.MuiAutocomplete-clearIndicator': {
          color: `black`,
        },
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          {...inputProps}
          sx={{
            div: {
              paddingY: `2px !important`,
            },
          }}
          inputProps={{
            ...params.inputProps,
            autoComplete: `new-password`,
          }}
        />
      )}
      {...props}
    />
  )
}

export default Autocomplete

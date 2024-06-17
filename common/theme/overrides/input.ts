const input = {
  MuiInputBase: {
    styleOverrides: {
      root: {
        '& .MuiOutlinedInput-notchedOutline': {
          border: `none`,
        },
      },
      formControl: {
        width: `100%`,
        height: `42px`,
        border: `0.5px solid #C7CCD0`,
      },
      input: {
        '&:disabled': {
          opacity: `initial`,
          cursor: `not-allowed`,
        },
        fontSize: `14px`,
        color: `black`,
      },
    },
  },
  MuiTextField: {
    styleOverrides: {
      root: {
        '& .MuiOutlinedInput-root': {
          borderRadius: `8px`,
          width: `100%`,
          backgroundColor: `white`,
        },

        width: `100%`,
      },
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      input: {
        '&:-webkit-autofill': {
          '-webkit-box-shadow': `none`,
          '-webkit-text-fill-color': `inherit`,
          caretColor: `inherit`,
        },
        boxSizing: `inherit`,
      },
    },
  },
}

export default input

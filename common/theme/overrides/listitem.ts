const listItem = {
  MuiListItemButton: {
    defaultProps: {},
    styleOverrides: {
      root: {
        borderRadius: `4px`,
        '&:hover': {
          background: `green`,
          borderRadius: `4px`,
        },

        '&.Mui-selected': {
          background: `green`, // Change the background color to green
          borderRadius: `4px`,
        },
      },
    },
  },
}

export default listItem

import gradients from '../gradients'

const button = {
  MuiButton: {
    defaultProps: {
      variant: `contained`,
    },
    variants: [
      {
        props: { variant: `flat` },
        style: {
          background: `transparent`,
          '&:hover': {
            background: `transparent`,
          },
        },
      },
      {
        props: { variant: `outlined` },
        style: {
          background: `transparent`,
          '&:hover': {
            background: `transparent`,
          },
        },
      },
    ],
    styleOverrides: {
      root: {
        padding: 6,
        paddingLeft: 12,
        paddingRight: 12,
        borderRadius: `8px`,
        width: `100%`,
        background: gradients[0],
        '&:hover': {
          borderRadius: `8px`,
          width: `100%`,
          background: gradients[0],
        },
        '&:disabled': {
          cursor: `not-allowed`,
          pointerEvents: `auto`,
        },
      },
      error: {
        padding: 6,
        paddingLeft: 12,
        paddingRight: 12,
        borderRadius: `8px`,
        width: `100%`,
        background: gradients[0],
      },
    },
  },
}

export default button

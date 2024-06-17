import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button,
  DialogProps,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
interface ModalProps extends Omit<DialogProps, `open`> {
  isOpen: boolean
  cancelText?: string
  confirmText?: string
  title?: string
  onConfirm?: () => void
  onCancel?: () => void
  actions?: React.ReactNode
  confirm?: boolean
}

export default function Modal({
  isOpen,
  title = undefined,
  children = null,
  cancelText = `CANCEL`,
  confirmText = `ACCEPT`,
  onConfirm = () => null,
  onCancel = () => null,
  actions,
  confirm = false,
  ...props
}: ModalProps): JSX.Element | null {
  const { palette } = useTheme()
  return isOpen ? (
    <Dialog open fullWidth {...props}>
      {title ? (
        <DialogTitle
          sx={{
            fontSize: `18px !important`,
            fontWeight: `bold !important`,
            color: palette.primary.main,
          }}
        >
          {title}
        </DialogTitle>
      ) : null}

      <DialogContent sx={{ flexDirection: `column` }}>{children}</DialogContent>
      <DialogActions sx={{ justifyContent: `center` }}>
        {confirm ? (
          <>
            <Button variant="outlined" color="primary" onClick={onCancel}>
              {cancelText}
            </Button>
            <Button color="error" disableRipple onClick={onConfirm}>
              {confirmText}
            </Button>
          </>
        ) : null}
        {actions ? actions : null}
      </DialogActions>
    </Dialog>
  ) : null
}

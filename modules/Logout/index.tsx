import { Modal } from 'common/components'
import useLogoutStore from './store'
import { Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import useAuth from 'common/hooks/useAuth'

const Logout = (): JSX.Element => {
  const { palette } = useTheme()
  const { isModalOpen, closeModal } = useLogoutStore((state) => state)
  const { logOut } = useAuth()
  const onConfirm = (): void => {
    logOut()
    closeModal()
  }
  return (
    <Modal
      title="Cerrar sesión"
      isOpen={isModalOpen}
      onConfirm={onConfirm}
      onCancel={closeModal}
      confirm
      confirmText="ACEPTAR"
      cancelText="CANCELAR"
    >
      <Typography
        sx={{
          color: palette.primary.main,
          fontSize: `16px !important`,
        }}
      >
        ¿Estás seguro que deseas cerrar sesión?
      </Typography>
    </Modal>
  )
}

export default Logout

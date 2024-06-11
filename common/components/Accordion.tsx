import Accordion from '@mui/material/Accordion'
import AccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary'
import AccordionDetails, {
  AccordionDetailsProps,
} from '@mui/material/AccordionDetails'
import Icon, { icons } from './Icon'
import type { AccordionProps } from '@mui/material/Accordion'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { ListItemIcon, ListItemText, Stack, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'

interface ExtendedAccordionProps
  extends Omit<AccordionProps, `title` | `expandIcon` | `variant`> {
  title: string | JSX.Element
  startIcon?: keyof typeof icons
  startIconColor?: string
  startIconOnClick?: () => void
  endIcon?: keyof typeof icons
  endIconColor?: string
  endIconOnClick?: () => void
  // variant?: keyof ReturnType<typeof useStyles>
  accordionSummaryProps?: AccordionSummaryProps
  accordionDetailsProps?: AccordionDetailsProps
}
export default function AccordionWrapper({
  children,
  title,
  startIcon,
  startIconColor = `common.white`,
  startIconOnClick,
  endIcon,
  endIconColor = `common.white`,
  endIconOnClick,

  accordionSummaryProps: AccordionSummaryProps,
  ...props
}: ExtendedAccordionProps): JSX.Element {
  const { palette } = useTheme()

  const startIconComponent = startIcon ? (
    <ListItemIcon
      sx={{
        color: `inherit`,
      }}
    >
      <Icon
        icon={startIcon}
        sx={{ color: startIconColor, marginRight: 2 }}
        onClick={
          startIconOnClick
            ? (e) => {
                e.stopPropagation()
                startIconOnClick?.()
              }
            : undefined
        }
      />
    </ListItemIcon>
  ) : null

  const endIconComponent = endIcon ? (
    <Icon
      icon={endIcon}
      sx={{ color: endIconColor, marginLeft: 2 }}
      onClick={
        endIconOnClick
          ? (e) => {
              e.stopPropagation()
              endIconOnClick?.()
            }
          : undefined
      }
    />
  ) : null

  return (
    <Accordion
      elevation={0}
      disableGutters
      sx={{
        backgroundColor: palette.primary.main,
        borderRadius: 3,
      }}
      {...props}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="content"
        id="panel"
        {...AccordionSummaryProps}
      >
        <Stack
          direction="row"
          alignItems="center"
          sx={{
            color: palette.primary.contrastText,
            '&:hover': {
              color: palette.secondary.contrastText,
            },
          }}
          justifyContent="space-between"
          width="100%"
          flex={1}
        >
          {startIconComponent}
          <ListItemText
            primary={
              <Typography
                sx={{
                  color: `inherit`,
                }}
              >
                {title}
              </Typography>
            }
          />
          {endIconComponent}
        </Stack>
      </AccordionSummary>
      <AccordionDetails sx={{ backgroundColor: `white`, padding: 2 }}>
        {children}
      </AccordionDetails>
    </Accordion>
  )
}

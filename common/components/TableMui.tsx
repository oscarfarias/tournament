import * as React from 'react'
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Pagination,
  Grid,
} from '@mui/material'

interface BaseElement {
  id?: number | string
  uuid?: string
}

export interface HeadCell<T> {
  disablePadding?: boolean
  key?: keyof T
  title?: string
  numeric?: boolean
  render?: (data: T) => JSX.Element
  width?: string
  isAction?: boolean
}
export interface EnhancedTableHeadProps<T> {
  numSelected: number
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void
  rowCount: number
  columns: readonly HeadCell<T>[]
  withSelection?: boolean
}

export function EnhancedTableHead<T>({
  onSelectAllClick,
  numSelected,
  rowCount,
  columns,
  withSelection,
}: EnhancedTableHeadProps<T>): JSX.Element {
  return (
    <TableHead>
      <TableRow
        sx={{
          backgroundColor: `#0000000A`,
        }}
      >
        {withSelection ? (
          <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              sx={{
                padding: 0,
              }}
            />
          </TableCell>
        ) : null}
        {columns.map((column) => (
          <TableCell
            key={column.key as string}
            align={column.numeric ? `right` : `left`}
            padding={column.disablePadding ? `none` : `normal`}
            sx={{
              width: column.width,
            }}
          >
            {column.title}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

interface EnhancedTableProps<T> {
  withSelection?: boolean
  columns: HeadCell<T>[]
  rows: T[]
  onSelectionChange?: ([key]: string[]) => void
  onRowClick?: (data: T) => void
  rowsPerPage?: number
  showPagination?: boolean
}

export default function MuiTable<T extends BaseElement>({
  rows,
  columns,
  withSelection = false,
  onSelectionChange = () => null,
  onRowClick = () => null,
  rowsPerPage = 6,
  showPagination = true,
}: EnhancedTableProps<T>): JSX.Element {
  const [selected, setSelected] = React.useState<string[] | undefined>([])
  const [page, setPage] = React.useState(1)
  React.useEffect(() => {
    setSelected([])
  }, [rows.length])

  const handleSelectAllClick = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    if (event.target.checked) {
      const newSelected: string[] = []
      rows?.forEach((n) => {
        if (n.id != null) {
          newSelected.push(`${n.id}`)
          return
        }
        if (n.uuid != null) {
          newSelected.push(n.uuid)
        }
      })
      setSelected(newSelected)
      onSelectionChange(newSelected != null ? newSelected : [])
      return
    }
    setSelected([])
    onSelectionChange([])
  }

  const handleClick = (event: React.MouseEvent<unknown>, id: string): void => {
    event.stopPropagation()
    let newSelected: string[] = []

    if (selected != null) {
      const selectedIndex = selected.indexOf(id)
      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, id)
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1))
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1))
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1),
        )
      }
    }

    setSelected(newSelected)
    onSelectionChange(newSelected)
  }

  const handleChangePage = (event: unknown, newPage: number): void => {
    setPage(newPage)
  }

  const isSelected = (name: string): boolean => selected?.indexOf(name) !== -1

  const emptyRows =
    page > 1 && rows !== undefined
      ? Math.max(0, page * rowsPerPage - rows.length)
      : 0

  const visibleRows = React.useMemo(() => {
    return rows?.slice(
      (page - 1) * rowsPerPage,
      (page - 1) * rowsPerPage + rowsPerPage,
    )
  }, [rows, page, rowsPerPage])

  return (
    <Box sx={{ width: `100%` }}>
      <TableContainer>
        <Table aria-labelledby="tableTitle" size={`medium`}>
          <EnhancedTableHead
            columns={columns}
            numSelected={selected != null ? selected.length : 0}
            onSelectAllClick={handleSelectAllClick}
            rowCount={rows != null ? rows.length : 0}
            withSelection={withSelection}
          />
          <TableBody>
            {visibleRows?.map((row) => {
              const rowKey = row.id != null ? row.id : row.uuid
              const isItemSelected = isSelected(rowKey as string)
              const labelId = `enhanced-table-checkbox-${rowKey}`
              return (
                <TableRow
                  hover
                  role="checkbox"
                  aria-checked={isItemSelected}
                  key={rowKey}
                  selected={isItemSelected}
                  sx={{ cursor: `pointer`, height: `70px` }}
                  onClick={() => onRowClick(row)}
                >
                  {withSelection ? (
                    <TableCell
                      padding="checkbox"
                      onClick={(event) => handleClick(event, rowKey as string)}
                    >
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                        sx={{
                          padding: 0,
                        }}
                      />
                    </TableCell>
                  ) : null}

                  {columns.map((column, index) => {
                    if (column.render && column.key) {
                      return (
                        <TableCell key={index}>{column.render(row)}</TableCell>
                      )
                    }
                    if (column.render) {
                      return (
                        <TableCell
                          onClick={(e) => {
                            if (column.isAction) {
                              e.stopPropagation()
                            }
                          }}
                          key={index}
                        >
                          {column.render(row)}
                        </TableCell>
                      )
                    }
                    if (column.key) {
                      const data = row[column.key as keyof T]
                      return <TableCell key={index}>{data}</TableCell>
                    }
                  })}
                </TableRow>
              )
            })}
            {rowsPerPage > rows?.length && (
              <TableRow
                style={{
                  height: 70 * (rowsPerPage - rows?.length),
                }}
              >
                <TableCell colSpan={6} />
              </TableRow>
            )}
            {emptyRows > 0 && (
              <TableRow
                style={{
                  height: 70 * emptyRows,
                }}
              >
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {showPagination ? (
        <Grid container justifyContent="flex-end" p={2}>
          <Pagination
            count={
              rows !== undefined ? Math.ceil(rows.length / rowsPerPage) : 0
            }
            page={page}
            defaultPage={page}
            onChange={handleChangePage}
            size="large"
          />
        </Grid>
      ) : null}
    </Box>
  )
}

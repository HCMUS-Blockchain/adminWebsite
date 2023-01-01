import { TableEmployees } from '@/components/employees'
import { MainLayout } from '@/components/layout'
import { employeeCell } from '@/constants'
import { Box, Divider, Typography, IconButton, Menu, MenuItem } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import React, { useEffect } from 'react'
import { DialogComponent } from '../../components/employees/form-dialog'
import { useEmployee } from '@/hooks'
import { CSVLink } from 'react-csv'

function EmployeeScreen() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [openDialog, setOpenDialog] = React.useState(false)
  const [employeeList, setEmployeeList] = React.useState<any[]>([])
  const [employeeUpdate, setEmployeeUpdate] = React.useState({})
  const [result, setResult] = React.useState([])
  const open = Boolean(anchorEl)
  const { data } = useEmployee()
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const addOneEmployee = () => {
    setOpenDialog(true)
  }

  useEffect(() => {
    if (data) {
      if (data.data) {
        const result = data.data.employees.map((item: any) => {
          const { _id, ownerID, __v, ...result } = item
          return result
        })
        setEmployeeList(data.data.employees)
        setResult(result)
      } else {
        setEmployeeList(data)
      }
    }
  }, [data])

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography component="h2" variant="h5">
          Employee Management
        </Typography>
        <IconButton
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          <MoreVertIcon fontSize="medium" />
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={addOneEmployee}>Add a employee</MenuItem>
          <MenuItem onClick={handleClose}>Import</MenuItem>
          <MenuItem>
            <CSVLink data={result}>Export</CSVLink>
          </MenuItem>
        </Menu>
      </Box>
      <DialogComponent
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        employeeUpdate={employeeUpdate}
      />

      <Divider />
      <TableEmployees
        headCells={employeeCell}
        employeeList={employeeList}
        setOpenDialog={setOpenDialog}
        setEmployeeUpdate={setEmployeeUpdate}
      />
    </Box>
  )
}

EmployeeScreen.Layout = MainLayout

export default EmployeeScreen

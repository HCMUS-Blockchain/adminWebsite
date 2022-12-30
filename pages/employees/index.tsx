import { TableEmployees } from '@/components/employees'
import { MainLayout } from '@/components/layout'
import { employeeCell } from '@/constants'
import { Box, Divider, Typography, IconButton, Menu, MenuItem } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import React from 'react'
import { DialogComponent } from './form-dialog'

function EmployeeScreen() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const addOneEmployee = () => {}
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
          <MenuItem onClick={handleClose}>Add a employee</MenuItem>
          <MenuItem onClick={handleClose}>Import</MenuItem>
          <MenuItem onClick={handleClose}>Export</MenuItem>
        </Menu>
        <DialogComponent />
      </Box>
      <Divider />
      <TableEmployees headCells={employeeCell} employeeList={[]} />
    </Box>
  )
}

EmployeeScreen.Layout = MainLayout

export default EmployeeScreen

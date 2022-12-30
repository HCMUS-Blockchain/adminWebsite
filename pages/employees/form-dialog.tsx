import * as React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
  MenuItem,
} from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import { useEmployee } from '@/hooks'
const positions = [
  {
    value: 'Waitress',
    label: 'Waitress',
  },
  {
    value: 'General Management',
    label: 'General Management',
  },
  {
    value: 'Cashier',
    label: 'Cashier',
  },
  {
    value: 'Chef',
    label: 'Chef',
  },
  {
    value: 'Kitchen Management',
    label: 'Kitchen Management',
  },
  {
    value: 'Bartender',
    label: 'Bartender',
  },
  {
    value: 'Dishwasher',
    label: 'Dishwasher',
  },
  {
    value: 'Staff',
    label: 'Staff',
  },
]
export function DialogComponent() {
  const { register, control, handleSubmit } = useForm()
  const { createEmployee } = useEmployee()
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(true)
  }

  const handleFormSubmit = async (values: any) => {
    await createEmployee(values)
    console.log('success')
  }
  return (
    <div>
      <Dialog open={true} onClose={handleClose}>
        <DialogTitle>Employee Form</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="ID"
            label="ID"
            type="text"
            fullWidth
            variant="standard"
            required
            {...register('employeeID')}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="name"
            fullWidth
            variant="standard"
            required
            {...register('name')}
          />
          <TextField
            autoFocus
            margin="dense"
            id="phone"
            label="Phone"
            type="phone"
            fullWidth
            variant="standard"
            required
            {...register('phone')}
          />
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email"
            type="email"
            fullWidth
            variant="standard"
            required
            {...register('email')}
          />

          <TextField
            id="outlined-select-currency-native"
            select
            margin="dense"
            fullWidth
            variant="standard"
            label="Position"
            defaultValue="Staff"
            inputProps={register('position')}
            helperText="Please select your position"
            required
          >
            {positions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" onClick={handleSubmit(handleFormSubmit)}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

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

export interface DialogComponent {
  openDialog: boolean
  setOpenDialog: any
  employeeUpdate: any
}
export function DialogComponent({ openDialog, setOpenDialog, employeeUpdate }: DialogComponent) {
  const { register, control, handleSubmit, setValue } = useForm()
  const { createEmployee, updateEmployee } = useEmployee()

  React.useEffect(() => {
    if (employeeUpdate) {
      setValue('employeeID', employeeUpdate.employeeID)
      setValue('name', employeeUpdate.name)
      setValue('phone', employeeUpdate.phone)
      setValue('email', employeeUpdate.email)
      setValue('position', employeeUpdate.position)
    }
  }, [employeeUpdate])
  const setDefaultForm = () => {
    setValue('employeeID', '')
    setValue('name', '')
    setValue('phone', '')
    setValue('email', '')
    setValue('position', 'Staff')
  }
  const handleClose = () => {
    setOpenDialog(false)
  }

  const handleFormSubmit = async (values: any) => {
    try {
      if (employeeUpdate._id) {
        values._id = employeeUpdate._id
        await updateEmployee(values)
      } else {
        console.log(values)
        await createEmployee(values)
      }
      setOpenDialog(false)
      setDefaultForm()
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <div>
      <Dialog open={openDialog} onClose={handleClose}>
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
            margin="dense"
            id="email"
            label="Email"
            type="email"
            fullWidth
            variant="standard"
            required
            {...register('email')}
          />

          <Controller
            control={control}
            name="position"
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <TextField
                id="outlined-select-currency-native"
                select
                margin="dense"
                fullWidth
                variant="standard"
                label="Position"
                onChange={onChange}
                value={value || ''}
                helperText="Please select your position"
                required
              >
                {positions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
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

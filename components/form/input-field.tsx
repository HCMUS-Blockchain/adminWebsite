import { TextField, TextFieldProps, InputAdornment } from '@mui/material'
import * as React from 'react'
import { useController, Control, useFormContext } from 'react-hook-form'

export type InputFieldProps = TextFieldProps & {
  name: string
}

export function InputField({ name, ...rest }: InputFieldProps) {
  const methods = useFormContext()
  const { getFieldState } = methods
  const { invalid, error } = getFieldState(name)

  return (
    <TextField
      fullWidth
      size="small"
      margin="normal"
      id="outlined-start-adornment"
      InputProps={{
        startAdornment: <InputAdornment position="start"></InputAdornment>,
      }}
      sx={{ margin: '0' }}
      {...methods.register(name)}
      error={invalid}
      helperText={error?.message}
      {...rest}
      color="secondary"
    />
  )
}

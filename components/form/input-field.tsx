import { TextField, TextFieldProps } from '@mui/material'
import * as React from 'react'
import { useController, Control } from 'react-hook-form'

export type InputFieldProps = TextFieldProps & {
  name: string
  control: Control<any>
}

export function InputField({ name, control, ...rest }: InputFieldProps) {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
  })
  return (
    <TextField
      fullWidth
      size="small"
      margin="normal"
      sx={{ margin: '0' }}
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      inputRef={ref}
      {...rest}
      color="secondary"
    />
  )
}

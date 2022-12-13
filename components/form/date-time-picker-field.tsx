import { TextField, TextFieldProps } from '@mui/material'
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import React, { useState } from 'react'
import { useController, Control } from 'react-hook-form'

export type DateTimePickerProps = {
  name: string
  label: string
  control: Control<any>
}

export function DateTimePickerField({ name, control, label, ...rest }: DateTimePickerProps) {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
  })

  const [tempValue, setTempValue] = useState(value)

  return (
    <DateTimePicker
      renderInput={(props) => <TextField {...props} />}
      label={label}
      value={tempValue}
      onChange={(newValue) => {
        setTempValue(newValue)
      }}
    />
  )
}

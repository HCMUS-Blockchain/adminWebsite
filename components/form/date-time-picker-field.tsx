import { TextField, TextFieldProps } from '@mui/material'
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import React, { useState } from 'react'
import { useController, Control, useFormContext, Controller } from 'react-hook-form'

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

  const methods = useFormContext()
  const [tempValue, setTempValue] = useState(value)

  console.log(error)
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <DateTimePicker
          renderInput={(props) => (
            <TextField required {...props} error={!!error} helperText={error?.message} />
          )}
          onChange={(date) => field.onChange(date)}
          value={field.value}
        />
      )}
    />
    // <DateTimePicker
    //   // minDate={new Date()}
    //   renderInput={(props) => (
    //     <TextField required {...props} error={!!error} helperText={error?.message} />
    //   )}
    //   label={label}
    //   value={tempValue}
    //   {...methods.register(name)}
    //   onChange={(newValue) => {
    //     setTempValue(newValue)
    //   }}
    // />
  )
}

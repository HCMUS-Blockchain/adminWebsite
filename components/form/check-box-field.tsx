import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import FormLabel from '@mui/material/FormLabel'
import FormControl from '@mui/material/FormControl'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormHelperText from '@mui/material/FormHelperText'
import Checkbox from '@mui/material/Checkbox'
import { useController, Controller, Control } from 'react-hook-form'

const gameList = ['2048', 'Jump with doctor strange', 'Quiz']
export type CheckboxesGroupProps = {
  name: string
  control: Control<any>
}
export default function CheckboxesGroup({ name, control }: CheckboxesGroupProps) {
  const {
    fieldState: { error },
    field: { value },
  } = useController({
    name,
    control,
  })

  return (
    <Box sx={{ display: 'flex' }}>
      <FormControl required component="fieldset" error={!!error?.message}>
        <FormLabel component="legend">Choose game</FormLabel>
        <FormGroup row>
          <Controller
            name={name}
            control={control}
            render={({ field }) => {
              return (
                <>
                  {gameList.map((item, index) => (
                    <FormControlLabel
                      {...field}
                      key={item}
                      label={item}
                      value={item}
                      control={
                        <Checkbox
                          checked={value.some((formOption: string) => formOption === item)}
                          onChange={() => {
                            if (!field.value.includes(item)) {
                              field.onChange([...field.value, item])
                              return
                            }
                            const newTopics = field.value.filter((topic: string) => topic !== item)
                            field.onChange(newTopics)
                          }}
                        />
                      }
                    />
                  ))}
                </>
              )
            }}
          />
        </FormGroup>
        <FormHelperText>{error?.message}</FormHelperText>
      </FormControl>
    </Box>
  )
}

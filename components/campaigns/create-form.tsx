import { Box } from '@mui/material'
import * as React from 'react'
import InputField from '../form/input-field'

export interface CreateForm {}

export function CreateForm(props: CreateForm) {
  return (
    <Box component="form">
      <InputField />
    </Box>
  )
}

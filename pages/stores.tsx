import { MainLayout } from '@/components/layout'
import Map from '@/components/stores'
import { Box, Typography, Button, Divider, Stack } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import DialogComponentStore from '@/components/stores/DialogComponentConfig'
import { useStore } from '@/hooks'
import { useState } from 'react'
import { ListComponent } from '@/components/stores/ListComponent'

function StoreScreen() {
  // const {data} = useStore()
  const [open, setOpen] = useState(false)
  const [store, setStore] = useState()
  const [isUpdate, setIsUpdate] = useState(false)
  const popUpDialog = () => {
    setOpen(true)
  }
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography component="h2" variant="h5">
          Store List
        </Typography>
        <Button variant="contained" color="primary" onClick={popUpDialog} startIcon={<AddIcon />}>
          New
        </Button>
      </Box>
      <Divider sx={{ mb: 4 }} />
      <DialogComponentStore open={open} setOpen={setOpen} store={store} setStore={setStore} />
      <Stack direction="row" spacing={2}>
        <Map />
        <ListComponent setStore={setStore} setOpen={setOpen} />
      </Stack>
    </Box>
  )
}

StoreScreen.Layout = MainLayout

export default StoreScreen

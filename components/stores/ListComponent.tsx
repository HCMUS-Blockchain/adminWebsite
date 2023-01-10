import { storesApi } from '@/api-client'
import { useStore } from '@/hooks'
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Avatar,
  Divider,
  Box,
  Stack,
  IconButton,
  Autocomplete,
  TextField,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import React, { useState, useEffect } from 'react'
export interface ListComponentInterface {
  setStore: any
  setOpen: any
}
export function ListComponent({ setStore, setOpen }: ListComponentInterface) {
  const { data, deleteStore } = useStore()
  const [title, setTitle] = useState([])
  const getStore = async (id: string) => {
    try {
      const x = await storesApi.getStore(id)
      setStore(x.data.store)
      setOpen(true)
    } catch (e) {
      console.log(e)
    }
  }

  const deleteAStore = async (id: string) => {
    try {
      await deleteStore(id)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    if (data) {
      const list = data.data.stores.map((item: any) => item.title)
      setTitle(list)
    }
  }, [data])
  return (
    <List
      sx={{
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
        maxHeight: '600px',
        overflow: 'auto',
      }}
    >
      {data
        ? data.data.stores.map((item: any) => (
            <Stack
              direction="row"
              width="100%"
              alignItems="center"
              justifyContent="space-between"
              key={item._id}
            >
              <Box key={item._id} width="100%">
                <ListItem alignItems="flex-start" onClick={() => getStore(item._id)}>
                  <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src={item.image} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.title}
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {item.description}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <Divider />
              </Box>
              <IconButton onClick={() => deleteAStore(item._id.toString())}>
                <CloseIcon />
              </IconButton>
            </Stack>
          ))
        : null}
    </List>
  )
}

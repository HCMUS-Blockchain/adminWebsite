import { storesApi } from '@/api-client'
import { useStore } from '@/hooks'
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
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
  setInfo: any
  setInitialViewState: any
}
export function ListComponent({
  setStore,
  setOpen,
  setInfo,
  setInitialViewState,
}: ListComponentInterface) {
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

  const handleDirect = (item: any) => {
    setInfo(undefined)
    setInfo(item)
    setInitialViewState({
      latitude: parseFloat(item.coordinates.latitude),
      longitude: parseFloat(item.coordinates.longitude),
      zoom: 15,
    })
  }

  useEffect(() => {
    if (data) {
      const list = data.data.stores.map((item: any) => item.title)
      setTitle(list)
    }
  }, [data])

  console.log(data)
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
              key={item.title}
            >
              <Box key={item._id} width="100%">
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src={item.image} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography
                        sx={{
                          display: 'block',
                          overflow: ' hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          width: '210px',
                          cursor: 'pointer',
                        }}
                        component="span"
                        color="text.primary"
                        onClick={() => getStore(item._id)}
                      >
                        {item.title}
                      </Typography>
                    }
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: 'block' }}
                          variant="body2"
                          component="span"
                          color="text.primary"
                        >
                          {item.description.split('\n')[0]}
                        </Typography>
                        <Typography
                          sx={{
                            display: 'block',
                            overflow: ' hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            width: '210px',
                          }}
                          variant="body2"
                          component="span"
                          color="text.primary"
                        >
                          {item.description.split('\n')[1]}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                  <Stack alignItems="center">
                    <ListItemButton
                      role={undefined}
                      dense
                      onClick={() => handleDirect(item)}
                      sx={{
                        width: '70px',
                        borderRadius: '15%',
                        '&:hover': {
                          color: '#EB455F',
                          backgroundColor: '#FFFFFF',
                        },
                      }}
                    >
                      Direct
                    </ListItemButton>
                    <ListItemButton
                      onClick={() => deleteAStore(item._id.toString())}
                      sx={{
                        width: '50px',
                        borderRadius: '100%',
                        '&:hover': {
                          color: '#EB455F',
                          backgroundColor: '#FFFFFF',
                        },
                      }}
                    >
                      <CloseIcon sx={{ mr: 'auto', ml: 'auto' }} />
                    </ListItemButton>
                  </Stack>
                </ListItem>

                <Divider />
              </Box>
            </Stack>
          ))
        : null}
    </List>
  )
}

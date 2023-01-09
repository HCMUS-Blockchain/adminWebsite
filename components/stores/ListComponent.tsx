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
} from '@mui/material'
import * as React from 'react'

export interface ListComponentInterface {
  setStore: any
  setOpen: any
}
export function ListComponent({ setStore, setOpen }: ListComponentInterface) {
  const { data, updateStore } = useStore()
  const getStore = async (id: string) => {
    try {
      const x = await storesApi.getStore(id)
      setStore(x.data.store)
      setOpen(true)
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {data
        ? data.data.stores.map((item: any) => (
            <>
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
            </>
          ))
        : null}
    </List>
  )
}

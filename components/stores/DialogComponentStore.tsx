import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Stack,
  Box,
  Typography,
  IconButton,
  DialogActions,
  Button,
} from '@mui/material'
import { LoadingButton } from '@mui/lab'
import SaveIcon from '@mui/icons-material/Save'
import * as React from 'react'
import {
  GeoapifyGeocoderAutocomplete,
  GeoapifyContext,
} from '@geoapify/react-geocoder-autocomplete'
import '@geoapify/geocoder-autocomplete/styles/minimal.css'
import { Controller, useForm } from 'react-hook-form'
import Image from 'next/image'
import CloseIcon from '@mui/icons-material/Close'
import { useStore } from '@/hooks'

export interface DiaglogComponentStoreInterface {
  open: boolean
  setOpen: any
  store: any
  setStore: any
}
export default function DiaglogComponentStore({
  open,
  setOpen,
  store,
  setStore,
}: DiaglogComponentStoreInterface) {
  const [singleFile, setSingleFile] = React.useState<any>()
  const [fileUpdate, setFileUpdate] = React.useState<any>()
  const [address, setAddress] = React.useState<any>()
  const [isLoading, setIsLoading] = React.useState(false)

  const { createStore, updateStore } = useStore()
  const { register, control, handleSubmit, setValue } = useForm()
  function onPlaceSelect(value: any) {
    setAddress(value)
  }

  React.useEffect(() => {
    if (!store) {
      setValue('title', '')
      setValue('description', '')
      setValue('image', undefined)
      setFileUpdate(undefined)
      setAddress(undefined)
    } else {
      setValue('title', store.title)
      setValue('description', store.description)
      setValue('image', store.image)
      setFileUpdate(store.image)
      setAddress(store.address)
    }
    console.log(store)
  }, [store])

  const setDefaultValue = () => {
    setValue('title', '')
    setValue('description', '')
    setValue('image', undefined)
    setFileUpdate(undefined)
    setAddress(undefined)
  }
  const handleSubmitForm = async (values: any) => {
    setIsLoading(true)
    if (typeof address === 'string') {
      values.coordinates = store.coordinates.latitude + ',' + store.coordinates.longitude
      values.address = store.address
    } else if (address) {
      values.coordinates = address.geometry.coordinates.toString()
      values.address = address.properties.formatted
    }
    try {
      if (store) {
        values._id = store._id
        await updateStore(values)
        setStore(undefined)
        setIsLoading(false)
      } else {
        values.coordinates =
          values.coordinates.split(',')[0] + ',' + values.coordinates.split(',')[1]
        await createStore(values)
        setIsLoading(false)
        setDefaultValue()
      }
      setOpen(false)
    } catch (e) {
      console.log(e)
    }
  }

  const onFileDrop = React.useCallback(
    (e: React.SyntheticEvent<EventTarget>) => {
      const target = e.target as HTMLInputElement
      if (!target.files) return

      const newFile = Object.values(target.files).map((file: File) => file)
      setSingleFile(newFile[0])
      setValue('image', newFile[0])
    },
    [singleFile]
  )

  const DeleteImage = () => {
    setSingleFile(undefined)
    setFileUpdate('')
  }

  React.useEffect(() => {
    if (typeof singleFile === 'string') setFileUpdate(singleFile)
    else {
      const reader = new FileReader()
      if (singleFile) {
        reader.readAsDataURL(singleFile)
        reader.onload = () => {
          setFileUpdate(reader.result)
          console.log(reader.result)
        }
        reader.onerror = () => {
          console.log(reader.error)
        }
      }
    }
  }, [singleFile])

  const handleClose = () => {
    setOpen(false)
    setStore(undefined)
  }
  return (
    <div>
      <Dialog open={open}>
        <DialogTitle>Create a new brand</DialogTitle>
        <DialogContent sx={{ width: '500px' }}>
          <Stack spacing={2}>
            {fileUpdate ? (
              <>
                <Image
                  src={fileUpdate}
                  alt=""
                  title=""
                  width={150}
                  height={150}
                  style={{
                    borderRadius: '50%',
                    overflow: 'hidden',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    position: 'relative',
                  }}
                />
                <IconButton sx={{ position: 'absolute', top: 30, right: 20 }} onClick={DeleteImage}>
                  <CloseIcon />
                </IconButton>
              </>
            ) : (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{
                  position: 'relative',
                  width: '150px',
                  height: '150px',
                  border: '2px dashed #4267b2',
                  borderRadius: '100%',
                  ml: 'auto',
                  mr: 'auto',
                }}
              >
                <Stack justifyContent="center" sx={{ p: 1, textAlign: 'center' }}>
                  <Typography variant="body1" component="span">
                    <strong>Upload images</strong>
                  </Typography>
                  <Typography variant="body2" component="span">
                    JPG, JPEG, PNG
                  </Typography>
                </Stack>
                <Controller
                  name="image"
                  defaultValue=""
                  control={control}
                  render={({ field: { name, onBlur, ref } }) => (
                    <input
                      type="file"
                      name={name}
                      onBlur={onBlur}
                      ref={ref}
                      onChange={onFileDrop}
                      accept="image/jpg, image/png, image/jpeg"
                      style={{
                        opacity: 0,
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        cursor: 'pointer',
                      }}
                    />
                  )}
                />
              </Box>
            )}

            <TextField label="Title" {...register('title')} />
            <TextField label="Description" multiline={true} rows={4} {...register('description')} />
            <GeoapifyContext apiKey={process.env.NEXT_PUBLIC_GEOAPIFY_API}>
              <GeoapifyGeocoderAutocomplete
                placeSelect={onPlaceSelect}
                lang="vi"
                value={address?.properties ? address.properties.formatted : address}
              />
            </GeoapifyContext>
          </Stack>
        </DialogContent>
        <DialogActions>
          {!isLoading ? <Button onClick={handleClose}>Cancel</Button> : null}
          <LoadingButton
            type="submit"
            onClick={handleSubmit(handleSubmitForm)}
            loading={isLoading}
            loadingPosition="start"
            startIcon={<SaveIcon />}
          >
            {store ? 'Update' : 'Create'}
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  )
}

import { campaignApi, counterpartApi } from '@/api-client'
import { DateTimePickerField, InputField, UploadImageComponent } from '@/components/form'
import CheckboxesGroup from '@/components/form/check-box-field'
import { MainLayout } from '@/components/layout'
import { useCampaign, useCounterPart } from '@/hooks'
import { Campaign, statusCampaign } from '@/models'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, Divider, Grid, Stack, Typography } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'

interface CampaignScreen {
  data?: CampaignScreenUpdate
}
export interface CampaignScreenUpdate extends Campaign {
  image: string
}

function ProfileScreen() {
  const router = useRouter()
  //   const isUpdate = !props.data
  //   const { updateCampaigns } = useCampaign()
  //   const schema = yup.object().shape({
  //     name: yup.string().required('Please enter name of voucher'),
  //     numberOfVoucher: yup
  //       .number()
  //       .required('Please enter a number of voucher')
  //       .positive('A number must be greater than 0')
  //       .integer('A number must be an integer'),
  //     description: yup.string(),
  //     dateBegin: yup.date().required('Please enter a begin date'),
  //     dateEnd: yup
  //       .date()
  //       .required('Please enter a end date')
  //       .when(
  //         'dateBegin',
  //         (dateBegin, yup) => dateBegin && yup.min(dateBegin, 'End time cannot be before start time')
  //       ),
  //     imageCover: yup.mixed().required('Image is required'),
  //     games: yup.array().min(1, 'Game field must have at least 1 item'),
  //   })

  //   let defaultValues
  //   if (!isUpdate) {
  //     defaultValues = {
  //       //   name: '',
  //       //   numberOfVoucher: 0,
  //       //   description: '',
  //       //   dateBegin: '',
  //       //   dateEnd: '',
  //       //   games: [],
  //     }
  //   } else {
  //     defaultValues = props.data
  //   }
  //   const formOption = {
  //     resolver: yupResolver(schema),
  //     defaultValues: defaultValues,
  //   }

  const methods = useForm({
    defaultValues: {
      imageCover: '',
      fullName: '',
      email: '',
      nameOfShop: '',
      phone: '',
      headquarter: '',
    },
  })

  //   const route = useRouter()
  const {
    handleSubmit,
    formState: { errors },
    setValue,
  } = methods

  const { data, getCounterpart, updateCounterpart } = useCounterPart()

  useEffect(() => {
    console.log(data)
    if (data) {
      setValue('nameOfShop', data.data.result?.nameOfShop || '')
      setValue('imageCover', data.data.result?.image || '')
      setValue('phone', data.data.result?.phone || '')
      setValue('headquarter', data.data.result?.headquarter || '')
      setValue('fullName', data.data.result?.fullName || '')
      setValue('email', data.data.result?.email || '')
    }
  }, [data])

  const onSubmitHandler = async (values: any) => {
    console.log(values)
    const formData = new FormData()
    formData.append('imageCover', values.imageCover || ' ')
    formData.append('nameOfShop', values.nameOfShop)
    formData.append('fullName', values.fullName)
    formData.append('phone', values.phone)
    formData.append('headquarter', values.headquarter)
    // const { data } = await counterpartApi.create(formData)
    const id = data.data.result._id
    try {
      if (id) {
        formData.append('_id', id || '')
        await updateCounterpart(formData)
        router.push('/')
      } else {
        const { data } = await campaignApi.create(formData)
        if (data.success) {
          router.push('/')
        }
      }
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <Box>
      <Typography component="h2" variant="h5" sx={{ mb: 2 }}>
        My Profile
      </Typography>

      <Divider />
      <FormProvider {...methods}>
        <Grid
          container
          spacing={2}
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          <Grid item xs={4}>
            <UploadImageComponent limit={1} multiple={false} name="imageCover" />
          </Grid>

          <Grid item xs={8}>
            <Stack sx={{ ml: 10, mt: 2 }} spacing={4}>
              <InputField name="email" label="Email" size="medium" disabled />
              <InputField name="fullName" label="Full name" size="medium" />
              <InputField name="nameOfShop" label="Name of shop" size="medium" />
              <InputField name="phone" label="Phone number" size="medium" />
              <InputField name="headquarter" label="Headquarter" size="medium" />
              <Button
                variant="contained"
                type="submit"
                sx={{
                  py: '0.8rem',
                  backgroundColor: 'primary',
                  mt: 5,
                  ml: 'auto',
                  mr: 'auto',
                  width: '180px',
                }}
              >
                Save Changes
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </FormProvider>
    </Box>
  )
}

ProfileScreen.Layout = MainLayout

export default ProfileScreen

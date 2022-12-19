import { campaignApi } from '@/api-client'
import { DateTimePickerField, InputField, UploadImageComponent } from '@/components/form'
import CheckboxesGroup from '@/components/form/check-box-field'
import { MainLayout } from '@/components/layout'
import { useCampaign } from '@/hooks'
import { Campaign, statusCampaign } from '@/models'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, Divider, Grid, Stack, Typography } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'

interface CampaignScreen {
  data?: CampaignScreenUpdate
}
export interface CampaignScreenUpdate extends Campaign {
  image: string
}
function CreateCampaignScreen(props: CampaignScreen) {
  const isUpdate = !props.data
  const { updateCampaigns } = useCampaign()
  const schema = yup.object().shape({
    name: yup.string().required('Please enter name of voucher'),
    numberOfVoucher: yup
      .number()
      .required('Please enter a number of voucher')
      .positive('A number must be greater than 0')
      .integer('A number must be an integer'),
    description: yup.string(),
    dateBegin: yup.date().required('Please enter a begin date'),
    dateEnd: yup
      .date()
      .required('Please enter a end date')
      .when(
        'dateBegin',
        (dateBegin, yup) => dateBegin && yup.min(dateBegin, 'End time cannot be before start time')
      ),
    imageCover: yup.mixed().required('Image is required'),
    games: yup.array().min(1, 'Game field must have at least 1 item'),
  })

  let defaultValues
  if (!isUpdate) {
    defaultValues = {
      name: '',
      numberOfVoucher: 0,
      description: '',
      dateBegin: '',
      dateEnd: '',
      games: [],
    }
  } else {
    defaultValues = props.data
  }
  const formOption = {
    resolver: yupResolver(schema),
    defaultValues: defaultValues,
  }

  const methods = useForm(formOption)

  const route = useRouter()
  const {
    handleSubmit,
    formState: { errors },
    setValue,
  } = methods

  setValue('name', !isUpdate ? props.data?.name : '')
  setValue('numberOfVoucher', !isUpdate ? props.data?.numberOfVoucher : '')
  setValue('description', !isUpdate ? props.data?.description : '')
  setValue(
    'dateBegin',
    !isUpdate ? dayjs.unix(props.data?.dateBegin || dayjs(new Date()).unix()) : ''
  )
  setValue('dateEnd', !isUpdate ? dayjs.unix(props.data?.dateEnd || dayjs(new Date()).unix()) : '')
  setValue('games', !isUpdate ? props.data?.games : [])
  setValue('imageCover', !isUpdate ? props.data?.image : '')

  const onSubmitHandler = async (values: any) => {
    const formData = new FormData()
    formData.append('imageCover', values.imageCover || ' ')
    formData.append('name', values.name)
    formData.append('numberOfVoucher', values.numberOfVoucher)
    formData.append('description', values.description)
    formData.append('dateBegin', values.dateBegin)
    formData.append('dateEnd', values.dateEnd)
    formData.append('status', statusCampaign[0])
    formData.append('games', values.games)

    if (isUpdate) {
      const { data } = await campaignApi.create(formData)
      if (data.success) {
        route.push('/campaigns')
      }
    } else {
      formData.append('_id', props.data?._id || '')
      values._id = props.data?._id
      await updateCampaigns(formData, values)
      route.push('/campaigns')
    }
  }
  return (
    <Box>
      <Typography component="h2" variant="h5" sx={{ mb: 2 }}>
        {isUpdate ? 'Create Campaigns' : 'Update Campaign'}
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
              <InputField name="name" label="Name of Campaign" size="medium" />

              <InputField name="numberOfVoucher" label="Number of voucher" size="medium" required />

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <DateTimePickerField
                    control={methods.control}
                    name="dateBegin"
                    label="Start Date"
                  />
                  <DateTimePickerField control={methods.control} name="dateEnd" label="End Date" />
                </Box>
              </LocalizationProvider>
              <CheckboxesGroup name="games" control={methods.control} />

              <InputField name="description" label="Description" multiline rows={4} />
            </Stack>
          </Grid>

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
            {isUpdate ? 'Create' : 'Update'}
          </Button>
        </Grid>
      </FormProvider>
    </Box>
  )
}

CreateCampaignScreen.Layout = MainLayout

export default CreateCampaignScreen

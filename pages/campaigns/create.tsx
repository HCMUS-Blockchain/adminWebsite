import { UploadImageComponent } from '@/components/createCampaign'
import { MainLayout } from '@/components/layout'
import { Box, Button, Divider, Grid, Stack, Typography } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { DateTimePickerField, InputField } from '@/components/form'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { campaignApi } from '@/api-client'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import dayjs from 'dayjs'

function CreateCampaignScreen() {
  // const [uploadImage] = useUploadImageMutation();
  const schema = yup.object().shape({
    name: yup.string().required('Please enter name of voucher'),
    numberOfVoucher: yup
      .number()
      .required('Please enter a number of voucher')
      .positive('A number must be greater than 0')
      .integer('A number must be an integer'),
    description: yup.string(),
    dateBegin: yup.date().typeError('Invalid Started date'),
    dateEnd: yup
      .date()
      .when(
        'dateBegin',
        (dateBegin, yup) => dateBegin && yup.min(dateBegin, 'End time cannot be before start time')
      ),
  })
  const methods = useForm({
    defaultValues: {
      name: '',
      numberOfVoucher: 0,
      // description: '',
      dateBegin: dayjs(new Date()),
      // dateEnd: dayjs(new Date()),
    },
    resolver: yupResolver(schema),
  })

  const route = useRouter()
  const {
    handleSubmit,
    formState: { errors },
  } = methods
  const onSubmitHandler = async (values: any) => {
    const formData = new FormData()

    // formData.append('imageCover', values.imageCover[0] || ' ')
    formData.append('name', values.name)
    formData.append('numberOfVoucher', values.numberOfVoucher)
    formData.append('description', values.description)
    formData.append('dateBegin', values.dateBegin)
    formData.append('dateEnd', values.dateEnd)

    // if (values.images.length > 0) {
    //   values.images.forEach((el) => formData.append('images', el))
    // }
    console.log(values)
    // const { data } = await campaignApi.create(formData)
    // if (data.success) {
    //   route.push('/campaigns')
    // }
    // Call the Upload API
    // uploadImage(formData);
  }
  return (
    <Box>
      <Typography component="h2" variant="h5" sx={{ mb: 2 }}>
        Create Campaigns
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
            <UploadImageComponent limit={3} multiple={true} name="imageCover" />
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
              <InputField name="description" label="Description" multiline rows={4} />
            </Stack>
          </Grid>

          <Button
            variant="contained"
            type="submit"
            fullWidth
            sx={{ py: '0.8rem', my: 2, backgroundColor: 'red', mt: 15 }}
          >
            Submit Images
          </Button>
        </Grid>
      </FormProvider>
    </Box>
  )
}

CreateCampaignScreen.Layout = MainLayout

export default CreateCampaignScreen

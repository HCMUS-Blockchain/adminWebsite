import { UploadImageComponent } from '@/components/createCampaign'
import { MainLayout } from '@/components/layout'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, Divider, Grid, Stack, Typography } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { object, TypeOf, z } from 'zod'

import { DateTimePickerField, InputField } from '@/components/form'
import { LocalizationProvider } from '@mui/x-date-pickers'

const imageUploadSchema = object({
  imageCover: z.any(),
})

type IUploadImage = TypeOf<typeof imageUploadSchema> & {
  name: string
  numberOfVoucher: string
  description: string
  dateBegin: string
  dateEnd: string
}

function CreateCampaignScreen() {
  // const [uploadImage] = useUploadImageMutation();

  const methods = useForm<IUploadImage>({
    defaultValues: {
      name: '',
      numberOfVoucher: '',
      description: '',
      dateBegin: '',
      dateEnd: '',
    },
    resolver: zodResolver(imageUploadSchema),
  })

  const onSubmitHandler: SubmitHandler<IUploadImage> = async (values) => {
    const formData = new FormData()
    formData.append('imageCover', values.imageCover)

    // if (values.images.length > 0) {
    //   values.images.forEach((el) => formData.append('images', el))
    // }
    console.log(formData)

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
          onSubmit={methods.handleSubmit(onSubmitHandler)}
        >
          <Grid item xs={4}>
            <UploadImageComponent limit={3} multiple={true} name="imageCover" />
          </Grid>

          <Grid item xs={8}>
            <Stack sx={{ ml: 10, mt: 2 }} spacing={4}>
              <InputField
                name="name"
                control={methods.control}
                label="Name of Campaign"
                size="medium"
                required
              />
              <InputField
                name="numberOfVoucher"
                control={methods.control}
                label="Number of voucher"
                size="medium"
                required
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <DateTimePickerField
                    name="dateBegin"
                    control={methods.control}
                    label="Start Date"
                  />
                  <DateTimePickerField
                    name="dateBegin"
                    control={methods.control}
                    label="End Date"
                  />
                </Box>
              </LocalizationProvider>
              <InputField
                name="description"
                control={methods.control}
                label="Description"
                multiline
                rows={4}
              />
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

import { CreateForm } from '@/components/campaigns'
import { MainLayout } from '@/components/layout'
import { Box, Divider, Typography } from '@mui/material'

function CreateCampaignScreen() {
  return (
    <Box>
      <Typography component="h2" variant="h5" sx={{ mb: 2 }}>
        Create Campaigns
      </Typography>

      <Divider />
      <CreateForm />
    </Box>
  )
}

CreateCampaignScreen.Layout = MainLayout

export default CreateCampaignScreen

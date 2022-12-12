import * as React from 'react'
import { MainLayout } from '@/components/layout'
import { Button, Box, Typography, Divider } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { EnhancedTable } from '@/components/campaigns'
import { useRouter } from 'next/router'

export interface CampaignsScreenProps {}

function CampaignsScreen(props: CampaignsScreenProps) {
  const route = useRouter()
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography component="h2" variant="h5">
          Campaigns
        </Typography>
        <Button
          variant="contained"
          color="success"
          startIcon={<AddIcon />}
          onClick={() => route.push('./campaigns/create')}
        >
          Create
        </Button>
      </Box>
      <Divider />
      <EnhancedTable />
    </Box>
  )
}

CampaignsScreen.Layout = MainLayout

export default CampaignsScreen

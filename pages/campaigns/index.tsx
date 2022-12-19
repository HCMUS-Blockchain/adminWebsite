import React, { useEffect, useState } from 'react'
import { MainLayout } from '@/components/layout'
import { Button, Box, Typography, Divider } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { EnhancedTable } from '@/components/campaigns'
import { useRouter } from 'next/router'
import { campaignApi } from '@/api-client'
import { useCampaign } from '@/hooks'
import { headCells } from '@/constants'
import { useSWRConfig } from 'swr'

export interface CampaignsScreenProps {}

function CampaignsScreen(props: CampaignsScreenProps) {
  const route = useRouter()
  const { data, getAllCampaigns } = useCampaign()
  useEffect(() => {
    const fetchData = async () => {
      await getAllCampaigns()
    }
    fetchData()
  }, [])
  console.log(data)
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography component="h2" variant="h5">
          Campaigns
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => route.push('./campaigns/create')}
        >
          Create
        </Button>
      </Box>
      <Divider />
      <EnhancedTable headCells={headCells} campaignList={data?.data.campaigns || []} />
    </Box>
  )
}

CampaignsScreen.Layout = MainLayout

export default CampaignsScreen

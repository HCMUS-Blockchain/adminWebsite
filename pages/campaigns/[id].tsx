import { campaignApi } from '@/api-client'
import { MainLayout } from '@/components/layout'
import { useRouter } from 'next/router'
import { Campaign } from '@/models'
import React, { useCallback, useEffect, useState } from 'react'
import CreateCampaignScreen from './create'

import { CampaignScreenUpdate } from './create'
export function DetailScreen() {
  const route = useRouter()
  const { id } = route.query
  const [data, setData] = useState<CampaignScreenUpdate>()
  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const y = await campaignApi.getOnceCampaigns(id?.toString())
        setData(y.data.campaign)
      }
    }
    fetchData()
  }, [id])
  return <CreateCampaignScreen data={data} />
}
DetailScreen.Layout = MainLayout

export default DetailScreen

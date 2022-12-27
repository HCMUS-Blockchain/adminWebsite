import { gameApi } from '@/api-client'
import useSWR from 'swr'
export function useGame() {
  const { data, error } = useSWR('/games', {
    dedupingInterval: 60 * 60 * 1000,
    revalidateOnFocus: false,
  })

  async function createRuleGame(payload: any) {
    await gameApi.create(payload)
  }

  // async function updateCampaign(payload: any, values: any) {
  //   await campaignApi.updateCampaigns(payload)
  //   await mutate([...data.data.campaigns, values], true)
  // }

  return {
    data,
    error,
    createRuleGame,
  }
}

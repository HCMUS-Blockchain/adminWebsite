import { quizApi } from '@/api-client'
import useSWR from 'swr'
export function useQuiz() {
  const { data, error } = useSWR('/games/collection', {
    dedupingInterval: 60 * 60 * 1000,
    revalidateOnFocus: false,
  })

  async function createQuizCollection(payload: any) {
    await quizApi.create(payload)
  }

  // async function updateCampaign(payload: any, values: any) {
  //   await campaignApi.updateCampaigns(payload)
  //   await mutate([...data.data.campaigns, values], true)
  // }

  return {
    data,
    error,
    createQuizCollection,
  }
}

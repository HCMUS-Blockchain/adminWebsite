import { counterpartApi } from '@/api-client'

import useSWR from 'swr'
export function useCounterPart() {
  const { data, error, mutate } = useSWR('/counterparts', {
    dedupingInterval: 60 * 60 * 1000,
    revalidateOnFocus: false,
  })

  async function getCounterpart() {
    await counterpartApi.get()
    // await mutate()
    // mutate([...data, newCampaign])
  }
  async function updateCounterpart(payload: any) {
    await counterpartApi.update(payload)
    await mutate()
  }

  return {
    data,
    error,
    getCounterpart,
    updateCounterpart,
  }
}

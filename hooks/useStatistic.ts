import { statisticApi } from '@/api-client'
import useSWR from 'swr'

export function useStatistic() {
  const { data, error, mutate } = useSWR('/statistics/today', {
    dedupingInterval: 60 * 60 * 1000,
    revalidateOnFocus: false,
  })

  async function getGeneralStatis(option: string) {
    const x = await statisticApi.getGeneralStatistic(option)
    mutate(x, true)
  }
  return {
    data,
    error,
    getGeneralStatis,
  }
}

import { storesApi } from '@/api-client'
import useSWR from 'swr'
export function useStore() {
  const { data, error, mutate } = useSWR('/stores', {
    dedupingInterval: 60 * 60 * 1000,
    revalidateOnFocus: false,
  })

  async function createStore(payload: any) {
    await storesApi.create(payload)
    mutate([...data.data.stores, payload], true)
  }

  async function updateStore(payload: any) {
    await storesApi.update(payload)
    // mutate([...data.data.stores, payload], true)
  }

  return {
    data,
    error,
    createStore,
    updateStore,
  }
}

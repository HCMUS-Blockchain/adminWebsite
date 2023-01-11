import { storesApi } from '@/api-client'
import useSWR from 'swr'
export function useStore() {
  const { data, error, mutate } = useSWR('/stores', {
    dedupingInterval: 60 * 60 * 1000,
    revalidateOnFocus: false,
  })

  async function createStore(payload: any) {
    await storesApi.create(payload)
    const temp = payload.coordinates.split(',')
    payload.coordinates = {
      latitude: temp[1],
      longitude: temp[0],
    }
    const x = {
      data: {
        stores: [...data.data.stores, payload],
      },
    }

    mutate(x, true)
  }

  async function updateStore(payload: any) {
    await storesApi.update(payload)
    const item = data.data.stores.findIndex((obj: any) => obj._id === payload._id)
    data.data.stores[item] = payload
    const x = {
      data: {
        stores: data.data.stores,
      },
    }
    mutate(x, true)
  }

  async function deleteStore(_id: string) {
    await storesApi.deleteStore(_id)
    const newList = data.data.stores.filter((item: any) => item._id !== _id)
    data.data.stores = newList
    mutate(data, true)
  }

  return {
    data,
    error,
    createStore,
    updateStore,
    deleteStore,
  }
}

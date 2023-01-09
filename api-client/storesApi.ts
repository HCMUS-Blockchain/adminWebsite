import axiosClient from './axiosClient'

export const storesApi = {
  create(payload: any) {
    return axiosClient.post('/stores', payload)
  },
  getAllStores() {
    return axiosClient.get('/stores')
  },
  update(payload: any) {
    return axiosClient.put('/stores', payload)
  },
  getStore(id: string) {
    return axiosClient.get(`/stores/${id}`)
  },
}

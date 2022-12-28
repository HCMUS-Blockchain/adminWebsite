import axiosClient from './axiosClient'

export const counterpartApi = {
  create(payload: any) {
    return axiosClient.post('/counterparts', payload)
  },
  get() {
    return axiosClient.get('/counterparts')
  },
  update(payload: any) {
    return axiosClient.put('/counterparts', payload)
  },
}

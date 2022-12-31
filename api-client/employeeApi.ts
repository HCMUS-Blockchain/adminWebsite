import axiosClient from './axiosClientJSON'

export const employeeApi = {
  create(payload: any) {
    return axiosClient.post('/employees', payload)
  },
  update(payload: any) {
    return axiosClient.put('/employees', payload)
  },
}

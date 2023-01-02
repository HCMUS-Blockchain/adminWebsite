import axiosClient from './axiosClientJSON'

export const employeeApi = {
  create(payload: any) {
    return axiosClient.post('/employees', payload)
  },
  update(payload: any) {
    return axiosClient.put('/employees', payload)
  },
  delete(id: string) {
    return axiosClient.delete(`/employees/${id}`)
  },
  deleteMultipleEmployees(id: Array<string>) {
    return axiosClient.delete('/employees', { params: id })
  },
  changeAllEmployees(payload: any) {
    return axiosClient.post('/employees/all', payload)
  },
}

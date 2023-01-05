import axiosClient from './axiosClientJSON'

export const statisticApi = {
  getGeneralStatistic(option: string) {
    return axiosClient.get(`/statistics/${option}`)
  },

  getVoucherStatistic(payload: any) {
    return axiosClient.post('/statistics', payload)
  },
}

import axiosClient from './axiosClientJSON'

export const statisticApi = {
  getGeneralStatistic(option: string) {
    return axiosClient.get(`/statistics/${option}`)
  },

  getVoucherStatistic(payload: any) {
    return axiosClient.post('/statistics/voucher', payload)
  },
  getGameStatistic(id: string) {
    return axiosClient.get(`/statistics/game/${id}`)
  },
  getDiscountStatistic(id: string) {
    return axiosClient.get(`/statistics/discount/${id}`)
  },
  getUserStatistic(payload: any) {
    return axiosClient.post('/statistics/user', payload)
  },
}

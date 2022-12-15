import { Message } from '@/models'
import axiosClient from './axiosClient'

export const campaignApi = {
  create(payload: any) {
    return axiosClient.post('/campaigns', payload)
  },
}

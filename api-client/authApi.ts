import { LoginPayload, RegisterPayload } from '@/models'
import axiosClient from './axiosClientJSON'
export const authApi = {
  login(payload: LoginPayload) {
    axiosClient.post('/login', payload)
  },
  create(payload: RegisterPayload) {
    axiosClient.post('/create', payload)
  },
}

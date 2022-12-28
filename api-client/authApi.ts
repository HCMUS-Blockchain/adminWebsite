import { LoginPayload, RegisterPayload } from '@/models'
import axiosClient from './axiosClientJSON'
export const authApi = {
  login(payload: LoginPayload) {
    return axiosClient.post('/signin', payload)
  },
  create(payload: RegisterPayload) {
    return axiosClient.post('/register', payload)
  },
  logout() {
    return axiosClient.post('/logout')
  },
}

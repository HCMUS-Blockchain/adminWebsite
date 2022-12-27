import axios from 'axios'
import axiosClient from './axiosClient'

export const gameApi = {
  create(payload: any) {
    return axiosClient.post('/games', payload)
  },
  getOnceGames(id: string) {
    return axiosClient.get(`/games/${id}`)
  },
  updateGame(payload: any) {
    return axiosClient.put('/games', payload)
  },
}

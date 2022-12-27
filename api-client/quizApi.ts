import axios from 'axios'
import axiosClient from './axiosClient'

export const quizApi = {
  create(payload: any) {
    return axiosClient.post('/games/collection', payload)
  },
  getOnceQuiz(id: string) {
    return axiosClient.get(`/games/collection/${id}`)
  },
  getAllQuizzes() {
    return axiosClient.get('/games/collection')
  },
}

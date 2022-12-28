import { quizApi } from '@/api-client'
import useSWR from 'swr'
export function useQuiz() {
  const { data, error, mutate } = useSWR('/games/collection', {
    dedupingInterval: 60 * 60 * 1000,
    revalidateOnFocus: false,
  })

  async function createQuizCollection(payload: any) {
    await quizApi.create(payload)
    mutate([...data.data.quizzes, payload], true)
  }

  async function updateQuizCollection(payload: any) {
    await quizApi.update(payload)
    mutate([...data.data.quizzes, payload], true)
  }

  return {
    data,
    error,
    createQuizCollection,
    updateQuizCollection,
  }
}

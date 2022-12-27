import { authApi, campaignApi } from '@/api-client'
import { Campaign, LoginPayload, RegisterPayload } from '@/models'
import { profile } from 'console'
import useSWR from 'swr'
export function useAuth() {
  const {
    data: profile,
    error,
    mutate,
  } = useSWR('/profile', {
    dedupingInterval: 60 * 60 * 1000,
    revalidateOnFocus: false,
  })

  const firstLoading = profile === undefined && error === undefined

  async function login(payload: LoginPayload) {
    await authApi.login(payload)
    await mutate()
  }

  async function register(payload: RegisterPayload) {
    await authApi.create(payload)
    mutate({}, false)
  }
  return {
    profile,
    error,
    login,
    register,
    firstLoading,
  }
}

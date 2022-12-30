import { employeeApi } from '@/api-client/employeeApi'
import useSWR from 'swr'
export function useEmployee() {
  const { data, error, mutate } = useSWR('/employees', {
    dedupingInterval: 60 * 60 * 1000,
    revalidateOnFocus: false,
  })

  async function createEmployee(payload: any) {
    await employeeApi.create(payload)
  }
  return {
    data,
    error,
    createEmployee,
  }
}

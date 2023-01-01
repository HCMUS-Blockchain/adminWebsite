import { employeeApi } from '@/api-client/employeeApi'
import { Employee } from '@/models'
import useSWR from 'swr'
export function useEmployee() {
  const { data, error, mutate } = useSWR('/employees', {
    dedupingInterval: 60 * 60 * 1000,
    revalidateOnFocus: false,
  })

  async function createEmployee(payload: any) {
    await employeeApi.create(payload)
    mutate([...data.data.employees, payload], true)
  }

  async function updateEmployee(payload: any) {
    await employeeApi.update(payload)
    mutate([...data.data.employees, payload], true)
  }

  async function deleteEmployee(id: string) {
    const newList = data.data.employees.filter((item: Employee) => item._id !== id)
    data.data.employees = newList
    await employeeApi.delete(id)
    mutate(data, true)
  }

  async function deleteMultipleEmployees(id: Array<string>) {
    const newList = data.data.employees.filter((item: Employee) => !id.includes(item._id))
    data.data.employees = newList
    await employeeApi.deleteMultipleEmployees(id)
    mutate(data, true)
  }

  return {
    data,
    error,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    deleteMultipleEmployees,
  }
}

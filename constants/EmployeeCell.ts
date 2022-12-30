import { EmployeeHeadCell } from '@/models'

export const employeeCell: EmployeeHeadCell[] = [
  {
    id: 'id',
    numeric: false,
    disablePadding: true,
    label: 'ID',
  },
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Name',
  },
  {
    id: 'phone',
    numeric: false,
    disablePadding: false,
    label: 'Phone',
  },
  {
    id: 'email',
    numeric: false,
    disablePadding: false,
    label: 'Email',
  },

  {
    id: 'position',
    numeric: false,
    disablePadding: false,
    label: 'Position',
  },
]

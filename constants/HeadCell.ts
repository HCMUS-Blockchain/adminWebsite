import { HeadCell } from '@/models'

export const headCells: readonly HeadCell[] = [
  {
    id: 'id',
    numeric: true,
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
    id: 'describe',
    numeric: false,
    disablePadding: false,
    label: 'Description',
  },
  {
    id: 'beginDate',
    numeric: false,
    disablePadding: false,
    label: 'Start Date',
  },
  {
    id: 'endDate',
    numeric: false,
    disablePadding: false,
    label: 'End Date',
  },
  {
    id: 'status',
    numeric: false,
    disablePadding: false,
    label: 'Status',
  },
  {
    id: 'numberOfVoucher',
    numeric: true,
    disablePadding: false,
    label: 'Quantity',
  },
  {
    id: 'action',
    numeric: false,
    disablePadding: false,
    label: 'Action',
  },
]

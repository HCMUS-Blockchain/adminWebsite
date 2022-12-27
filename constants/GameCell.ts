import { HeadCell } from '@/models'

export const gameCells: HeadCell[] = [
  {
    id: '_id',
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
    id: 'status',
    numeric: false,
    disablePadding: false,
    label: 'Status',
  },
  {
    id: 'numberOfVoucher',
    numeric: false,
    disablePadding: false,
    label: 'Quantity',
  },

  {
    id: 'games',
    numeric: true,
    disablePadding: false,
    label: 'Games',
  },
]

import { HeadCell, Order } from './campaign'
export interface Game {
  _id: string
  status: string
  games: Array<string>
  numberOfVoucher: number
}

export interface TableGamesHeadProps {
  numSelected: number
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Game) => void
  order: Order
  orderBy: string
  rowCount: number
  headCells: HeadCell[]
}

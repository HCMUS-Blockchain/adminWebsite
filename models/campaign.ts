export type Order = 'asc' | 'desc'
export interface Campaign {
  id: number
  name: string
  beginDate: string
  endDate: string
  describe: string
  status: string
  numberOfVoucher: number
  action: string
}

export interface CampaignImage {
  image: string
}

export interface HeadCell {
  disablePadding: boolean
  id: keyof Campaign
  label: string
  numeric: boolean
}

export interface EnhancedTableProps {
  numSelected: number
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Campaign) => void
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void
  order: Order
  orderBy: string
  rowCount: number
}

export interface ColorStatus {
  [key: string]: string
}

export interface EnhancedTableToolbarProps {
  numSelected: number
}

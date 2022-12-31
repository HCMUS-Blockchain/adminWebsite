import { HeadCell, Order } from './campaign'

export interface TableEmpoyeeHeadProps {
  numSelected: number
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Employee) => void
  order: Order
  orderBy: string
  rowCount: number
  headCells: EmployeeHeadCell[]
}

export interface Employee {
  _id: string
  employeeID: string
  name: string
  phone: string
  email: string
  position: string
}

export interface EnhancedTableEmployeesProps {
  headCells: Array<EmployeeHeadCell>
  employeeList: any
  setOpenDialog: any
  setEmployeeUpdate: any
}

export interface EmployeeHeadCell {
  disablePadding: boolean
  id: keyof Employee
  label: string
  numeric: boolean
}

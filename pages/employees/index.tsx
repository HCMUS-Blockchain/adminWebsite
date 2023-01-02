import { TableEmployees } from '@/components/employees'
import { MainLayout } from '@/components/layout'
import { employeeCell } from '@/constants'
import {
  Box,
  Divider,
  Typography,
  DialogTitle,
  DialogContentText,
  DialogContent,
  Dialog,
  DialogActions,
  Button,
  Tooltip,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import React, { useEffect } from 'react'
import { DialogComponent } from '../../components/employees/form-dialog'
import { useEmployee } from '@/hooks'
import { CSVLink } from 'react-csv'
import TextField from '@mui/material/TextField'
import Papa from 'papaparse'
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import { TrayPlus } from 'mdi-material-ui'

const allowedExtensions = ['csv']

function EmployeeScreen() {
  const [openDialog, setOpenDialog] = React.useState(false)
  const [employeeList, setEmployeeList] = React.useState<any[]>([])
  const [employeeUpdate, setEmployeeUpdate] = React.useState({})
  const [result, setResult] = React.useState([])
  const [openUpload, setOpenUpload] = React.useState(false)
  const [dataCSV, setDataCSV] = React.useState({})

  const { data, createEmployee, changeAllEmployees } = useEmployee()

  //----------PROCESS FILE ENV
  const [dataX, setData] = React.useState([])
  const [error, setError] = React.useState('')
  const [file, setFile] = React.useState('')

  const csvLinkRef = React.useRef<CSVLink & HTMLAnchorElement & { link: HTMLAnchorElement }>(null)

  const handleFileChange = (e: any) => {
    setError('')
    // Check if user has entered the file
    if (e.target.files.length) {
      const inputFile = e.target.files[0]
      const fileExtension = inputFile?.type.split('/')[1]

      if (!allowedExtensions.includes(fileExtension)) {
        setError('Please input a csv file')
        return
      }
      setFile(inputFile)

      const reader = new FileReader()

      const file = e.target.files[0]

      reader.onloadend = async ({ target }: { target: any }) => {
        const csv = Papa.parse(target?.result, { header: true })
        setDataCSV(csv.data)
        setOpenUpload(true)
      }

      reader.readAsText(file)
    }
  }
  const addOneEmployee = () => {
    setOpenDialog(true)
  }

  const [alignment, setAlignment] = React.useState<string | null>('left')

  const handleAlignment = (event: React.MouseEvent<HTMLElement>, newAlignment: string | null) => {
    setAlignment(newAlignment)
  }

  const hanldeExportButton = () => {
    csvLinkRef?.current?.link.click()
  }

  const handleUploadClose = () => {
    setOpenUpload(false)
  }

  const handleUploadOpen = () => {
    setOpenUpload(true)
  }

  const handleOption1 = async () => {
    try {
      setOpenUpload(false)
      await changeAllEmployees(dataCSV)
    } catch (e) {
      console.log(e)
    }
  }

  const handleOption2 = async () => {
    try {
      setOpenUpload(false)
      await createEmployee(dataCSV)
    } catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    if (data) {
      if (data.data) {
        const result = data.data.employees.map((item: any) => {
          const { _id, ownerID, __v, ...result } = item
          return result
        })
        setEmployeeList(data.data.employees)
        setResult(result)
      } else {
        setEmployeeList(data)
      }
    }
  }, [data])

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography component="h2" variant="h5">
          Employee Management
        </Typography>

        <ToggleButtonGroup
          value={alignment}
          exclusive
          onChange={handleAlignment}
          aria-label="text alignment"
        >
          <Tooltip title="Upload CSV File">
            <ToggleButton value="center" aria-label="centered" component="label">
              <TextField
                type="file"
                onChange={handleFileChange}
                id="csvInput"
                name="file"
                sx={{ display: 'none' }}
              />
              <FileUploadIcon />
            </ToggleButton>
          </Tooltip>
          <Tooltip title="Download CSV File">
            <ToggleButton value="right" aria-label="right aligned" onClick={hanldeExportButton}>
              <CSVLink data={result} ref={csvLinkRef}>
                <FileDownloadIcon sx={{ mt: '8px' }} />
              </CSVLink>
            </ToggleButton>
          </Tooltip>
          <Tooltip title="Add an employee">
            <ToggleButton
              value="left"
              aria-label="left aligned"
              onClick={addOneEmployee}
              component="label"
            >
              <PersonAddAlt1Icon />
            </ToggleButton>
          </Tooltip>
        </ToggleButtonGroup>
      </Box>
      <DialogComponent
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        employeeUpdate={employeeUpdate}
      />

      <Divider />
      <TableEmployees
        headCells={employeeCell}
        employeeList={employeeList}
        setOpenDialog={setOpenDialog}
        setEmployeeUpdate={setEmployeeUpdate}
      />

      <Dialog
        open={openUpload}
        onClose={handleUploadClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Employee List Confirm'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want to create new list employee ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={handleOption1} autoFocus>
            Yes, I want
          </Button>
          <Button color="secondary" onClick={handleOption2} autoFocus>
            No, I just want to add a few employees
          </Button>
          <Button color="secondary" onClick={handleUploadClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

EmployeeScreen.Layout = MainLayout

export default EmployeeScreen

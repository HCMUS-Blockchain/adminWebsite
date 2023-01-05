import { MainLayout } from '@/components/layout'
import { Box, MenuItem, Paper, TextField, Tooltip, Typography, Stack } from '@mui/material'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowDownWardIcon from '@mui/icons-material/ArrowDownward'
import { NextPageWithLayout } from '../models'
import Grid from '@mui/material/Grid'
import { useStatistic, useCampaign } from '@/hooks'
import { statisticApi } from '@/api-client'
import { useEffect, useState } from 'react'
import { LineChart } from '@/components/dashboard'
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import Button from '@mui/material/Button'
import { useForm } from 'react-hook-form'
import { DateTimePickerField } from '@/components/form'

const filter = [
  {
    value: 'today',
    label: 'Today',
  },
  {
    value: 'week',
    label: 'This Week',
  },
  {
    value: 'month',
    label: 'This Month',
  },
  {
    value: 'year',
    label: 'This Year',
  },
]

const generalManagement = [
  {
    label: 'Campaigns',
    description: 'Total campaigns which you created',
    value: null,
  },
  {
    label: 'Customers',
    description: 'Total customer who participated in',
    value: null,
  },
  {
    label: 'Release Vouchers',
    description: 'Total vouchers which users got ',
    value: null,
  },
  {
    label: 'Used Vouchers',
    description: 'Total vouchers which users used ',
    value: null,
  },
]
const Home: NextPageWithLayout = () => {
  // const { data, getGeneralStatis } = useStatistic()
  const [data, setData] = useState(generalManagement)
  const [option, setOption] = useState('day')
  const [value, setValue] = useState(dayjs('2014-08-18T21:11:54'))
  const [campaignList, setCampaignList] = useState([])
  const { data: campaignData } = useCampaign()
  const { register, handleSubmit, control } = useForm()
  const handleChange = async (e: any) => {
    const result = await statisticApi.getGeneralStatistic(e.target.value)
    if (e.target.value === 'today') {
      setOption('day')
    } else {
      setOption(e.target.value)
    }
    setData(result.data.result)
  }

  function Item(item: any) {
    if (item.item.percentage > 0) {
      return (
        <>
          <Box bgcolor="rgba(0,128,0,0.2)" width="50px">
            <Typography color="#008000" fontWeight="bold" textAlign="center">
              {item.item.percentage}%
            </Typography>
          </Box>
          <ArrowUpwardIcon sx={{ color: '#008000' }} />
        </>
      )
    } else if (item.item.percentage === 0) {
      return (
        <Box bgcolor="rgb(128,128,128,0.2)" width="50px">
          <Typography fontWeight="bold" textAlign="center" color="rgb(128,128,128)">
            0%
          </Typography>
        </Box>
      )
    }
    return (
      <>
        <Box bgcolor="rgba(255,0,0,0.2)" width="50px">
          <Typography color="red" fontWeight="bold" textAlign="center">
            {item.item.percentage}%
          </Typography>
        </Box>
        <ArrowDownWardIcon sx={{ color: 'red' }} />
      </>
    )
  }

  function TypoItem(item: any) {
    if (item.item.percentage > 0) {
      return (
        <Typography fontSize="small" color="rgb(128,128,128)">
          {item.item.percentage}% more than last {option}
        </Typography>
      )
    } else if (item.item.percentage < 0) {
      return (
        <Typography fontSize="small" color="rgb(128,128,128)">
          {item.item.percentage}% less than last {option}
        </Typography>
      )
    }
    return (
      <Typography fontSize="small" color="rgb(128,128,128)">
        Data is not found to compare
      </Typography>
    )
  }

  const handleChangeSubmit = async (values: any) => {
    await statisticApi.getVoucherStatistic(values)
    console.log(values)
  }
  // console.log(data)
  useEffect(() => {
    async function fetch() {
      const result = await statisticApi.getGeneralStatistic('today')
      setData(result.data.result)
    }
    fetch()
  }, [])

  useEffect(() => {
    if (campaignData) {
      const tempCampaignList = campaignData.data.campaigns.map((item: any) => ({
        _id: item._id,
        name: item.name,
      }))
      setCampaignList(campaignData.data.campaigns)
    }
  }, [campaignData])
  return (
    <>
      <Typography component="h3" variant="h4">
        Hello, Thanh Ngoc
      </Typography>
      <Paper>
        <Box
          sx={{ display: 'flex', justifyContent: 'space-between', p: 2, alignContent: 'center' }}
        >
          <Typography variant="h6" p={2}>
            Statistic General
          </Typography>
          <TextField
            id="outlined-select-currency"
            select
            defaultValue="today"
            sx={{
              width: '200px',
            }}
            onChange={handleChange}
            color="secondary"
          >
            {filter.map((option) => (
              <MenuItem
                key={option.value}
                value={option.value}
                color="secondary"
                sx={{ color: '#00ABCC' }}
              >
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <Grid container spacing={2}>
          {data[0].value !== null
            ? data.map((item: any) => (
                <Grid item xs={3} key={item.label}>
                  <Paper sx={{ p: 2, m: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography>{item.label}</Typography>
                      <Tooltip title={item.description}>
                        <HelpOutlineIcon />
                      </Tooltip>
                    </Box>

                    <Box display="flex" justifyContent="space-between">
                      <Typography variant="h4" fontWeight="bold">
                        {item.value}
                      </Typography>
                      <Box
                        width="100px"
                        sx={{ display: 'flex', direction: 'row', justifyContent: 'space-around' }}
                        alignSelf="center"
                      >
                        <Item item={item} />
                      </Box>
                    </Box>
                    <TypoItem item={item} />
                  </Paper>
                </Grid>
              ))
            : generalManagement.map((item: any) => (
                <Grid item xs={3} key={item.label}>
                  <Paper sx={{ p: 2, m: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography>{item.label}</Typography>
                      <Tooltip title={item.description}>
                        <HelpOutlineIcon />
                      </Tooltip>
                    </Box>

                    <Box display="flex" justifyContent="space-between">
                      <Typography variant="h4" fontWeight="bold" color="rgb(128,128,128)">
                        0
                      </Typography>
                      <Box
                        width="100px"
                        sx={{ display: 'flex', direction: 'row', justifyContent: 'space-around' }}
                        alignSelf="center"
                      >
                        <Box bgcolor="rgb(128,128,128,0.2)" width="50px">
                          <Typography fontWeight="bold" textAlign="center" color="rgb(128,128,128)">
                            0%
                          </Typography>
                        </Box>
                        <ArrowUpwardIcon sx={{ color: 'rgb(128,128,128)' }} />
                      </Box>
                    </Box>
                  </Paper>
                </Grid>
              ))}
        </Grid>
      </Paper>
      <Paper>
        <Box
          sx={{ display: 'flex', justifyContent: 'space-between', p: 2, alignContent: 'center' }}
        >
          <Typography variant="h6" p={2}>
            Voucher Statistic
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack
              direction="row"
              spacing={2}
              pt={2}
              component="form"
              onSubmit={handleSubmit(handleChangeSubmit)}
            >
              <TextField
                id="outlined-select-campaign"
                select
                label="Select"
                defaultValue=""
                helperText="Please select your campaign"
                {...register('option')}
              >
                {campaignList.map((option: any) => (
                  <MenuItem key={option._id} value={option._id}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
              <DateTimePickerField name="startDate" control={control} label="Start Date" />
              <DateTimePickerField name="endDate" control={control} label="End Date" />
              <Button type="submit">Show</Button>
            </Stack>
          </LocalizationProvider>
        </Box>

        <LineChart />
      </Paper>
    </>
  )
}

Home.Layout = MainLayout
export default Home

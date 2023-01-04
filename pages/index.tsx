import { MainLayout } from '@/components/layout'
import { Box, MenuItem, Paper, TextField, Tooltip, Typography } from '@mui/material'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowDownWardIcon from '@mui/icons-material/ArrowDownward'
import { NextPageWithLayout } from '../models'
import Grid from '@mui/material/Grid'
import { useStatistic } from '@/hooks'
import { statisticApi } from '@/api-client'
import { useEffect, useState } from 'react'
import { LineChart } from '@/components/dashboard'

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
  // console.log(data)
  useEffect(() => {
    async function fetch() {
      const result = await statisticApi.getGeneralStatistic('today')
      setData(result.data.result)
    }
    fetch()
  }, [])
  console.log(data)
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
      <LineChart />
    </>
  )
}

Home.Layout = MainLayout
export default Home

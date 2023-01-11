import { statisticApi } from '@/api-client'
import { DashboardComponent, DoughnutChart, VerticalBarChart } from '@/components/dashboard'
import { MainLayout } from '@/components/layout'
import { useAuth, useCampaign } from '@/hooks'
import ArrowDownWardIcon from '@mui/icons-material/ArrowDownward'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import {
  Box,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Tooltip,
  Typography,
  IconButton,
} from '@mui/material'
import Grid from '@mui/material/Grid'
import { useEffect, useState } from 'react'
import { NextPageWithLayout } from '../models'
import StarIcon from '@mui/icons-material/Star'

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
  const [data, setData] = useState(generalManagement)
  const [option, setOption] = useState('day')
  const [campaignList, setCampaignList] = useState([])

  //-----------------------DATA-------------------------

  const [gameTurns, setGameTurns] = useState([])
  const [discount, setDiscount] = useState([])

  const { data: campaignData } = useCampaign()
  const { profile } = useAuth()

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
        Data is equal on the last {option}
      </Typography>
    )
  }

  const onGameChange = async (e: any) => {
    const x = await statisticApi.getGameStatistic(e.target.value)
    setGameTurns(x.data.result)
  }

  const onDiscountChange = async (e: any) => {
    const x = await statisticApi.getDiscountStatistic(e.target.value)
    setDiscount(x.data.result)
  }

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
    <Stack spacing={4}>
      <Typography component="h3" variant="h4">
        Hello, {profile.data.fullName}
      </Typography>
      <Paper>
        <Box
          sx={{ display: 'flex', justifyContent: 'space-between', p: 2, alignContent: 'center' }}
        >
          <Box sx={{ display: 'flex', alignContent: 'center', justifyContent: 'space-between' }}>
            <IconButton disabled>
              <StarIcon />
            </IconButton>
            <Typography variant="h6" alignSelf="center">
              Statistic General
            </Typography>
          </Box>

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
        <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 4 }}>
          <Box>
            <Stack direction="row" justifyContent="space-between">
              <Box
                sx={{ display: 'flex', alignContent: 'center', justifyContent: 'space-between' }}
                alignSelf="center"
              >
                <IconButton disabled>
                  <StarIcon />
                </IconButton>
                <Typography variant="h6" alignSelf="center">
                  Game Statistic
                </Typography>
              </Box>
              <TextField
                id="outlined-select-campaign"
                select
                label="Select"
                defaultValue=""
                helperText="Please select your campaign"
                onChange={onGameChange}
              >
                {campaignList.map((option: any) => (
                  <MenuItem key={option._id} value={option._id}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>

            <DoughnutChart result={gameTurns} />
          </Box>
          <Box>
            <Stack direction="row" justifyContent="space-between">
              <Box
                sx={{ display: 'flex', alignContent: 'center', justifyContent: 'space-between' }}
                alignSelf="center"
              >
                <IconButton disabled>
                  <StarIcon />
                </IconButton>
                <Typography variant="h6" alignSelf="center">
                  Discount Voucher Statistic
                </Typography>
              </Box>
              <TextField
                id="outlined-select-campaign"
                select
                label="Select"
                defaultValue=""
                helperText="Please select your campaign"
                onChange={onDiscountChange}
              >
                {campaignList.map((option: any) => (
                  <MenuItem key={option._id} value={option._id}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
            <VerticalBarChart result={discount} />
          </Box>
        </Box>
      </Paper>
      <DashboardComponent id="Voucher" />

      <DashboardComponent id="User" />
    </Stack>
  )
}

Home.Layout = MainLayout
export default Home

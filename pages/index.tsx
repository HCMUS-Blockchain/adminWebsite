import { MainLayout } from '@/components/layout'
import { Box, MenuItem, Paper, TextField, Tooltip, Typography } from '@mui/material'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import { NextPageWithLayout } from '../models'
import Grid from '@mui/material/Grid'
import { useStatistic } from '@/hooks'

const filter = [
  {
    value: 'today ',
    label: 'Today',
  },
  {
    value: 'week',
    label: 'Week',
  },
  {
    value: 'month',
    label: 'Month',
  },
  {
    value: 'year',
    label: 'Year',
  },
]

const generalManagement = [
  {
    label: 'Campaigns',
    description: 'Total campaigns which you created',
  },
  {
    label: 'Customers',
    description: 'Total customer who participated in',
  },
  {
    label: 'Release Vouchers',
    description: 'Total vouchers which users got ',
  },
  {
    label: 'Used Vouchers',
    description: 'Total vouchers which users used ',
  },
]
const Home: NextPageWithLayout = () => {
  const { data, getGeneralStatis } = useStatistic()
  const handleChange = async (e: any) => {
    const x = await getGeneralStatis(e.target.value)
  }
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
            defaultValue="Today"
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
          {data
            ? data.data.result.map((item: any) => (
                <Grid item xs={3}>
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
                        <Box bgcolor="rgba(255,0,0,0.2)" width="50px">
                          <Typography color="red" fontWeight="bold" textAlign="center">
                            {item.percentage}%
                          </Typography>
                        </Box>
                        <ArrowUpwardIcon sx={{ color: 'red' }} />
                      </Box>
                    </Box>
                  </Paper>
                </Grid>
              ))
            : generalManagement.map((item: any) => (
                <Grid item xs={3}>
                  <Paper sx={{ p: 2, m: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography>{item.label}</Typography>
                      <Tooltip title={item.description}>
                        <HelpOutlineIcon />
                      </Tooltip>
                    </Box>

                    <Box display="flex" justifyContent="space-between">
                      <Typography variant="h4" fontWeight="bold">
                        0
                      </Typography>
                      <Box
                        width="100px"
                        sx={{ display: 'flex', direction: 'row', justifyContent: 'space-around' }}
                        alignSelf="center"
                      >
                        <Box bgcolor="rgba(255,0,0,0.2)" width="50px">
                          <Typography color="red" fontWeight="bold" textAlign="center">
                            0%
                          </Typography>
                        </Box>
                        <ArrowUpwardIcon sx={{ color: 'red' }} />
                      </Box>
                    </Box>
                  </Paper>
                </Grid>
              ))}
        </Grid>
      </Paper>
    </>
  )
}

Home.Layout = MainLayout
export default Home

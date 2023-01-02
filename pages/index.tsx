import { MainLayout } from '@/components/layout'
import { Box, MenuItem, Paper, TextField, Tooltip, Typography } from '@mui/material'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import { NextPageWithLayout } from '../models'
import Grid from '@mui/material/Grid'

const filter = [
  {
    value: 'Today ',
    label: 'Today',
  },
  {
    value: 'Yesterday',
    label: 'Yesterday',
  },
  {
    value: 'Last week',
    label: 'Last week',
  },
  {
    value: 'Last year',
    label: 'Last year',
  },
]
const Home: NextPageWithLayout = () => {
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
          <Grid item xs={3}>
            <Paper sx={{ p: 2, m: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography>Campaign</Typography>
                <Tooltip title="AA">
                  <HelpOutlineIcon />
                </Tooltip>
              </Box>

              <Box display="flex" justifyContent="space-between">
                <Typography variant="h4" fontWeight="bold">
                  256
                </Typography>
                <Box
                  width="100px"
                  sx={{ display: 'flex', direction: 'row', justifyContent: 'space-around' }}
                  alignSelf="center"
                >
                  <Box bgcolor="rgba(255,0,0,0.2)" width="50px">
                    <Typography color="red" fontWeight="bold" textAlign="center">
                      -5.2%
                    </Typography>
                  </Box>
                  <ArrowUpwardIcon sx={{ color: 'red' }} />
                </Box>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper sx={{ p: 2, m: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography>Campaign</Typography>
                <Tooltip title="AA">
                  <HelpOutlineIcon />
                </Tooltip>
              </Box>

              <Box display="flex" justifyContent="space-between">
                <Typography variant="h4" fontWeight="bold">
                  256
                </Typography>
                <Box
                  width="100px"
                  sx={{ display: 'flex', direction: 'row', justifyContent: 'space-around' }}
                  alignSelf="center"
                >
                  <Box bgcolor="rgba(255,0,0,0.2)" width="50px">
                    <Typography color="red" fontWeight="bold" textAlign="center">
                      -5.2%
                    </Typography>
                  </Box>
                  <ArrowUpwardIcon sx={{ color: 'red' }} />
                </Box>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper sx={{ p: 2, m: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography>Campaign</Typography>
                <Tooltip title="AA">
                  <HelpOutlineIcon />
                </Tooltip>
              </Box>

              <Box display="flex" justifyContent="space-between">
                <Typography variant="h4" fontWeight="bold">
                  256
                </Typography>
                <Box
                  width="100px"
                  sx={{ display: 'flex', direction: 'row', justifyContent: 'space-around' }}
                  alignSelf="center"
                >
                  <Box bgcolor="rgba(255,0,0,0.2)" width="50px">
                    <Typography color="red" fontWeight="bold" textAlign="center">
                      -5.2%
                    </Typography>
                  </Box>
                  <ArrowUpwardIcon sx={{ color: 'red' }} />
                </Box>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper sx={{ p: 2, m: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography>Campaign</Typography>
                <Tooltip title="AA">
                  <HelpOutlineIcon />
                </Tooltip>
              </Box>

              <Box display="flex" justifyContent="space-between">
                <Typography variant="h4" fontWeight="bold">
                  256
                </Typography>
                <Box
                  width="100px"
                  sx={{ display: 'flex', direction: 'row', justifyContent: 'space-around' }}
                  alignSelf="center"
                >
                  <Box bgcolor="rgba(60, 179, 113,0.2)" width="50px">
                    <Typography color="rgb(60, 179, 113)" fontWeight="bold" textAlign="center">
                      15.2%
                    </Typography>
                  </Box>
                  <ArrowUpwardIcon sx={{ color: 'rgb(60, 179, 113)' }} />
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </>
  )
}

Home.Layout = MainLayout
export default Home

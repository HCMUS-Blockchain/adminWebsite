import { TableGames } from '@/components/games'
import { MainLayout } from '@/components/layout'
import { headCells } from '@/constants'
import { gameCells } from '@/constants/GameCell'
import { useCampaign } from '@/hooks'
import { Box, Divider, Typography, Button } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

function GameScreen() {
  const router = useRouter()
  const { data, getAllCampaigns } = useCampaign()
  // useEffect(() => {
  //   const fetchData = async () => {
  //     await getAllCampaigns()
  //   }
  //   fetchData()
  // }, [])

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography component="h2" variant="h5">
          Game Configuration
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            router.push('/games/collection')
          }}
        >
          My Collection
        </Button>
      </Box>
      <Divider />
      <TableGames headCells={gameCells} campaignList={data?.data.campaigns || []} />
    </Box>
  )
}

GameScreen.Layout = MainLayout

export default GameScreen

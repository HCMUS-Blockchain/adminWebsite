import { GameDetail } from '@/components/games'
import { MainLayout } from '@/components/layout'
import { useAuth, useCampaign, useCounterPart } from '@/hooks'
import { Campaign } from '@/models'
import { Box, Button, Divider, Grid, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useAppSelector, useAppDispatch } from 'app/hooks'
import { gameApi } from '@/api-client'
import { Point, reset, set } from '@/features/Games/gameSlice'
import { useEffect, useState } from 'react'
function getGame(campaigns: Array<Campaign>, id: string) {
  let camp = campaigns.find((item) => item._id === id)
  return camp?.games
}

function GameDetailScreen() {
  const { data } = useCampaign()
  const router = useRouter()
  const id = router.query.id?.toString()
  const [games, setGames] = useState<string[]>([])
  const state = useAppSelector((state) => state.games)
  const [isUpdate, setIsUpdate] = useState(false)
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (data) {
      const temp = getGame(data.data.campaigns, id || '') || []
      setGames(temp)
    }
  }, [data])
  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const y = await gameApi.getOnceGames(id)
          const gameList = y.data.game[0].pointAverage

          let action
          if (gameList.game1.length > 0) {
            action = set({ id: '1', data: gameList.game1 })
            dispatch(action)
          }
          if (gameList.game2.length > 0) {
            action = set({ id: '2', data: gameList.game2 })
            dispatch(action)
          }
          if (gameList.game3.list.length > 0) {
            action = set({
              id: '3',
              data: gameList.game3.list,
              collectionId: gameList.game3.collectionId,
            })
            dispatch(action)
          }
          setIsUpdate(true)
        } catch (e) {}
      }
    }
    fetchData()
  }, [id])
  const onSubmit = async () => {
    const formData = new FormData()
    formData.append('pointAverage', JSON.stringify(state))
    formData.append('id', router.query.id?.toString() || '')
    if (!isUpdate) {
      const { data } = await gameApi.create(formData)
      if (data.success) {
        const action = reset('reset')
        dispatch(action)
        router.push('/games')
      }
    } else {
      const { data } = await gameApi.updateGame(formData)
      if (data.success) {
        const action = reset('reset')
        dispatch(action)
        router.push('/games')
      }
    }
  }
  return (
    <Box>
      <Box component="form" sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography component="h2" variant="h5">
          Game Configuration
        </Typography>
        <Button variant="contained" color="primary" onClick={() => onSubmit()}>
          Save changes
        </Button>
      </Box>
      <Divider />

      <Grid container spacing={2}>
        {games.map((name: any) => (
          <Grid item xs={12 / games.length} key={name}>
            <Stack spacing={2}>
              <Typography variant="h5" sx={{ mt: 2, mb: 2 }}>
                Game: {name}
              </Typography>
              <GameDetail name={name} />
            </Stack>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

GameDetailScreen.Layout = MainLayout

export default GameDetailScreen

import { quizApi } from '@/api-client'
import { MainLayout } from '@/components/layout'
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Box,
  Grid,
  Divider,
  Typography,
} from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add'

function CollectionScreen() {
  const [list, setList] = useState([])
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      const res = await quizApi.getAllQuizzes()
      setList(res.data.quizzes)
    }
    fetchData()
  }, [])
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography component="h2" variant="h5">
          Collection List
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => router.push('/games/collection/create')}
        >
          New
        </Button>
      </Box>
      <Divider />
      <Grid container spacing={2} sx={{ mt: 2 }}>
        {list.map((item: any, index) => (
          <Grid item xs={4} key={index}>
            <Card>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  variant="contained"
                  onClick={() => router.push(`/games/collection/${item._id}`)}
                >
                  Update
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

CollectionScreen.Layout = MainLayout

export default CollectionScreen

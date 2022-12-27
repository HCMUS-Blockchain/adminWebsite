import { quizApi } from '@/api-client'
import { MainLayout } from '@/components/layout'
import { useQuiz } from '@/hooks'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import CloseIcon from '@mui/icons-material/Close'
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
const answers = [
  {
    value: 'A',
    label: 'A',
  },
  {
    value: 'B',
    label: 'B',
  },
  {
    value: 'C',
    label: 'C',
  },
  {
    value: 'D',
    label: 'D',
  },
]
const questionsData = {
  title: '',
  options: [{ title: '' }, { title: '' }, { title: '' }, { title: '' }],
  answer: '0',
}
export interface QuestionAndAnswer {
  title: String
  description: String
  question: {
    question: String
    optionA: String
    optionB: String
    optionC: String
    optionD: String
    answer: String
  }[]
}

export interface CollectionScreenDetailProps {
  id: String
}
export function CollectionScreenDetail({ id }: CollectionScreenDetailProps) {
  const [list, setList] = useState([questionsData])
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<QuestionAndAnswer>()
  const { fields, append, remove } = useFieldArray({
    name: 'question',
    control,
  })
  const { data, createQuizCollection } = useQuiz()
  const route = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const y = await quizApi.getOnceQuiz(id?.toString())
        const result = y.data.quiz[0]
        setValue('title', result.title)
        setValue('description', result.description)
        setList(result.questions)
        result.questions.forEach((item: any, index: number) => {
          setValue(`question.${index}.question`, item.question)
          setValue(`question.${index}.optionA`, item.optionA)
          setValue(`question.${index}.optionB`, item.optionB)
          setValue(`question.${index}.optionC`, item.optionC)
          setValue(`question.${index}.optionD`, item.optionD)
          setValue(`question.${index}.answer`, item.answer)
        })
      }
    }
    fetchData()
  }, [id])
  const onClickToAdd = () => {
    setList((prev) => [...prev, questionsData])
  }
  const onClickToDelete = (index: any) => {
    setList((prev) => prev.filter((item, i) => i !== index))
  }

  const onSubmit = async (data: any) => {
    const form = new FormData()
    form.append('title', data.title)
    form.append('description', data.description)
    form.append('questions', JSON.stringify(data.question))

    await createQuizCollection(form)
  }
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography component="h2" variant="h5">
          Question and Answer
        </Typography>
      </Box>
      <Divider />
      <Container component="form" onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={1}>
          <Typography sx={{ fontSize: '18px', fontWeight: 'bold ' }}>Quiz Title :</Typography>
          <TextField fullWidth {...register('title')} />
          <Typography sx={{ fontSize: '18px', fontWeight: 'bold ' }}>Quiz description :</Typography>
          <TextField fullWidth {...register('description')} />
          <Typography sx={{ fontSize: '18px', fontWeight: 'bold ' }}>
            Enter your question data :
          </Typography>
          <Container>
            {list.map((item: any, index) => (
              <Stack spacing={1.5} sx={{ marginBottom: '30px' }} key={index}>
                <Box
                  sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <Typography sx={{ fontSize: '18px', fontWeight: 'bold' }}>
                    Question Title {index + 1} :
                  </Typography>
                  <IconButton
                    color="primary"
                    aria-label="delete new question"
                    component="label"
                    onClick={() => {
                      remove(index)
                      onClickToDelete(index)
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                </Box>

                <TextField fullWidth {...register(`question.${index}.question`)} />
                <Grid container justifyContent="space-between">
                  <Grid item xs={5}>
                    <Typography>Option A:</Typography>
                    <TextField fullWidth {...register(`question.${index}.optionA`)} />
                  </Grid>
                  <Grid item xs={5}>
                    <Typography>Option B:</Typography>
                    <TextField fullWidth {...register(`question.${index}.optionB`)} />
                  </Grid>
                  <Grid item xs={5}>
                    <Typography>Option C:</Typography>
                    <TextField fullWidth {...register(`question.${index}.optionC`)} />
                  </Grid>
                  <Grid item xs={5}>
                    <Typography>Option D:</Typography>
                    <TextField fullWidth {...register(`question.${index}.optionD`)} />
                  </Grid>
                </Grid>
                <TextField
                  select
                  label="Answer"
                  defaultValue="A"
                  {...register(`question.${index}.answer`)}
                >
                  {answers.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Stack>
            ))}
          </Container>
          <Container>
            <IconButton
              color="primary"
              aria-label="add new question"
              component="label"
              sx={{ float: 'right', marginTop: '-25px' }}
              onClick={onClickToAdd}
            >
              <AddCircleIcon fontSize="large" />
            </IconButton>
          </Container>
          <Box sx={{ textAlign: 'center' }}>
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </Box>
        </Stack>
      </Container>
    </Box>
  )
}

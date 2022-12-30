import * as React from 'react'
import {
  Grid,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Select,
  MenuItem,
  InputLabel,
} from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import DeleteIcon from '@mui/icons-material/Delete'
import { useEffect, useState } from 'react'
import { useFormContext, Controller, useController } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { add, assign, remove } from 'features/Games/gameSlice'
import { useQuiz } from '@/hooks'

function isFloat(n: GLfloat) {
  return Number(n) === n && n % 1 !== 0
}
export interface GameDetailProps {
  name: string
}

export function GameDetail({ name }: GameDetailProps) {
  const [value, setValue] = useState<{ point: string; discount: string }[]>([])
  const [point, setPoint] = useState<string>('0')
  const [discount, setDiscount] = useState<string>('0')
  const [errorMessagePoint, setErrorMessagePoint] = useState<string>('')
  const [errorMessageDiscount, setErrorMessageDiscount] = useState<string>('')
  const [quizList, setQuizList] = useState<any>([])
  const [collectionId, setCollectionId] = useState<string>('')

  const dispatch = useAppDispatch()
  const state = useAppSelector((state) => state.games)
  const quiz = useQuiz()
  const onClickAdd = () => {
    if (point === '0') {
      setErrorMessagePoint('Point should not equal 0')
    } else if (discount === '0') {
      setErrorMessageDiscount('Discount should not equal 0')
    } else if (errorMessagePoint.length === 0 && errorMessageDiscount.length === 0) {
      setValue((prev) => [
        ...prev,
        {
          point: point,
          discount: discount,
        },
      ])

      let action
      if (name === '2048') {
        action = add({ id: '1', data: { point: point, discount: discount } })
      } else if (name === 'Jump with doctor strange') {
        action = add({ id: '2', data: { point: point, discount: discount } })
      } else {
        action = add({
          id: '3',
          data: { point: point, discount: discount },
        })
      }
      dispatch(action)
      setPoint('0')
      setDiscount('0')
    }
  }
  useEffect(() => {
    if (name === '2048') {
      setValue(state.game1)
    } else if (name === 'Jump with doctor strange') {
      setValue(state.game2)
    } else {
      setValue(state.game3.list)
      setCollectionId(state.game3.collectionId)
    }
  }, [state.game1, state.game2, state.game3.list])

  useEffect(() => {
    if (parseInt(point) < 0 || parseInt(point) > 1000 || isFloat(parseFloat(point))) {
      setErrorMessagePoint('Invalid point')
    } else if (isNaN(parseInt(point))) {
      if (point !== '0') {
        setErrorMessagePoint('Point must be a number')
      }
    } else {
      const isDuplicate = value.every((item) => item.point !== point)
      if (!isDuplicate) {
        setErrorMessagePoint('Point is duplicated')
      } else {
        setErrorMessagePoint('')
      }
    }
  }, [point])

  useEffect(() => {
    if (parseInt(discount) < 0 || parseInt(discount) > 100 || isFloat(parseFloat(discount))) {
      setErrorMessageDiscount('Invalid discount')
    } else if (isNaN(parseInt(discount))) {
      if (discount !== '0') {
        setErrorMessageDiscount('Discount must be a number')
      }
    } else {
      const isDuplicate = value.every((item) => item.discount !== discount)
      if (!isDuplicate) {
        setErrorMessageDiscount('Discount is duplicated')
      } else {
        setErrorMessageDiscount('')
      }
    }
  }, [discount])

  useEffect(() => {
    if (quiz.data) {
      setQuizList(quiz.data.data.quizzes)
    }
  }, [quiz.data])

  const onClickDelete = (item: string) => {
    let newArr = value.filter((object) => {
      return object.point !== item
    })

    setValue(newArr)
    let action
    if (name === '2048') {
      action = remove({ id: '1', point: item })
    } else if (name === 'Jump with doctor strange') {
      action = remove({ id: '2', point: item })
    } else {
      action = remove({ id: '3', point: item })
    }
    dispatch(action)
  }

  const handleSelected = (e: any) => {
    const value = e.target.value
    if (value) {
      setCollectionId(value)
      const action = assign({ collectionId: value })
      dispatch(action)
    }
  }

  return (
    <>
      <Stack>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              {name === 'Quiz' ? (
                <TableRow>
                  <TableCell colSpan={3}>
                    <TextField
                      id="outlined-select-currency"
                      select
                      label="Please select a collection which you"
                      value={collectionId}
                      onChange={handleSelected}
                      fullWidth
                    >
                      {quizList.map((option: any) => (
                        <MenuItem key={option.title} value={option._id}>
                          {option.title}
                        </MenuItem>
                      ))}
                    </TextField>
                  </TableCell>
                </TableRow>
              ) : null}

              <TableRow>
                <TableCell>Point</TableCell>
                <TableCell align="center">Discount(%)</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {value.map((row) => (
                <TableRow
                  key={row.point}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.point}
                  </TableCell>
                  <TableCell align="center">{row.discount} %</TableCell>

                  <TableCell align="center">
                    <IconButton onClick={() => onClickDelete(row.point)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
      <Stack spacing={2} direction="row">
        <TextField
          required
          label="Point"
          color="secondary"
          id="point"
          fullWidth
          onChange={(e) => setPoint(e.target.value)}
          value={point}
          error={Boolean(errorMessagePoint.length)}
          helperText={errorMessagePoint}
        />
        <TextField
          required
          id="discount"
          label="Percent(%)"
          color="secondary"
          fullWidth
          onChange={(e) => setDiscount(e.target.value)}
          value={discount}
          error={Boolean(errorMessageDiscount.length)}
          helperText={errorMessageDiscount}
        />

        <IconButton onClick={() => onClickAdd()} aria-label="add">
          <AddCircleOutlineIcon />
        </IconButton>
      </Stack>
    </>
  )
}

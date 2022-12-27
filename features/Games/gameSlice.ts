import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { stat } from 'fs'

export interface Point {
  point: string
  discount: string
}
const initialState = {
  list: [],
  collectionId: '',
}
const game = createSlice({
  name: 'games',
  initialState: { game1: [], game2: [], game3: initialState },
  reducers: {
    add: (state: any, action) => {
      if (action.payload.id === '1') {
        state.game1.push(action.payload.data)
      } else if (action.payload.id === '2') {
        state.game2.push(action.payload.data)
      } else if (action.payload.id === '3') {
        state.game3.list.push(action.payload.data)
      }
    },
    remove: (state: any, action) => {
      const removeId = action.payload.point
      if (action.payload.id === '1') {
        state.game1.splice(
          state.game1.findIndex((arrow: any) => arrow.point === removeId),
          1
        )
      } else if (action.payload.id === '2') {
        state.game2.splice(
          state.game2.findIndex((arrow: any) => arrow.point === removeId),
          1
        )
      } else if (action.payload.id === '3') {
        state.game3.list.splice(
          state.game3.list.findIndex((arrow: any) => arrow.point === removeId),
          1
        )
      }
    },
    set: (state: any, action) => {
      if (action.payload.id === '1') {
        state.game1 = action.payload.data
      } else if (action.payload.id === '2') {
        state.game2 = action.payload.data
      } else if (action.payload.id === '3') {
        state.game3.list = action.payload.data
        state.game3.collectionId = action.payload.collectionId
      }
    },
    reset: (state: any, action) => {
      state.game1 = []
      state.game2 = []
      state.game3.list = []
    },
    assign: (state: any, action) => {
      state.game3.collectionId = action.payload.collectionId
    },
  },
})

const { reducer, actions } = game
export const { add, remove, set, reset, assign } = actions
export default reducer

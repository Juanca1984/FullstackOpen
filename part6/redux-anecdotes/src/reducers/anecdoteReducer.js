import { createSlice } from '@reduxjs/toolkit'
import { getAll, createNew, updateVotes } from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    setAnecdotes(state, action) {
      return action.payload
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    replaceAnecdote(state, action) {
      return state.map(a => a.id !== action.payload.id ? a : action.payload)
    }
  }
})

export const { setAnecdotes, appendAnecdote, replaceAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdoteThunk = content => {
  return async dispatch => {
    const newAnecdote = await createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdoteThunk = anecdote => {
  return async dispatch => {
    const updated = await updateVotes(anecdote)
    dispatch(replaceAnecdote(updated))
  }
}

export default anecdoteSlice.reducer

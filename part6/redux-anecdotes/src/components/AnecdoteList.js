import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdoteThunk } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const filter = useSelector(state => state.filter)
  const anecdotes = useSelector(state =>
    state.anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
  )

  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(voteAnecdoteThunk(anecdote))
    dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
  }

  return anecdotes.map(anecdote =>
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote)}>vote</button>
      </div>
    </div>
  )
}

export default AnecdoteList

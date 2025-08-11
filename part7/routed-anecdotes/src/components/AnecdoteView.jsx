import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote, deleteAnecdote, addComment } from '../reducers/anecdoteSlice'
import { useField } from '../hooks'

const AnecdoteView = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const anecdote = useSelector(state =>
    state.anecdotes.find(a => a.id === id)
  )

  const commentInput = useField('text')

  if (!anecdote) {
    return <div>Anecdote not found.</div>
  }

  const handleVote = () => {
    dispatch(voteAnecdote(id))
  }

  const handleDelete = () => {
    if (window.confirm(`Delete "${anecdote.content}"?`)) {
      dispatch(deleteAnecdote(id))
      navigate('/')
    }
  }

  const handleAddComment = (e) => {
    e.preventDefault()
    dispatch(addComment({ id: anecdote.id, comment: commentInput.value }))
    commentInput.reset()
  }

  return (
    <div>
      <h2>{anecdote.content}</h2>
      <p>Author: {anecdote.author}</p>
      <p>Info: <a href={anecdote.info}>{anecdote.info}</a></p>
      <p>Votes: {anecdote.votes}</p>
      <button onClick={handleVote}>Vote</button>
      <button onClick={handleDelete} style={{ marginLeft: 10 }}>Delete</button>

      <h3>Comments</h3>
      <form onSubmit={handleAddComment}>
        <input
          type={commentInput.type}
          value={commentInput.value}
          onChange={commentInput.onChange}
        />
        <button type="submit">add comment</button>
      </form>
      {anecdote.comments && anecdote.comments.length > 0 ? (
        <ul>
          {anecdote.comments.map((c, i) => (
            <li key={i}>{c}</li>
          ))}
        </ul>
      ) : (
        <p>No comments yet.</p>
      )}
    </div>
  )
}

export default AnecdoteView

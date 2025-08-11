import { useField } from './hooks'
import { useDispatch } from 'react-redux'
import { createAnecdote } from './reducers/anecdoteSlice'
import { setTemporaryNotification } from './reducers/notificationSlice'
import { useNavigate } from 'react-router-dom'

const CreateNew = () => {
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    const newAnecdote = {
      content: content.inputProps.value,
      author: author.inputProps.value,
      info: info.inputProps.value,
      votes: 0,
      comments: [],
      user: {
        id: 'u1',
        name: 'Default User'
      }
    }

    dispatch(createAnecdote(newAnecdote))
    dispatch(setTemporaryNotification(`a new anecdote "${content.inputProps.value}" created!`, 5))
    navigate('/')
  }

  const handleReset = () => {
    content.reset()
    author.reset()
    info.reset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content.inputProps} />
        </div>
        <div>
          author
          <input {...author.inputProps} />
        </div>
        <div>
          url for more info
          <input {...info.inputProps} />
        </div>
        <button type="submit">create</button>
        <button type="button" onClick={handleReset}>reset</button>
      </form>
    </div>
  )
}

export default CreateNew

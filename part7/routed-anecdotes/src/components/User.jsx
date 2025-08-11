import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const User = () => {
  const id = useParams().id
  const anecdotes = useSelector(state => state.anecdotes)
  const userAnecdotes = anecdotes.filter(a => a.user?.id === id)

  if (userAnecdotes.length === 0) {
    return <p>User not found or no anecdotes created.</p>
  }

  const userName = userAnecdotes[0].user.name

  return (
    <div>
      <h2>{userName}</h2>
      <h3>Anecdotes created</h3>
      <ul>
        {userAnecdotes.map(a => (
          <li key={a.id}>{a.content}</li>
        ))}
      </ul>
    </div>
  )
}

export default User

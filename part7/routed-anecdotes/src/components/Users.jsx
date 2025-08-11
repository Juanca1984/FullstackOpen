import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Users = () => {
  const anecdotes = useSelector(state => state.anecdotes)

  const userMap = {}
  anecdotes.forEach(a => {
    const user = a.user
    if (!user) return
    if (!userMap[user.id]) {
      userMap[user.id] = { ...user, blogs: 0 }
    }
    userMap[user.id].blogs += 1
  })

  const users = Object.values(userMap)

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Anecdotes created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td><Link to={`/users/${u.id}`}>{u.name}</Link></td>
              <td>{u.blogs}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users

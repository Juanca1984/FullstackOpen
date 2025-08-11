import { useDispatch, useSelector } from 'react-redux'
import { login, logout } from '../reducers/userSlice'
import { useField } from '../hooks'

const LoginForm = () => {
  const username = useField('text')
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const handleLogin = (e) => {
    e.preventDefault()
    dispatch(login({ name: username.value }))
    username.reset()
  }

  if (user) {
    return (
      <div>
        <p>Logged in as {user.name}</p>
        <button onClick={() => dispatch(logout())}>Logout</button>
      </div>
    )
  }

  return (
    <form onSubmit={handleLogin}>
      <input
        type={username.type}
        value={username.value}
        onChange={username.onChange}
        placeholder="Enter your name"
      />
      <button type="submit">Login</button>
    </form>
  )
}

export default LoginForm

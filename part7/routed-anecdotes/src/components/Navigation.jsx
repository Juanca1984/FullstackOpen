import { Link } from 'react-router-dom'

const Navigation = () => {
  return (
    <div className="navbar">
      <Link to="/">anecdotes</Link>
      <Link to="/create">create new</Link>
      <Link to="/about">about</Link>
      <Link to="/users">users</Link>
    </div>
  )
}

export default Navigation

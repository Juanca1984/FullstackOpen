import { useSelector } from 'react-redux'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import AnecdoteList from './components/AnecdoteList'
import AnecdoteView from './components/AnecdoteView'
import About from './components/About'
import Footer from './components/Footer'
import Users from './components/Users'
import User from './components/User'
import Navigation from './components/Navigation'
import LoginForm from './components/LoginForm'
import CreateNew from './components/CreateNew'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  return notification
    ? <div className="notification">{notification}</div>
    : null
}

const App = () => {
  return (
    <Router>
      <div>
        <h1>Software anecdotes</h1>
        <Navigation />
        <Notification />
        <Routes>
          <Route path="/" element={<AnecdoteList />} />
          <Route path="/create" element={<CreateNew />} />
          <Route path="/about" element={<About />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="/anecdotes/:id" element={<AnecdoteView />} />
        </Routes>
        <LoginForm />
        <Footer />
      </div>
    </Router>
  )
}

export default App

const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

// GET all users
usersRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('blogs', { title: 1, url: 1, likes: 1 })
  res.json(users)
})

// POST create user
usersRouter.post('/', async (req, res, next) => {
  const { username, name, password } = req.body

  if (!password || password.length < 3) {
    return res.status(400).json({ error: 'password missing or too short' })
  }

  const existing = await User.findOne({ username })
  if (existing) {
    return res.status(400).json({ error: 'username must be unique' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({ username, name, passwordHash })
  const savedUser = await user.save()
  res.status(201).json(savedUser)
})

module.exports = usersRouter

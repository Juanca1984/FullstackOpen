const jwt = require('jsonwebtoken')
const User = require('../models/user')

const tokenExtractor = (req, res, next) => {
  const auth = req.get('authorization')
  if (auth?.toLowerCase().startsWith('bearer ')) {
    req.token = auth.substring(7)
  }
  next()
}

const userExtractor = async (req, res, next) => {
  if (req.token) {
    const decoded = jwt.verify(req.token, process.env.SECRET)
    req.user = await User.findById(decoded.id)
  }
  next()
}

module.exports = { tokenExtractor, userExtractor }
